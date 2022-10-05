// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {useNavigation} from '@react-navigation/native';
import PopUp from '@screens/Templates/PopUp';
import {ViewChangelog} from '@svg/PopUp/ViewChangelog';
import {t} from '@translations/i18n';
import React from 'react';

export const UpdateSuccessful = () => {
  const navigation = useNavigation();
  return (
    <PopUp
      image={Images.popUp.upToDate}
      title={t('pop_up.you_are_up_to_date')}
      message={t('pop_up.up_to_date_text')}
      buttonIcon={<ViewChangelog fill={COLORS.white} />}
      buttonText={t('pop_up.view_changelog')}
      onButtonPress={navigation.goBack}
    />
  );
};
