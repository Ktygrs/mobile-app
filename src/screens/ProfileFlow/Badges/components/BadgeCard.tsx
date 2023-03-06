// SPDX-License-Identifier: BUSL-1.1

import {BadgeType} from '@api/badges/types';
import {ImageCardCompact} from '@components/Cards/ImageCardCompact';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {BadgeProgress} from '@screens/ProfileFlow/Badges/components/BadgeCardProgress';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  name: string;
  type: BadgeType;
  achieved: boolean;
  percentageOfUsersInProgress: number;
  achievingRange: {
    fromInclusive?: number;
    toInclusive?: number;
  };
  index: number;
  connector: {
    top?: boolean | null;
    bottom?: boolean | null;
  };
};

export const BadgeCard = ({
  name,
  index,
  type,
  achieved,
  percentageOfUsersInProgress,
  achievingRange,
  connector = {},
}: Props) => {
  const image = `${[type]}${index}_achieved_${achieved}`;

  let description = '';

  if (achievingRange.fromInclusive && achievingRange.toInclusive) {
    description = `${achievingRange.fromInclusive}-${
      achievingRange.toInclusive
    } ${t(`profile.badge_types.${type}.description`)}`;
  }
  if (!achievingRange?.toInclusive && achievingRange?.fromInclusive) {
    description = `> ${achievingRange?.fromInclusive - 1} ${t(
      `profile.badge_types.${type}.description`,
    )}`;
  }
  if (!achievingRange?.fromInclusive && achievingRange?.toInclusive) {
    description = `< ${achievingRange?.toInclusive + 1} ${t(
      `profile.badge_types.${type}.description`,
    )}`;
  }

  const ImageSvg = Images.badges[
    image as keyof typeof Images.badges
  ] as React.ElementType;

  return (
    <>
      {connector.top && (
        <View style={[styles.connector, styles.connectorTop]} />
      )}
      {connector.bottom && (
        <View style={[styles.connector, styles.connectorBottom]} />
      )}
      <ImageCardCompact
        title={name}
        description={description}
        svgIcon={<ImageSvg width={rem(76)} height={rem(76)} />}
        renderBody={() => <BadgeProgress value={percentageOfUsersInProgress} />}
        containerStyle={styles.containerActive}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    marginTop: rem(19),
    marginBottom: rem(20),
  },
  connector: {
    position: 'absolute',
    width: 1,
    left: SCREEN_SIDE_OFFSET + rem(48),
    backgroundColor: COLORS.shamrock,
  },
  connectorTop: {
    top: 0,
    bottom: '50%',
  },
  connectorBottom: {
    top: '50%',
    bottom: 0,
  },
});
