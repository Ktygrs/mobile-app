// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {Images} from '@images';
import PopUp from '@screens/Templates/PopUp';
import {logError} from '@services/logging';
import {UpdateNow} from '@svg/PopUp/UpdateNow';
import {t} from '@translations/i18n';
import React, {useEffect} from 'react';
import {BackHandler, Linking} from 'react-native';
import {isIOS} from 'rn-units';

export const UpdateRequired = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const onUpdatePress = async () => {
    try {
      await Linking.openURL(isIOS ? LINKS.APP_STORE : LINKS.PLAY_STORE);
    } catch (error) {
      logError(error);
    }
  };

  return (
    <PopUp
      image={Images.popUp.updateRequired}
      title={t('pop_up.update_now')}
      message={t('pop_up.update_now_text')}
      buttonIcon={<UpdateNow fill={COLORS.white} />}
      buttonText={t('pop_up.please_update')}
      onButtonPress={onUpdatePress}
      dismissOnOutsideTouch={false}
      dismissOnButtonPress={false}
    />
  );
};
