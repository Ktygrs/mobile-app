// SPDX-License-Identifier: BUSL-1.1

import {
  COUNTRY_ITEM_HEIGHT,
  CountryListItem,
} from '@components/PhoneNumberSearch/components/CountryListItem';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {countries, Country} from '@constants/countries';
import {CloseIcon} from '@svg/CloseIcon';
import {SearchIconSvg} from '@svg/SearchIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {debounce} from 'lodash';
import React, {useCallback, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

interface PhoneNumberSearchProps extends TextInputProps {
  selectedCountry: Country;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  showCode?: boolean;
  close: () => void;
  setCountryCode: (v: Country) => void;
}

export const PhoneNumberSearch = ({
  selectedCountry,
  containerStyle,
  headerStyle,
  showCode = true,
  close,
  setCountryCode,
  ...textInputProps
}: PhoneNumberSearchProps) => {
  const [countriesCodeItems, setCountriesCodeItems] = useState(countries);

  const setSearchValue = debounce((searchValue: string) => {
    if (!isNaN(+searchValue)) {
      setCountriesCodeItems(
        countries.filter(v => v.iddCode.includes(searchValue)),
      );
    } else {
      setCountriesCodeItems(
        countries.filter(v =>
          v.name.toLowerCase().startsWith(searchValue.toLowerCase()),
        ),
      );
    }
  }, 500);

  const onCountryPress = useCallback(
    (country: Country) => {
      setCountryCode(country);
      close();
    },
    [close, setCountryCode],
  );

  const renderCountry = useCallback(
    ({item}: {item: Country}) => {
      return (
        <CountryListItem
          onPress={onCountryPress}
          showCode={showCode}
          country={item}
        />
      );
    },
    [onCountryPress, showCode],
  );

  const getItemLayout = useCallback((data, index) => {
    return {
      length: COUNTRY_ITEM_HEIGHT,
      offset: COUNTRY_ITEM_HEIGHT * index,
      index,
    };
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.header, headerStyle]}>
        <Text style={styles.countryIcon}>{selectedCountry.flag}</Text>
        <Text style={styles.name}>{selectedCountry.name}</Text>
        <Touchable style={styles.closeButton} onPress={close}>
          <CloseIcon />
        </Touchable>
      </View>
      <View style={styles.search}>
        <SearchIconSvg />
        <TextInput
          placeholder={t('button.search_country')}
          style={styles.input}
          onChangeText={setSearchValue}
          autoFocus
          autoCorrect={false}
          spellCheck={false}
          keyboardType="name-phone-pad"
          {...textInputProps}
        />
      </View>
      <FlatList
        data={countriesCodeItems}
        renderItem={renderCountry}
        maxToRenderPerBatch={30}
        getItemLayout={getItemLayout}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: rem(13),
    borderColor: COLORS.secondaryLight,
    height: rem(240),
    backgroundColor: COLORS.white,
  },
  countryIcon: {
    fontSize: rem(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: rem(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryLight,
    paddingVertical: rem(8),
  },
  name: {
    flex: 1,
    marginLeft: rem(4),
    ...font(15, null, 'regular', 'secondary'),
  },
  closeButton: {
    paddingHorizontal: rem(12),
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  search: {
    paddingHorizontal: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingLeft: rem(9),
    paddingVertical: rem(10),
    flex: 1,
    ...font(15, null, 'regular', 'primaryDark'),
  },
});
