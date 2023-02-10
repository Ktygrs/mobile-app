// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {
  isRegistrationCompleteSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {miningSummarySelector} from '@store/modules/Tokenomics/selectors';
import {openBonusClaimed} from '@store/modules/Tokenomics/utils/openBonusClaimed';
import {openBonusExpired} from '@store/modules/Tokenomics/utils/openBonusExpired';
import {openClaimBonus} from '@store/modules/Tokenomics/utils/openClaimBonus';
import {getErrorMessage, showError} from '@utils/errors';
import {
  call,
  delay,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

export function* handleExtraBonusSaga() {
  const miningSummary: ReturnType<typeof miningSummarySelector> = yield select(
    miningSummarySelector,
  );

  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  try {
    if (miningSummary?.availableExtraBonus) {
      yield call(waitForRegistrationComplete);

      yield call(openClaimBonus);

      const extraBonus: SagaReturnType<typeof Api.tokenomics.claimExtraBonus> =
        yield call(Api.tokenomics.claimExtraBonus, {userId});

      yield put(
        TokenomicsActions.GET_MINING_SUMMARY.START.create({
          forceUpdate: true,
        }),
      );

      yield call(openBonusClaimed, {
        claimedBonus: extraBonus.availableExtraBonus,
      });
    }
  } catch (error) {
    if (isApiError(error, 409, 'EXTRA_BONUS_ALREADY_CLAIMED')) {
      return;
    } else if (isApiError(error, 404, 'NO_EXTRA_BONUS_AVAILABLE')) {
      yield call(openBonusExpired);
      return;
    }

    showError(getErrorMessage(error));
    throw error;
  }
}

function* waitForRegistrationComplete() {
  while (
    !((yield select(isRegistrationCompleteSelector)) as ReturnType<
      typeof isRegistrationCompleteSelector
    >)
  ) {
    yield take('*');
    /**
     * Add small delay to let the main navigator to be displayed first.
     * This fixes the bug when on fresh install,
     * if a user gets availableExtraBonus during the welcome screens,
     * the dialog is not displayed after the registration complete
     */
    yield delay(1000);
  }
}
