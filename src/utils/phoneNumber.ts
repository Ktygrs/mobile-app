// SPDX-License-Identifier: BUSL-1.1

import {
  CountryCode,
  formatIncompletePhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js/min';
import {sha256} from 'react-native-sha256';

export const formatPhoneNumber = (
  phone: string,
  countryIsoCode?: string,
  countryIddCode?: string,
) => {
  const formatted = formatIncompletePhoneNumber(
    phone,
    countryIsoCode as CountryCode,
  );
  if (countryIddCode) {
    return formatted.replace(countryIddCode, '').trim();
  } else {
    return formatted;
  }
};

/**
 * countryCode helps to parse numbers in national format
 * e.g. 8 (909) 999-66-99 -> +79099996699
 */
export const e164PhoneNumber = (
  phone: string,
  countryCode?: string | null,
): string => {
  return parsePhoneNumberWithError(phone, countryCode as CountryCode).format(
    'E.164',
  );
};

/**
 * countryCode helps to parse numbers in national format
 * e.g. 0503332211 -> +380 50 333 2211 (format is different for each country/locale)
 */
export const beautifyPhoneNumber = (
  phone: string,
  countryCode?: string | null,
): string => {
  const parsedNumber = parsePhoneNumberWithError(
    phone,
    countryCode as CountryCode,
  );
  return parsedNumber.format('INTERNATIONAL');
};

export const hashPhoneNumber = (phone: string) => {
  return sha256(phone);
};
