// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ViewChangelog} from '@svg/PopUp/ViewChangelog';
import {t} from '@translations/i18n';
import React, {useEffect} from 'react';

//TODO: not used so far
export const useUpdateSuccessfulListener = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    navigation.navigate('PopUp', {
      image: Images.popUp.upToDate,
      title: t('pop_up.you_are_up_to_date'),
      message: t('pop_up.up_to_date_text'),
      buttons: [
        {
          Icon: <ViewChangelog fill={COLORS.white} />,
          label: t('pop_up.view_changelog'),
        },
      ],
    });
  }, [navigation]);
};
