// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {Filter} from '@screens/HomeFlow/BalanceHistory/components/Filters';
import {EmptyHistory} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/components/EmptyHistory';
import {HistoryListFooter} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/components/HistoryListFooter';
import {HistoryListItem} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/components/HistoryListItem';
import {HistoryListLoader} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/components/HistoryListLoader';
import {HistoryListSectionHeader} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/components/HistoryListSectionHeader';
import {
  HistorySection,
  useGetHistorySections,
} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/hooks/useGetHistorySections';
import {BalanceHistoryPoint} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/mockData';
import {t} from '@translations/i18n';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  selectedFilter: Filter;
};

export const HistoryList = ({selectedFilter}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();
  const {sections, toggleSection, isLoading} = useGetHistorySections({
    selectedFilter,
  });

  const renderItem = useCallback(
    ({item, section}: {item: BalanceHistoryPoint; section: HistorySection}) => {
      if (section.collapsed) {
        return null;
      }
      return <HistoryListItem balanceDiff={item.balance} time={item.time} />;
    },
    [],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: HistorySection}) => {
      return (
        <Touchable onPress={() => toggleSection(section)}>
          <HistoryListSectionHeader
            balanceDiff={section.balance}
            time={section.time}
          />
        </Touchable>
      );
    },
    [toggleSection],
  );

  const renderEmptyList = useCallback(() => {
    return isLoading ? (
      <HistoryListLoader />
    ) : (
      <EmptyHistory label={t('balance_history.no_data')} />
    );
  }, [isLoading]);

  const contentContainerStyle = useMemo(
    () => [tabbarOffset.current, styles.container],
    [tabbarOffset],
  );

  return (
    <BottomSheetSectionList<BalanceHistoryPoint, HistorySection>
      contentContainerStyle={contentContainerStyle}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={sections.length ? HistoryListFooter : null}
      ListEmptyComponent={renderEmptyList}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
