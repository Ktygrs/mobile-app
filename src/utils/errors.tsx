// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {Oops} from '@svg/PopUp/Oops';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import React from 'react';

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

export const showError = (errorIdentifier: string) => {
  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.error},
      title: t('pop_up.ups'),
      message: t('pop_up.try_again_text', {
        errorIdentifier: `TODO set error identifier: ${errorIdentifier}`,
      }),
      buttons: [
        {label: t('pop_up.try_again'), Icon: <Oops fill={COLORS.white} />},
      ],
    },
  });
};
