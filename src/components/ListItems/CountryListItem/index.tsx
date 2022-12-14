// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {DEFAULT_FORMAT_LOCALE} from '@constants/formatting';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {getCountryByCode} from '@utils/country';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  code: string;
  userCount?: number | null;
  AdditionalInfoComponent?: ReactNode;
  nameStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CountryListItem = memo(
  ({
    code,
    userCount,
    AdditionalInfoComponent,
    nameStyle,
    containerStyle,
  }: Props) => {
    const {current: country} = getCountryByCode(code);

    if (!country) {
      return null;
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.flagText}>{country.flag}</Text>
        <Text style={[styles.nameText, nameStyle]} numberOfLines={1}>
          {country.name}
        </Text>
        {userCount ? (
          <View style={styles.users}>
            <TierTwoIcon
              fill={COLORS.secondary}
              width={rem(22)}
              height={rem(22)}
            />
            <Text style={styles.usersText}>
              {' '}
              {userCount.toLocaleString(DEFAULT_FORMAT_LOCALE)}
            </Text>
          </View>
        ) : (
          AdditionalInfoComponent
        )}
      </View>
    );
  },
);

export const CountryListItemSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={[styles.skeleton, containerStyle]} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
    height: rem(30),
  },
  flagText: {
    ...font(30, 36),
  },
  nameText: {
    flex: 1,
    marginLeft: rem(12),
    ...font(15, 20, 'bold', 'primaryDark'),
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usersText: {
    ...font(12, 20, 'bold', 'secondary'),
  },
  skeleton: {
    height: rem(30),
    borderRadius: rem(9),
    marginTop: rem(20),
    alignSelf: 'stretch',
  },
});
