// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {t} from '@translations/i18n';
import {useCallback, useMemo} from 'react';

export function useAchievementItem(achievement: Achievement) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const achievementToDisplay = useMemo(() => {
    let item: Achievement = {...achievement};

    switch (achievement.name) {
      case 'claim_username':
        item.iconBackground = COLORS.dodgerBlue;
        // item.Icon = <VerifiedUserSvg />;
        item.title = t('home.steps.step_one.title');
        item.description = t('home.steps.step_one.description');
        break;
      case 'start_mining':
        item.iconBackground = COLORS.downriver;
        // item.Icon = <LogoIcon color={COLORS.white} width={24} height={24} />
        item.title = t('home.steps.step_two.title');
        item.description = t('home.steps.step_two.description');
        break;

      case 'upload_profile_picture':
        item.iconBackground = COLORS.gullGray;
        // item.Icon = <UserCircleSvg />
        item.title = t('home.steps.step_three.title');
        item.description = t('home.steps.step_three.description');
        break;

      case 'follow_us_on_twitter':
        item.iconBackground = COLORS.toreaBay;
        // item.Icon = <TwitterIcon width={20} height={20} fill={COLORS.white} />
        item.title = t('home.steps.step_five.title');
        item.description = t('home.steps.step_five.description');
        break;

      case 'join_telegram':
        item.iconBackground = COLORS.royalBlue;
        // item.Icon = <TelegramSvg />
        item.title = t('home.steps.step_four.title');
        item.description = t('home.steps.step_four.description');
        break;

      case 'invite_friends':
        item.iconBackground = COLORS.blueViolet;
        // item.Icon = <InviteIcon fill={COLORS.white} width={21} height={20} />;
        item.title = t('home.steps.step_six.title');
        item.description = t('home.steps.step_six.description');
        break;
    }
    return item;
  }, [achievement]);

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
    item: achievementToDisplay,
    showJoinTelegramModal,
  };
}
