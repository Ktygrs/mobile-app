// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory, SummaryBadge} from '@api/badges/types';
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
  privacyInfoIsShown?: boolean;
};

const NUMBER_OF_SKELETONS = 5;

export const BadgeList = ({
  loading,
  data,
  isProfilePrivacyEditMode,
  user,
  privacyInfoIsShown,
}: Props) => {
  const hidden =
    user?.hiddenProfileElements?.includes('badges') && privacyInfoIsShown;

  const renderItem = useCallback(
    ({item, index}: {item: SummaryBadge | null; index: number}) => {
      if (item === null) {
        return <BadgeCardSkeleton />;
      }

      const image = `${[item.type]}0_achieved_true`;
      const inactiveImage = `${[item.type]}0_achieved_false`;
      const categoryTransaltion = t(
        `profile.badge_types.${item.type as BadgeCategory}.title`,
      );

      return (
        <BadgeCard
          index={index}
          imageSource={Images.badges[image as keyof typeof Images.badges]}
          imageInactive={
            Images.badges[inactiveImage as keyof typeof Images.badges]
          }
          title={item.name}
          category={categoryTransaltion}
          progressText={`${item.index + 1} of ${item.lastIndex + 1}`}
          progressValue={((item.index + 1) * 100) / (item.lastIndex + 1)}
          hidden={hidden}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          type={item.type}
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
