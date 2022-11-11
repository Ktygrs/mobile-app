// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* getReferralsHistorySaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
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
