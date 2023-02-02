// SPDX-License-Identifier: BUSL-1.1

import {appLocale} from '@translations/i18n';
// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(duration);

dayjs.locale(appLocale);

export {dayjs};
