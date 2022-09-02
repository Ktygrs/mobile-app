// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {Touchable} from '@components/Touchable';
import {Country} from '@constants/countries';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  label: string;
  selectedCountry: Country;
  isCountrySearchVisible: boolean;
  setCountrySearchVisibility: (visible: boolean) => void;
  onCountrySelect: (country: Country) => void;
  editable?: boolean;
};

export const ListControlCountry = memo(
  ({
    label,
    selectedCountry,
    isCountrySearchVisible,
    setCountrySearchVisibility,
    onCountrySelect,
    editable = true,
  }: Props) => {
    return (
      <>
        <Touchable
          onPress={() => setCountrySearchVisibility(true)}
          disabled={!editable}>
          <ListControlBase label={label}>
            <Text style={styles.countryText}>{selectedCountry.name}</Text>
          </ListControlBase>
        </Touchable>
        {isCountrySearchVisible && (
          <PhoneNumberSearch
            containerStyle={styles.countrySearch}
            selectedCountry={selectedCountry}
            close={() => setCountrySearchVisibility(false)}
            setCountryCode={onCountrySelect}
            headerStyle={styles.searchHeader}
            showCode={false}
          />
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  countryText: {
    alignSelf: 'center',
    ...font(14, null, 'bold', 'secondary'),
  },
  countrySearch: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  searchHeader: {
    height: rem(50),
  },
});
