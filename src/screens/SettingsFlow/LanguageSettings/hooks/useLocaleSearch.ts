// SPDX-License-Identifier: BUSL-1.1

import {debounce} from 'lodash';
import {useMemo, useState} from 'react';

export const useLocaleSearch = (availableLocales: string[]) => {
  const [locales, setLocales] = useState(availableLocales);

  const searchLocales = useMemo(
    () =>
      debounce((term: string) => {
        setLocales(
          term
            ? availableLocales.filter(l =>
                l.toLowerCase().includes(term.toLowerCase()),
              )
            : availableLocales,
        );
      }, 600),
    [availableLocales],
  );

  return {
    locales,
    searchLocales,
  };
};
