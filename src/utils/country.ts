// SPDX-License-Identifier: BUSL-1.1

import {countries} from '@constants/countries';

export const getCountryByCode = (countryCode?: string | null) => {
  return {
    current: countryCode
      ? countries.find(
          country =>
            country.isoCode.toLowerCase() === countryCode.toLowerCase(),
        )
      : null,
    default: countries[0],
  };
};
