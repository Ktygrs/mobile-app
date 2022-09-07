// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {temporaryPhoneNumberSelector} from '@store/modules/Validation/selectors';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.PHONE_VALIDATION.START.create;

export function* phoneValidationSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {validationCode} = action.payload;
    const temporaryPhoneNumber: ReturnType<
      typeof temporaryPhoneNumberSelector
    > = yield select(temporaryPhoneNumberSelector);
    if (!temporaryPhoneNumber) {
      throw new Error('Temporary phone number is null');
    }
    const normilizedNumber = e164PhoneNumber(temporaryPhoneNumber);
    const phoneNumberHash: string = yield call(
      hashPhoneNumber,
      normilizedNumber,
    );
    const userId: string = yield select(userIdSelector);

    const user: SagaReturnType<typeof Api.validations.phoneValidation> =
      yield call(Api.validations.phoneValidation, {
        userId,
        phoneNumber: normilizedNumber,
        phoneNumberHash,
        validationCode,
      });
    yield put(ValidationActions.PHONE_VALIDATION.SUCCESS.create(user));
  } catch (error) {
    yield put(
      ValidationActions.PHONE_VALIDATION.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
