// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {userIdSelector} from '@store/modules/Account/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getAccountSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const user: SagaReturnType<typeof Api.user.getUserById> = yield call(
      Api.user.getUserById,
      userId,
    );
    yield put(AccountActions.GET_ACCOUNT.SUCCESS.create(user));
  } catch (error) {
    const localizedError = getErrorMessage(error);
    yield put(AccountActions.GET_ACCOUNT.FAILED.create(localizedError));
    throw error;
  }
}
