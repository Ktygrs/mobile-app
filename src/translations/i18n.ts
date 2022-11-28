// SPDX-License-Identifier: BUSL-1.1

// eslint-disable-next-line no-restricted-imports
import {I18n, TranslateOptions} from 'i18n-js';
import RNLocalize from 'react-native-localize';

const locales = require('@translations/translations.json');

const i18n = new I18n(locales);

export const availableLocales = Object.keys(locales);

export const locale = RNLocalize.findBestAvailableLanguage(availableLocales);

i18n.defaultLocale = 'en';

export const appLocale = locale?.languageTag || i18n.defaultLocale;

i18n.locale = appLocale;
i18n.enableFallback = true;
i18n.translations = locales;

export default i18n;

export const translate = (scope: string, options?: TranslateOptions) =>
  i18n.t(scope, options);

export const t = translate;
