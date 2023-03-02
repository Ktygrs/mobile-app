// SPDX-License-Identifier: BUSL-1.1

import {Achievement, AchievementType} from '@api/achievements/types';
import {COLORS} from '@constants/colors';
import {MainStackParamList, MainTabsParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

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
  const tabsNavigation =
    useNavigation<NativeStackNavigationProp<MainTabsParamList>>();

  const dispatch = useDispatch();

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

  const onPress = useCallback(() => {
    switch (type) {
      case 'start_mining':
        dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
        break;
      case 'upload_profile_picture':
        tabsNavigation.navigate('ProfileTab');
        break;
      case 'follow_us_on_twitter':
        break;
      case 'join_telegram':
        break;
      case 'invite_friends':
        break;
      default:
        break;
    }
  }, [dispatch, type, tabsNavigation]);

  return {
    showJoinTelegramModal,
    title: titles[type],
    description: descriptions[type],
    iconBgColor: iconBackgrounds[type],
    onPress,
  };
}
