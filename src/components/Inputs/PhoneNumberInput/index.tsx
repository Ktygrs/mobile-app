// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {Country} from '@constants/countries';
import {ArrowDownIcon} from '@svg/ArrowDownIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {forwardRef, Ref} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

interface PhoneNumberInputProps extends TextInputProps {
  selectedCountry: Country;
  containerStyle?: StyleProp<ViewStyle>;
  showCountryCodeSearch: () => void;
  onValueChange: (v: string) => void;
}

export const PhoneNumberInput = forwardRef(
  (
    {
      selectedCountry,
      containerStyle,
      showCountryCodeSearch,
      onValueChange,
      ...textInputProps
    }: PhoneNumberInputProps,
    forwardedRef: Ref<TextInput>,
  ) => {
    return (
      <View style={[styles.container, containerStyle]}>
        <Touchable
          style={styles.countryIconContainer}
          onPress={showCountryCodeSearch}>
          <View style={styles.countryCodeWrapper}>
            <Text style={styles.countryIcon}>{selectedCountry.flag}</Text>

            <ArrowDownIcon />
          </View>
        </Touchable>

        <Text style={styles.code}>{selectedCountry.iddCode}</Text>

        <TextInput
          placeholder={`| ${t('global.phone_number')}`}
          keyboardType={'phone-pad'}
          style={styles.phone}
          onChangeText={onValueChange}
          ref={forwardedRef}
          {...textInputProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: rem(1.5),
    borderRadius: 13,
    borderColor: COLORS.secondaryLight,
    minHeight: rem(46),
  },
  countryIcon: {
    fontSize: rem(24),
    paddingRight: 7,
  },
  countryIconContainer: {
    borderRightWidth: rem(1.5),
    borderRightColor: COLORS.secondaryLight,
    paddingLeft: 15,
    paddingRight: 12,
  },
  code: {
    paddingRight: 5,
    paddingLeft: 9,
    alignSelf: 'center',
    ...font(14, null, 'black', 'primaryDark'),
  },
  phone: {
    flex: 1,
    ...font(15, null, 'regular', 'primaryDark'),
  },
  countryCodeWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});
