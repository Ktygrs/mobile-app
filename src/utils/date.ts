// SPDX-License-Identifier: BUSL-1.1

import dayjs from 'dayjs';

export function getPreviousDate(dayBack: number) {
  const currentDate = dayjs();
  const date = currentDate.set('date', currentDate.get('date') - dayBack);
  return date.format('MM/DD');
}
