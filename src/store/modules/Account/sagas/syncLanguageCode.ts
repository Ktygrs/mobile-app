// SPDX-License-Identifier: BUSL-1.1

import {getAuthLanguageCode, setAuthLanguageCode} from '@services/auth';
import {setDayjsLocale} from '@services/dayjs';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getLocale, setLocale} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import {call, SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check user.language property and react on locale change
 */
export function* syncLanguageCodeSaga() {
  while (true) {
    yield call(waitForSelector, state => {
      const appLocale = appLocaleSelector(state);

      return appLocale !== getLocale();
    });

    const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    setLocale(locale);

    setDayjsLocale(locale);

    I18nManager.forceRTL(localeConfig[locale].isRTL);

    /**
     * Sync locale with auth service
     */
    if (locale !== getAuthLanguageCode()) {
      yield call(setAuthLanguageCode, locale);
    }
  }
}
