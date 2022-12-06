// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import PopUp from '@screens/Templates/PopUp';
import {Oops} from '@svg/PopUp/Oops';
import {t} from '@translations/i18n';
import React from 'react';

export const ErrorPopUp = () => {
  const {
    params: {message},
  } = useRoute<RouteProp<MainStackParamList, 'ErrorPopUp'>>();
  return (
    <PopUp
      image={Images.popUp.error}
      title={t('pop_up.ups')}
      message={message || t('pop_up.try_again_text', {errorIdentifier: ''})}
      buttonIcon={<Oops fill={COLORS.white} />}
      buttonText={t('pop_up.try_again')}
    />
  );
};
