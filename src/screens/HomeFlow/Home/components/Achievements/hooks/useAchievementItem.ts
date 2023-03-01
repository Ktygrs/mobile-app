// SPDX-License-Identifier: BUSL-1.1

import {Achievement, AchievementType} from '@api/achievements/types';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {t} from '@translations/i18n';
import {useCallback} from 'react';

const titles: {[key in AchievementType]: string} = {
  claim_username: t('home.steps.step_one.title'),
  start_mining: t('home.steps.step_two.title'),
  upload_profile_picture: t('home.steps.step_three.title'),
  follow_us_on_twitter: t('home.steps.step_five.title'),
  join_telegram: t('home.steps.step_four.title'),
  invite_friends: t('home.steps.step_six.title'),
};

const descriptions: {[key in AchievementType]: string} = {
  claim_username: t('home.steps.step_one.description'),
  start_mining: t('home.steps.step_two.description'),
  upload_profile_picture: t('home.steps.step_three.description'),
  follow_us_on_twitter: t('home.steps.step_five.description'),
  join_telegram: t('home.steps.step_four.description'),
  invite_friends: t('home.steps.step_six.description'),
};

const iconBackgrounds: {[key in AchievementType]: string} = {
  claim_username: COLORS.dodgerBlue,
  start_mining: COLORS.downriver,
  upload_profile_picture: COLORS.gullGray,
  follow_us_on_twitter: COLORS.toreaBay,
  join_telegram: COLORS.royalBlue,
  invite_friends: COLORS.blueViolet,
};

export function useAchievementItem(achievement: Achievement) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {type} = achievement;

  const showJoinTelegramModal = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t('home.achievements.popup.title'),
      message: t('home.achievements.popup.description'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.confirm'),
          onPress: () => {},
        },
      ],
    });
  }, [navigation]);

  return {
    showJoinTelegramModal,
    title: titles[type],
    description: descriptions[type],
    iconBgColor: iconBackgrounds[type],
  };
}
