// SPDX-License-Identifier: BUSL-1.1

import {ProgressBar} from '@components/ProgressBar';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string | ReactNode;
  progressPercentage: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export const BigHeader = ({
  title,
  description,
  progressPercentage,
  containerStyle,
}: Props) => {
  const topOffset = useTopOffsetStyle();
  return (
    <View style={styles.shrimpArea}>
      <View style={[styles.container, topOffset.current, containerStyle]}>
        <View style={styles.body}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <ProgressBar
          valuePercentage={progressPercentage}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shrimpArea: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: rem(20),
    marginBottom: rem(12),
  },
  body: {
    flex: 1,
  },
  titleText: {
    ...font(32, 39, 'black'),
  },
  descriptionText: {
    marginTop: rem(16),
    ...font(14, 17, 'medium', 'wildSand'),
  },
  progressBar: {
    marginLeft: rem(24),
    marginTop: rem(16),
    width: rem(62),
  },
});
