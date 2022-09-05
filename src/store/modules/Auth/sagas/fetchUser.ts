// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Auth/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

export function* fetchUserSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );

      const user: User = yield call(fetchUser, userId);

      yield put(AuthActions.FETCH_USER.SUCCESS.create(user));
    } else {
      yield put(AuthActions.FETCH_USER.FAILED.create('Not authorized'));
    }
  } catch (error) {
    yield put(AuthActions.FETCH_USER.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}

export function* fetchUser(userId: string) {
  try {
    const user: User = yield call(Api.user.getUserById, userId);
    return user;
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      return null;
    } else {
      throw error;
    }
  }
}
