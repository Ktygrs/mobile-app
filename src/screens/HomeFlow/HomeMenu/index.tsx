// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {BellIcon} from '@svg/BellIcon';
import {ChatBubblesIcon} from '@svg/ChatBubblesIcon';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {StatsIcon} from '@svg/StatsIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {rem} from 'rn-units';

export const HomeMenu = memo(() => {
  const navigation = useNavigation();
  const {
    params: {top, right, bottom, left},
  } = useRoute<RouteProp<HomeTabStackParamList, 'HomeMenu'>>();

  const onNotificationsPress = navigation.goBack;
  const onStatsPress = navigation.goBack;
  const onHelpPress = navigation.goBack;

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.container}>
        <View
          style={[
            styles.menu,
            commonStyles.shadow,
            {top, right, bottom, left},
          ]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={onNotificationsPress}>
            <BellIcon fill={COLORS.downriver} />
            <Text style={styles.menuItemText}>
              {t('home.menu.notifications')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onStatsPress}>
            <StatsIcon fill={COLORS.downriver} />
            <Text style={styles.menuItemText}>{t('home.menu.stats')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onHelpPress}>
            <ChatBubblesIcon fill={COLORS.downriver} />
            <Text style={styles.menuItemText}>{t('home.menu.help')}</Text>
          </TouchableOpacity>
          <RoundedTriangle
            fill={COLORS.white}
            width={rem(24)}
            height={rem(24)}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: rem(10),
  },
  menu: {
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    position: 'absolute',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: rem(10),
    paddingHorizontal: rem(20),
  },
  menuItemText: {
    marginLeft: rem(12),
    ...font(17, null, 'semibold', 'downriver'),
  },
  arrow: {
    position: 'absolute',
    right: rem(5),
    top: -rem(11),
  },
});
