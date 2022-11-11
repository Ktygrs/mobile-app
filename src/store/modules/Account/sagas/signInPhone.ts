// SPDX-License-Identifier: BUSL-1.1

import {getAuthErrorMessage, signInWithPhoneNumber} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, take} from 'redux-saga/effects';

export function* signInPhoneSaga(
  startAction: ReturnType<typeof AccountActions.SIGN_IN_PHONE.START.create>,
) {
  try {
    const phoneNumber = startAction.payload.phoneNumber;
    let confirmation: SagaReturnType<typeof signInWithPhoneNumber> = yield call(
      signInWithPhoneNumber,
      phoneNumber,
    );

    yield put(AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE.create(phoneNumber));

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.create
        | typeof AccountActions.SIGN_IN_PHONE.RESEND.create
        | typeof AccountActions.SIGN_IN_PHONE.RESET.create
      > = yield take([
        AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type,
        AccountActions.SIGN_IN_PHONE.RESEND.type,
        AccountActions.SIGN_IN_PHONE.RESET.type,
      ]);

      switch (action.type) {
        case AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type: {
          try {
            yield call(
              [confirmation, confirmation.confirm],
              action.payload.code,
            );
            yield put(AccountActions.SIGN_IN_PHONE.SUCCESS.create());
            finished = true;
          } catch (error) {
            yield put(
              AccountActions.SIGN_IN_PHONE.FAILED.create(
                getAuthErrorMessage(error) ?? getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.SIGN_IN_PHONE.RESEND.type: {
          confirmation = yield call(signInWithPhoneNumber, phoneNumber);
          yield put(AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create());
          break;
        }
        case AccountActions.SIGN_IN_PHONE.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    yield put(
      AccountActions.SIGN_IN_PHONE.FAILED.create(
        getAuthErrorMessage(error) ?? getErrorMessage(error),
      ),
    );
    throw error;
  }
}
