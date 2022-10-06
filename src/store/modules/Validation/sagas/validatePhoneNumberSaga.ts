// SPDX-License-Identifier: BUSL-1.1

import {getApiErrorCode, isApiError} from '@api/client';
import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {temporaryPhoneNumberSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.PHONE_VALIDATION.START.create;

export function* validatePhoneNumberSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const userId: string = yield select(userIdSelector);
  try {
    const {validationCode} = action.payload;
    const temporaryPhoneNumber: ReturnType<
      typeof temporaryPhoneNumberSelector
    > = yield select(temporaryPhoneNumberSelector);
    if (!temporaryPhoneNumber) {
      throw new Error('Temporary phone number is null');
    }
    const normalizedNumber = e164PhoneNumber(temporaryPhoneNumber);
    const phoneNumberHash: string = yield call(
      hashPhoneNumber,
      normalizedNumber,
    );
    const user: SagaReturnType<typeof Api.validations.validatePhoneNumber> =
      yield call(Api.validations.validatePhoneNumber, {
        userId,
        phoneNumber: normalizedNumber,
        phoneNumberHash,
        validationCode,
      });
    yield put(ValidationActions.PHONE_VALIDATION.SUCCESS.create(user));
  } catch (error) {
    let localizedError = getErrorMessage(error);
    if (isApiError(error, 400, 'INVALID_VALIDATION_CODE')) {
      localizedError = t('errors.invalid_validation_code');
    } else if (isApiError(error, 400, 'VALIDATION_EXPIRED')) {
      localizedError = t('errors.validation_expired');
    } else if (isApiError(error, 404, 'VALIDATION_NOT_FOUND')) {
      const freshUser: SagaReturnType<typeof Api.user.getUserById> = yield call(
        Api.user.getUserById,
        userId,
      );
      yield put(AuthActions.UPDATE_ACCOUNT.SUCCESS.create(freshUser));
      localizedError = t('errors.validation_not_found');
    } else if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      switch (field) {
        case 'phoneNumber':
        case 'phoneNumberHash':
          localizedError = t('errors.already_taken', {field});
      }
    }
    yield put(
      ValidationActions.PHONE_VALIDATION.FAILED.create(
        localizedError,
        getApiErrorCode(error),
      ),
    );
    throw error;
  }
}
