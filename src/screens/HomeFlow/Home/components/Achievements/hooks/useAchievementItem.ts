// SPDX-License-Identifier: BUSL-1.1

import {AchievementType} from '@api/achievements/types';
import {LINKS} from '@constants/links';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {achievements} from '@screens/HomeFlow/Home/components/Achievements/achievements';
import {logError} from '@services/logging';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {openLinkWithInAppBrowser} from '@utils/device';
import {useCallback} from 'react';
import {Linking} from 'react-native';
import {useDispatch} from 'react-redux';

export function useAchievementItem(type: AchievementType) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    switch (type) {
      case 'start_mining':
        dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
        break;
      case 'upload_profile_picture':
        navigation.navigate('ProfileTab');
        break;
      case 'follow_us_on_twitter':
        Linking.canOpenURL(LINKS.TWITTER_SCHEME)
          .then(supported => {
            dispatch(
              AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
            );
            if (supported) {
              return Linking.openURL(LINKS.TWITTER_APP_URL);
            } else {
              openLinkWithInAppBrowser({
                url: LINKS.TWITTER_PROFILE_URL,
              });
            }
          })
          .catch(logError);
        break;
      case 'join_telegram':
        navigation.navigate('JoinTelegramPopUp');
        break;
      case 'invite_friends':
        navigation.navigate('InviteShare');
        break;
    }
  }, [dispatch, type, navigation]);

  return {
    title: achievements[type].title,
    description: achievements[type].description,
    iconBgColor: achievements[type].iconBgColor,
    onPress,
  };
}
