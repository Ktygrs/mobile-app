// SPDX-License-Identifier: BUSL-1.1

import {countries, Country} from '@constants/countries';

const countriesByCode: {[code: string]: Country} = {};

export const getCountryByCode = (countryCode?: string | null) => {
  if (!Object.keys(countriesByCode).length) {
    countries.forEach(
      country => (countriesByCode[country.isoCode.toLowerCase()] = country),
    );
  }

  return {
    current: countryCode ? countriesByCode[countryCode.toLowerCase()] : null,
    default: countries[0],
  };
};
