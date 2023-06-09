// SPDX-License-Identifier: BUSL-1.1

import {store} from '@store/configureStore';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {AxiosRequestConfig} from 'axios';

async function onFulfilled(config: AxiosRequestConfig) {
  if (!config.headers?.Authorization) {
    const accessToken = authTokenSelector(store.getState());

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  if (config.data instanceof FormData) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    };
    config.transformRequest = (data: FormData) => data;
  }

  return config;
}

export const requestInterceptor = {onFulfilled};
