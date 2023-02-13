// SPDX-License-Identifier: BUSL-1.1

import {isApiError, isNetworkError} from '@api/client';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {Oops} from '@svg/PopUp/Oops';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import React from 'react';

export const getErrorMessage = (error: unknown): string => {
  if (isNetworkError(error)) {
    return t('errors.network_error_message');
  } else if (isApiError(error)) {
    return t('errors.general_error_message');
  } else if (checkProp(error, 'message')) {
    return String(error.message);
  } else if (typeof error === 'string') {
    return error;
  }
  return t('errors.unknown_error');
};

export const showError = (error: unknown) => {
  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.error},
      title: isNetworkError(error)
        ? t('errors.network_error_title')
        : t('errors.general_error_title'),
      message: getErrorMessage(error),
      buttons: [
        {label: t('button.try_again'), Icon: <Oops fill={COLORS.white} />},
      ],
    },
  });
};
