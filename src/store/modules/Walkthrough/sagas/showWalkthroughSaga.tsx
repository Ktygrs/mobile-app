// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {getCurrentRoute, goBack, navigate} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {walkthroughStepCandidatesSelector} from '@store/modules/Walkthrough/selectors';
import {WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps';
import {
  WalkthroughStep,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {
  call,
  delay,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

export function* showWalkthroughSaga() {
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
        name: 'Walkthrough',
        params: {step, index: i, total: steps.length},
      });

      const user: User = yield select(userSelector);
      yield call(markWalkthroughStep, user, step);

      const action: ReturnType<
        | typeof WalkthroughActions.COMPLETE_WALKTHROUGH_STEP.STATE.create
        | typeof WalkthroughActions.SKIP_WALKTHROUGH.STATE.create
        | typeof WalkthroughActions.RESTART_WALKTHROUGH.STATE.create
      > = yield take([
        WalkthroughActions.COMPLETE_WALKTHROUGH_STEP.STATE.type,
        WalkthroughActions.SKIP_WALKTHROUGH.STATE.type,
        WalkthroughActions.RESTART_WALKTHROUGH.STATE.type,
      ]);

      if (step.after) {
        yield call(step.after);
      }

      if (
        action.type === WalkthroughActions.SKIP_WALKTHROUGH.STATE.type ||
        action.type === WalkthroughActions.RESTART_WALKTHROUGH.STATE.type ||
        isLast
      ) {
        yield call(closeWalkthrough);

        if (action.type === WalkthroughActions.SKIP_WALKTHROUGH.STATE.type) {
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
  if (currentRoute?.name === 'Walkthrough') {
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
    yield take(WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.type);
  }
}

function* markWalkthroughStep(user: User, step: WalkthroughStep) {
  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {
          ...(user.clientData ?? {}),
          walkthroughProgress: {
            ...(user.clientData?.walkthroughProgress ?? {}),
            [step.key]: {version: step.version},
          },
        },
      },
      function* (freshUser) {
        if (
          freshUser.clientData?.walkthroughProgress?.[step.key]?.version !==
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
  const walkthroughProgress = WALKTHROUGH_STEPS.reduce<{
    [key in WalkthroughStepKey]?: {version: number};
  }>((result, step) => {
    result[step.key] = {version: step.version};
    return result;
  }, {});

  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {...(user.clientData ?? {}), walkthroughProgress},
      },
      function* (freshUser) {
        markAllWalkthroughSteps(freshUser);
        return {retry: true};
      },
    ),
  );
}