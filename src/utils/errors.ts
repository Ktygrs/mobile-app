// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {navigationRef} from '@navigation/utils';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';

export const getErrorMessage = (error: unknown): string => {
  if (checkProp(error, 'message')) {
    return String(error.message);
  } else if (typeof error === 'string') {
    return error;
  } else if (isApiError(error)) {
    return t('error.api_error', {
      status: error.response?.status ?? 'UNKNOWN',
      code: error.response?.data?.code ?? 'UNKNOWN',
    });
  }
  return t('error.general_error');
};

export const showError = (localizedError: string) => {
  navigationRef.navigate('ErrorPopUp', {
    message: `${t('pop_up.try_again_text', {
      errorIdentifier: `TODO set error identifier: ${localizedError}`,
    })}`,
  });
};
