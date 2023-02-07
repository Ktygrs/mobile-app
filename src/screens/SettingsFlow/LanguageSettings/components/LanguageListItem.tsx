// SPDX-License-Identifier: BUSL-1.1

import {CheckMark} from '@components/CheckMark';
import {Touchable} from '@components/Touchable';
import {SupportedLocale, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  language: SupportedLocale;
  selected: boolean;
  loading: boolean;
  onSelect: (value: SupportedLocale) => void;
};

export const LanguageListItem = memo(
  ({language, selected, loading, onSelect}: Props) => {
    return (
      <Touchable style={styles.container} onPress={() => onSelect(language)}>
        <Text style={styles.flag} numberOfLines={1}>
          {t('global.flag', {locale: language})}
        </Text>
        <Text style={styles.languageText} numberOfLines={1}>
          {t('global.language', {locale: language})}
        </Text>
        {selected && (
          <View style={styles.checkMarkWrapper}>
            {!loading ? <CheckMark /> : <ActivityIndicator />}
          </View>
        )}
      </Touchable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rem(10),
  },
  flag: {
    marginLeft: rem(16),
    ...font(20),
  },
  languageText: {
    flex: 1,
    marginLeft: rem(16),
    ...font(17, 22, 'regular', 'codeFieldText'),
  },
  checkMarkWrapper: {
    width: rem(60),
    alignItems: 'center',
  },
});
