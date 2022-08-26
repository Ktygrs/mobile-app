// SPDX-License-Identifier: BUSL-1.1

import {CheckBox} from '@components/CheckBox';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  language: string;
  selected: boolean;
  loading: boolean;
  onSelect: (value: string) => void;
};

export const LanguageListItem = memo(
  ({language, selected, loading, onSelect}: Props) => {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.languageText,
            selected && styles.languageText_selected,
          ]}
          numberOfLines={1}>
          {t('global.language', {locale: language})}
        </Text>
        {!loading || !selected ? (
          <CheckBox
            value={selected}
            onValueChange={() => onSelect(language)}
            style={styles.checkbox}
          />
        ) : (
          <ActivityIndicator style={styles.loader} />
        )}
      </View>
    );
  },
);

export const LanguageListItemSeparator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: rem(50),
    alignItems: 'center',
  },
  languageText: {
    marginLeft: rem(28),
    flex: 1,
    ...font(12, null, 'bold', 'secondary'),
  },
  languageText_selected: {
    color: COLORS.primaryDark,
  },
  checkbox: {
    marginHorizontal: rem(25),
  },
  loader: {
    marginRight: rem(28),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.secondaryFaint,
  },
});
