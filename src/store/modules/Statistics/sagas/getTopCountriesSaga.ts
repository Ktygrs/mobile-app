// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {StatisticsActions} from '@store/modules/Statistics/actions';
import {Country} from '@store/modules/Statistics/reducer';
import {getErrorMessage} from '@utils/errors';
import {put} from 'redux-saga/effects';

export function* getTopCountriesSaga() {
  try {
    const response: Country[] = yield Api.statistics.getTopCountries();
    yield put(StatisticsActions.GET_TOP_COUNTRIES.SUCCESS.create(response));
  } catch (error) {
    yield put(
      StatisticsActions.GET_TOP_COUNTRIES.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
