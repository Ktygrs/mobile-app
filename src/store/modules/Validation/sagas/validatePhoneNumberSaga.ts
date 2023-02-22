// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {getAuthErrorMessage, updatePhoneNumber} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {userSelector} from '@store/modules/Account/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {
  temporaryPhoneNumberSelector,
  temporaryVerificationIdSelector,
} from '@store/modules/Validation/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.PHONE_VALIDATION.START.create;

export function* validatePhoneNumberSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const user: ReturnType<typeof userSelector> = yield select(userSelector);
  const verificationId: string = yield select(temporaryVerificationIdSelector);

  try {
    const {validationCode} = action.payload;
    const temporaryPhoneNumber: ReturnType<
      typeof temporaryPhoneNumberSelector
    > = yield select(temporaryPhoneNumberSelector);
    if (!temporaryPhoneNumber) {
      throw new Error('Temporary phone number is null');
    }

    yield call(updatePhoneNumber, verificationId, validationCode);
    yield call(modifyPhoneNumber, user, temporaryPhoneNumber);
    yield put(ValidationActions.PHONE_VALIDATION.SUCCESS.create());
  } catch (error) {
    yield put(
      ValidationActions.PHONE_VALIDATION.FAILED.create(
        getAuthErrorMessage(error) ?? getErrorMessage(error),
      ),
    );

    throw error;
  }
}

function* modifyPhoneNumber(
  userToUpdate: User | null,
  phoneNumber: string,
): Generator<unknown, void, void> {
  return yield call(
    updateAccountSaga,
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        phoneNumber: phoneNumber,
        skipPhoneNumberValidation: true,
        checksum: userToUpdate?.checksum,
      },
      function* (freshUser) {
        if (freshUser.phoneNumber !== phoneNumber) {
          modifyPhoneNumber(freshUser, phoneNumber);
        }
        return {retry: false};
      },
    ),
  );
}
