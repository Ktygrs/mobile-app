// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {userSelector} from '@store/modules/Account/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.REF_USERNAME_VALIDATION.START.create;

export function* validateRefUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {username} = action.payload;
  const user: ReturnType<typeof userSelector> = yield select(userSelector);

  try {
    const refUser: SagaReturnType<typeof Api.user.getUserByUsername> =
      yield call(Api.user.getUserByUsername, {username});
    if (refUser.id === user?.id) {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
          t('username.error.refer_yourself'),
        ),
      );
    } else {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(refUser),
      );
    }
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
          t('username.error.not_found'),
        ),
      );
    } else {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
          getErrorMessage(error),
        ),
      );
    }
    throw error;
  }
}
