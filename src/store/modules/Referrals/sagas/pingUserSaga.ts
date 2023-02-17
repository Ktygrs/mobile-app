// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getErrorMessage} from '@utils/errors';
import {put} from 'redux-saga/effects';

const actionCreator = ReferralsActions.PING_REFERRAL(null).START.create;

export function* pingUserSaga(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;
  try {
    yield Api.notifications.pingUser({
      userId,
    });

    yield put(
      ReferralsActions.PING_REFERRAL(action.id).SUCCESS.create({
        userId,
      }),
    );
  } catch (error) {
    yield put(
      ReferralsActions.PING_REFERRAL(action.id).FAILED.create({
        userId,
        errorMessage: getErrorMessage(error),
      }),
    );
    throw error;
  }
}
