// SPDX-License-Identifier: BUSL-1.1

import {dayjs} from '@services/dayjs';

export function getPreviousDate(dayBack: number) {
  const currentDate = dayjs();
  const date = currentDate.set('date', currentDate.get('date') - dayBack);
  return date.format('MM/DD');
}

export const toDateString = (date?: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD');
};
