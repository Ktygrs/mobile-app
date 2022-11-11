// SPDX-License-Identifier: BUSL-1.1

import {getAuthToken} from '@services/auth';
import {store} from '@store/configureStore';
import {AccountActions} from '@store/modules/Account/actions';
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

function onRejected(instance: AxiosInstance) {
  return async (error: {
    message: string;
    request?: unknown;
    response?: AxiosResponse;
    config?: AxiosRequestConfig & {
      pliantRequestRetry?: boolean;
    };
    isAxiosError: boolean;
  }) => {
    switch (error.response?.status) {
      case 401:
        {
          const originalRequest = error.config ?? {};

          if (!originalRequest.pliantRequestRetry) {
            const token = await getAuthToken();

            originalRequest.pliantRequestRetry = true;
            originalRequest.headers!.Authorization = `Bearer ${token}`;
            store.dispatch(AccountActions.SET_TOKEN.STATE.create(token));
            return instance(originalRequest);
          } else {
            store.dispatch(AccountActions.SIGN_OUT.START.create());
          }
        }
        break;
    }

    return Promise.reject(error);
  };
}

export const responseInterceptor = {onRejected};
