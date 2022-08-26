// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Country} from '@constants/countries';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: (country: Country) => void;
  country: Country;
  showCode: boolean;
};

export const COUNTRY_ITEM_HEIGHT = rem(36);

export const CountryListItem = memo(({country, showCode, onPress}: Props) => {
  return (
    <TouchableOpacity
      key={country.name}
      style={styles.searchItem}
      onPress={() => onPress(country)}>
      <Text style={styles.countryIcon}>{country.flag}</Text>
      <Text style={styles.nameText}>
        {country.name}
        {showCode && <Text style={styles.code}>{` (${country.iddCode})`}</Text>}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  countryIcon: {
    fontSize: rem(24),
  },
  nameText: {
    flex: 1,
    marginLeft: rem(4),
    ...font(15, null, 'regular', 'secondary'),
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: rem(12),
    height: COUNTRY_ITEM_HEIGHT,
  },
  code: {
    color: COLORS.primaryDark,
  },
});
