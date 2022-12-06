// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@api/badges/types';
import {BadgeCard} from '@screens/ProfileFlow/Badges/components/BadgeCard';
import React, {useCallback} from 'react';
import {FlatListProps} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = Omit<FlatListProps<Badge>, 'renderItem'>;

export const BadgeList = ({
  data,
  contentContainerStyle,
  ...restProps
}: Props) => {
  const renderItem = useCallback(
    ({item, index}: {item: Badge; index: number}) => {
      const nextBadge = data && index < data.length ? data[index + 1] : null;
      return (
        <BadgeCard
          {...item}
          connector={{
            top: index > 0,
            bottom: !!nextBadge,
          }}
        />
      );
    },
    [data],
  );

  return (
    <Animated.FlatList
      {...restProps}
      data={data}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
    />
  );
};
