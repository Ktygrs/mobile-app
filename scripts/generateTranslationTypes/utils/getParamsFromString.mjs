// SPDX-License-Identifier: BUSL-1.1

export const getParamsFromString = input => {
  const params = [...input.matchAll(/{{(\w+)}}/g)].map(match => match[1]);
  return [...new Set(params)];
};
