// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getErrorMessage, showError} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* startOrUpdatePreStakingSaga({
  payload: {years, allocation},
}: ReturnType<
  typeof TokenomicsActions.START_OR_UPDATE_PRE_STAKING.START.create
>) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const miningSummary: SagaReturnType<
      typeof Api.tokenomics.startOrUpdatePreStaking
    > = yield call(Api.tokenomics.startOrUpdatePreStaking, {
      userId,
      years,
      allocation,
    });
    yield put(
      TokenomicsActions.START_OR_UPDATE_PRE_STAKING.SUCCESS.create(
        miningSummary,
      ),
    );
  } catch (error) {
    yield put(
      TokenomicsActions.START_OR_UPDATE_PRE_STAKING.FAILED.create(
        getErrorMessage(error),
      ),
    );
    showError(error);
    throw error;
  }
}
