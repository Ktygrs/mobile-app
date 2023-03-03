// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {navigate, navigationRef} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {walkthroughStepCandidatesSelector} from '@store/modules/WalkThrough/selectors';
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

      //TODO::mark as done in user
      const user = (yield select(userSelector)) as User;
      yield put(
        AccountActions.UPDATE_ACCOUNT.START.create({
          ...user,
          clientData: {
            ...(user.clientData ?? {}),
            walkTroughProgress: {
              ...(user.clientData?.walkTroughProgress ?? {}),
              [steps[i].key]: {version: steps[i].version},
            },
          },
        }),
      );

      yield take(WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.type);
    }

    navigationRef.goBack();
  }
}
