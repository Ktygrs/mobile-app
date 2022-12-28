// SPDX-License-Identifier: BUSL-1.1

import locales, {Translations} from '@translations/translations.json';
// eslint-disable-next-line no-restricted-imports
import {I18n, TranslateOptions} from 'i18n-js';
import RNLocalize from 'react-native-localize';

const i18n = new I18n(locales);

export const availableLocales = Object.keys(locales);

export const locale = RNLocalize.findBestAvailableLanguage(availableLocales);

i18n.defaultLocale = 'en';

export const appLocale = locale?.languageTag || i18n.defaultLocale;

i18n.locale = appLocale;
i18n.enableFallback = true;
i18n.translations = locales;

export default i18n;

export function translate<
  K extends keyof Translations,
  O extends Translations[K],
>(
  ...args: O extends null
    ? Parameters<(key: K, options?: TranslateOptions) => string>
    : Parameters<(key: K, options: O & TranslateOptions) => string>
) {
  return i18n.t(args[0], args[1]);
}

export const t = translate;
