// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP, smallHeightDevice} from '@constants/styles';
import {InfoIcon} from '@svg/InfoIcon';
import {TipTriangleIcon} from '@svg/TipTriangle';
import {font} from '@utils/styles';
import React, {ReactNode, useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string | ReactNode;
  tooltip?: string | ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Info = ({text, tooltip, containerStyle}: Props) => {
  const [isTipVisible, setTipVisibility] = useState(false);
  return (
    <View style={[styles.container, containerStyle]}>
      {!!text && (
        <View style={styles.content}>
          <Touchable
            onPress={() => setTipVisibility(!isTipVisible)}
            hitSlop={SMALL_BUTTON_HIT_SLOP}>
            <InfoIcon
              width={rem(20)}
              height={rem(20)}
              color={COLORS.catalinaBlue}
              style={styles.infoIcon}
            />
          </Touchable>
          <View style={styles.infoBody}>
            {typeof text === 'string' ? (
              <Text
                style={styles.infoText}
                numberOfLines={3}
                adjustsFontSizeToFit={true}>
                {text}
              </Text>
            ) : (
              text
            )}
          </View>
          {isTipVisible && !!tooltip && (
            <Touchable
              style={styles.tooltipWrapper}
              onPress={() => setTipVisibility(false)}>
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipText}>{tooltip}</Text>
              </View>
              <TipTriangleIcon style={styles.tooltipTriangle} />
            </Touchable>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: smallHeightDevice ? rem(8) : rem(16),
    height: rem(54),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: rem(23),
  },
  infoBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: rem(14),
    marginRight: rem(60),
  },
  infoText: {
    ...font(13, 18, 'regular', 'secondary'),
  },
  tooltipWrapper: {
    position: 'absolute',
    bottom: rem(24),
  },
  tooltipText: {
    ...font(11.5, 18, 'regular'),
  },
  tooltipContainer: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: rem(17.5),
    paddingVertical: rem(13),
    borderRadius: rem(13),
    marginLeft: rem(10),
  },
  tooltipTriangle: {
    marginTop: -1,
    marginLeft: rem(30),
  },
});
