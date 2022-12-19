// SPDX-License-Identifier: BUSL-1.1

import {Filter} from '@screens/HomeFlow/BalanceHistory/components/Filters';
import {
  BalanceDiff,
  BalanceHistoryPoint,
  MOCK_HISTORY,
} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/mockData';
import {useCallback, useEffect, useState} from 'react';

export type HistorySection = {
  time: string;
  balance: BalanceDiff;
  data: BalanceHistoryPoint[];
  collapsed?: boolean;
};

export const useGetHistorySections = ({
  selectedFilter,
}: {
  selectedFilter: Filter;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSection] = useState<HistorySection[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setSection([]);
    setTimeout(() => {
      setIsLoading(false);
      setSection(
        MOCK_HISTORY.map(section => {
          return {
            time: section.time,
            balance: section.balance,
            data: section.timeSeries ?? [],
          };
        }),
      );
    }, 1000);
  }, [selectedFilter]);

  const toggleSection = useCallback((section: HistorySection) => {
    setSection(currentSections => {
      const index = currentSections.indexOf(section);
      const nextSections = [...currentSections];
      nextSections[index] = {
        ...currentSections[index],
        collapsed: !currentSections[index].collapsed,
      };
      return nextSections;
    });
  }, []);

  return {sections, toggleSection, isLoading};
};
