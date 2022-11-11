// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@api/badges/types';
import {COLORS} from '@constants/colors';
import {
  BadgeCard,
  BadgeCardSkeleton,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {userSelector} from '@store/modules/Account/selectors';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  loading: boolean;
  data: Badge[];
  isProfilePrivacyEditMode?: boolean;
};

const NUMBER_OF_SKELETONS = 5;

export const BadgeList = ({loading, data, isProfilePrivacyEditMode}: Props) => {
  const user = useSelector(userSelector);
  const hidden = user?.hiddenProfileElements?.includes('badges');

  const renderItem = useCallback(
    ({item}: {item: Badge | null}) => {
      if (item === null) {
        return <BadgeCardSkeleton />;
      }

      return (
        <BadgeCard
          imageSource={item.imageSource}
          imageInactive={item.imageInactive}
          title={item.title}
          category={item.category}
          progressText={item.progressText}
          progressValue={item.progressValue}
          hidden={hidden}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
        />
      );
    },
    [hidden, isProfilePrivacyEditMode],
  );

  return (
    <FlatList
      data={loading ? Array(NUMBER_OF_SKELETONS).fill(null) : data}
      renderItem={renderItem}
      horizontal={true}
      contentContainerStyle={styles.listContent}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: rem(14),
    marginLeft: rem(12),
  },
  listContent: {
    paddingHorizontal: rem(10),
    paddingVertical: rem(10),
    backgroundColor: COLORS.white02opacity,
    borderTopLeftRadius: rem(20),
    borderBottomLeftRadius: rem(20),
  },
});
