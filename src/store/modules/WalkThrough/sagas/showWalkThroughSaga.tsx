// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {getCurrentRoute, goBack, navigate} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {walkthroughStepCandidatesSelector} from '@store/modules/WalkThrough/selectors';
import {WALK_THROUGH_STEPS} from '@store/modules/WalkThrough/steps';
import {
  WalkThroughStep,
  WalkthroughStepKey,
} from '@store/modules/WalkThrough/types';
import {
  call,
  delay,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

export function* showWalkThroughSaga() {
  while (true) {
    yield call(waitForWalkthroughStepCandidates);
    yield delay(1000);

    const steps: ReturnType<typeof walkthroughStepCandidatesSelector> =
      yield select(walkthroughStepCandidatesSelector);

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const isLast = i === steps.length - 1;

      if (step.before) {
        yield call(step.before);
      }

      yield navigate({
        name: 'WalkThrough',
        params: {step, index: i, total: steps.length},
      });

      const user: User = yield select(userSelector);
      yield call(markWalkthroughStep, user, step);

      const action: ReturnType<
        | typeof WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.create
        | typeof WalkThroughActions.SKIP_WALK_THROUGH.STATE.create
        | typeof WalkThroughActions.RESTART_WALK_THROUGH.STATE.create
      > = yield take([
        WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.type,
        WalkThroughActions.SKIP_WALK_THROUGH.STATE.type,
        WalkThroughActions.RESTART_WALK_THROUGH.STATE.type,
      ]);

      if (step.after) {
        yield call(step.after);
      }

      if (
        action.type === WalkThroughActions.SKIP_WALK_THROUGH.STATE.type ||
        action.type === WalkThroughActions.RESTART_WALK_THROUGH.STATE.type ||
        isLast
      ) {
        yield call(closeWalkthrough);

        if (action.type === WalkThroughActions.SKIP_WALK_THROUGH.STATE.type) {
          yield call(markAllWalkthroughSteps, user);
        }

        break;
      }
    }
  }
}

function* closeWalkthrough() {
  const currentRoute: SagaReturnType<typeof getCurrentRoute> = yield call(
    getCurrentRoute,
  );
  /**
   * Walkthrough might be already closed e.g. as a result of step.after
   */
  if (currentRoute?.name === 'WalkThrough') {
    yield goBack();
  }
}

function* waitForWalkthroughStepCandidates() {
  while (
    (
      (yield select(walkthroughStepCandidatesSelector)) as ReturnType<
        typeof walkthroughStepCandidatesSelector
      >
    ).length === 0
  ) {
    yield take(
      WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.type,
    );
  }
}

function* markWalkthroughStep(user: User, step: WalkThroughStep) {
  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {
          ...(user.clientData ?? {}),
          walkTroughProgress: {
            ...(user.clientData?.walkTroughProgress ?? {}),
            [step.key]: {version: step.version},
          },
        },
      },
      function* (freshUser) {
        if (
          freshUser.clientData?.walkTroughProgress?.[step.key]?.version !==
          step.version
        ) {
          markWalkthroughStep(freshUser, step);
        }
        return {retry: false};
      },
    ),
  );
}

function* markAllWalkthroughSteps(user: User) {
  const walkTroughProgress = WALK_THROUGH_STEPS.reduce<{
    [key in WalkthroughStepKey]?: {version: number};
  }>((result, step) => {
    result[step.key] = {version: step.version};
    return result;
  }, {});

  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {...(user.clientData ?? {}), walkTroughProgress},
      },
      function* (freshUser) {
        markAllWalkthroughSteps(freshUser);
        return {retry: true};
      },
    ),
  );
}
