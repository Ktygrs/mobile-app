// SPDX-License-Identifier: BUSL-1.1
const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
});

const formatterWithFractionDigits = Intl.NumberFormat('en', {
  notation: 'compact',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatNumber(n: number, withFractionDigits?: boolean) {
  return withFractionDigits
    ? formatterWithFractionDigits.format(n)
    : formatter.format(n);
}
