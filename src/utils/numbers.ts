// SPDX-License-Identifier: BUSL-1.1

const formatters: {[key: string]: Intl.NumberFormat} = {};

export function formatNumber(
  input: number,
  fractionDigits: number = 0,
  //TODO:compact doesn't work on iOS https://github.com/facebook/hermes/issues/23#issuecomment-1253927200
  notation: 'standard' | 'scientific' | 'engineering' | 'compact' = 'standard',
) {
  const key = notation + fractionDigits;

  if (!formatters[key]) {
    formatters[key] = Intl.NumberFormat('en', {
      notation,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }

  return formatters[key].format(input);
}

export function parseNumber(input: string) {
  return parseFloat(input.replace(/,/g, ''));
}

/**
 * Format string with a number to be exactly with "fractionDigits" decimals
 * 1,234,567.123456789 -> 1,234,567.12
 * 1,234,567.1 -> 1,234,567.10
 */
export function formatNumberString(input: string, fractionDigits: number = 2) {
  const [whole, decimals] = input.split('.');

  if (!fractionDigits) {
    return whole;
  }

  return (
    whole +
    '.' +
    (decimals ?? '').substring(0, fractionDigits).padEnd(fractionDigits, '0')
  );
}
