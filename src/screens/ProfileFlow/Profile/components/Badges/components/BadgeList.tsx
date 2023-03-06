// SPDX-License-Identifier: BUSL-1.1

import {SummaryBadge} from '@api/badges/types';
import {User} from '@api/user/types';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  BadgeCard,
  BadgeCardSkeleton,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {t} from '@translations/i18n';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  loading: boolean;
  data: SummaryBadge[];
  user?: User | null;
  isProfilePrivacyEditMode?: boolean;
  isPrivacyInfoShown?: boolean;
};

const NUMBER_OF_SKELETONS = 5;

export const BadgeList = ({
  loading,
  data,
  isProfilePrivacyEditMode,
  user,
  isPrivacyInfoShown,
}: Props) => {
  const hidden =
    user?.hiddenProfileElements?.includes('badges') && isPrivacyInfoShown;

  const renderItem = useCallback(
    ({item, index}: {item: SummaryBadge | null; index: number}) => {
      if (item === null) {
        return <BadgeCardSkeleton />;
      }

      const image = `${[item.type]}0_achieved_true`;
      const inactiveImage = `${[item.type]}0_achieved_false`;
      const ActiveImage = Images.badges[
        image as keyof typeof Images.badges
      ] as React.ElementType;
      const InactiveImage = Images.badges[
        inactiveImage as keyof typeof Images.badges
      ] as React.ElementType;

      const value = item.index + 1;
      const total = item.lastIndex + 1;

      return (
        <BadgeCard
          isFirstItem={index === 0}
          activeImage={<ActiveImage />}
          inactiveImage={<InactiveImage />}
          title={item.name}
          category={item.type}
          progressText={t('profile.progress_text', {value, total})}
          progressValue={(value * 100) / total}
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
    paddingBottom: rem(10),
    backgroundColor: COLORS.white02opacity,
    borderTopLeftRadius: rem(20),
    borderBottomLeftRadius: rem(20),
  },
});
