// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {navigate} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {walkthroughStepCandidatesSelector} from '@store/modules/WalkThrough/selectors';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, delay, put, select, take} from 'redux-saga/effects';

export function* showWalkThroughSaga() {
  while (true) {
    yield call(waitForSelector, state => {
      return walkthroughStepCandidatesSelector(state).length > 0;
    });

    yield delay(500);

    const steps: ReturnType<typeof walkthroughStepCandidatesSelector> =
      yield select(walkthroughStepCandidatesSelector);

    for (let i = 0; i < steps.length; i++) {
      navigate({
        name: 'WalkThrough',
        params: {
          step: steps[i],
          index: i,
          total: steps.length,
        },
      });

      const user: User = yield select(userSelector);
      yield call(markWalkthroughStep, user, steps[i]);

      yield take(WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.type);
    }
  }
}

function* markWalkthroughStep(user: User, step: WalkThroughStep) {
  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        ...user,
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
