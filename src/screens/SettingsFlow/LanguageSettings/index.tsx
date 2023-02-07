// SPDX-License-Identifier: BUSL-1.1

import {SearchInput} from '@components/Inputs/SearchInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {COLORS} from '@constants/colors';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {LanguageListItem} from '@screens/SettingsFlow/LanguageSettings/components/LanguageListItem';
import {useConfirmChangeLanguageDialog} from '@screens/SettingsFlow/LanguageSettings/hooks/useConfirmChangeLanguageDialog';
import {useLocaleSearch} from '@screens/SettingsFlow/LanguageSettings/hooks/useLocaleSearch';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {availableLocales, SupportedLocale, t} from '@translations/i18n';
import {noop} from 'lodash';
import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const LanguageSettings = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const deviceSettings = useSelector(deviceSettingsSelector);
  const isLoading = useSelector(
    isLoadingSelector.bind(null, DeviceActions.UPDATE_SETTINGS),
  );

  const {locales, searchLocales} = useLocaleSearch(availableLocales);
  const {openConfirmationDialog} = useConfirmChangeLanguageDialog();

  const renderLanguageListItem: ListRenderItem<SupportedLocale> = useCallback(
    ({item: language}) => {
      const isSelected =
        deviceSettings?.language.toLowerCase() === language.toLowerCase();
      return (
        <LanguageListItem
          key={language}
          selected={isSelected}
          language={language}
          onSelect={isSelected ? noop : openConfirmationDialog}
          loading={isLoading}
        />
      );
    },
    [deviceSettings?.language, isLoading, openConfirmationDialog],
  );

  return (
    <KeyboardAvoider>
      <Header
        color={COLORS.primaryDark}
        backgroundColor={COLORS.white}
        title={t('settings.language_settings')}
      />
      <SearchInput
        onChangeText={searchLocales}
        placeholder={t('button.search')}
        containerStyle={styles.search}
      />
      <FlatList
        contentContainerStyle={bottomOffset.current}
        data={locales}
        renderItem={renderLanguageListItem}
        keyboardShouldPersistTaps={'handled'}
      />
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  search: {
    marginHorizontal: rem(16),
    marginBottom: rem(10),
  },
});
