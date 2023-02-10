// SPDX-License-Identifier: BUSL-1.1

import {logError} from '@services/logging';
import {appLocale} from '@translations/i18n';
// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

// https://day.js.org/docs/en/installation/typescript#locale-and-plugin-import
switch (appLocale) {
  case 'en':
    require('dayjs/locale/en');
    break;

  case 'ro':
    require('dayjs/locale/ro');
    break;

  default:
    logError(`Setup '${appLocale}' locale properly for 'dayjs'`);
}

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(duration);
dayjs.extend(utc);

dayjs.locale(appLocale);

export {dayjs};
