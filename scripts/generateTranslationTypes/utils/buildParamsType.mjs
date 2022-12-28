// SPDX-License-Identifier: BUSL-1.1

export const PARAMS_TYPE = 'number | string';
export const COUNT_TYPE = 'number';

export const buildParamsType = params => {
  return params.reduce(
    (result, param) => ({...(result ?? {}), [param]: PARAMS_TYPE}),
    null,
  );
};
