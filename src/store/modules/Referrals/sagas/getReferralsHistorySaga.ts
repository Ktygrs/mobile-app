// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS_HISTORY.START.create;

export function* getReferralsHistorySaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {userId} = action.payload;
    const response: SagaReturnType<
      typeof Api.referrals.getReferralsHistoryByUserId
    > = yield Api.referrals.getReferralsHistoryByUserId({userId});
    yield put(ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.create(response));
  } catch (error) {
    yield put(
      ReferralsActions.GET_REFERRALS_HISTORY.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
