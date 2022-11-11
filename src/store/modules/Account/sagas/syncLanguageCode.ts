// SPDX-License-Identifier: BUSL-1.1

import {getAuthLanguageCode, setAuthLanguageCode} from '@services/auth';
import {appLocale} from '@translations/i18n';
import {call} from 'redux-saga/effects';

export function* syncLanguageCodeSaga() {
  if (appLocale !== getAuthLanguageCode()) {
    yield call(setAuthLanguageCode, appLocale);
  }
}
