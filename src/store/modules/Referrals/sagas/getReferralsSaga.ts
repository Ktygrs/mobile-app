// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS({})(null).START.create;

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  const {userId, referralType, offset} = action.payload;
  try {
    const uId = userId ?? (yield select(userIdSelector));
    const result: SagaReturnType<typeof Api.referrals.getReferrals> =
      yield Api.referrals.getReferrals({
        userId: uId,
        referralType,
        offset,
        limit: 20,
      });

    yield put(
      ReferralsActions.GET_REFERRALS({userId, referralType})(
        referralType,
      ).SUCCESS.create(uId, offset, result),
    );
  } catch (error) {
    yield put(
      ReferralsActions.GET_REFERRALS({userId, referralType})(
        referralType,
      ).FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
