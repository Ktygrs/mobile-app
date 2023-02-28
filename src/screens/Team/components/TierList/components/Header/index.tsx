// SPDX-License-Identifier: BUSL-1.1

import {stopPropagation} from '@components/KeyboardDismiss';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useEffect} from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  total: number;
  active: number;
  title: string;
  addSteps?: boolean;
  offset: number;
  earnings: string;
  onLayout: (event: LayoutChangeEvent) => void;
};

const BORDER_RADIUS = 20;
const PADDING_VERTICAL = rem(12);

export const ListHeader = ({
  total,
  active,
  title,
  addSteps,
  offset,
  earnings,
  onLayout,
}: Props) => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData('team');

  const renderActiveUsers = useCallback(() => {
    return (
      <Text style={styles.title}>
        <Text style={styles.label}>{`${t('users.active')}: `}</Text>
        {`${active}/${total}`}
      </Text>
    );
  }, [active, total]);

  const renderEarnings = useCallback(() => {
    return (
      <Text style={styles.title}>
        <Text style={styles.label}>{`${title}: `}</Text>
        {earnings}
        <IceLabel iconSize={16} color={COLORS.primaryDark} />
      </Text>
    );
  }, [earnings, title]);

  const top = offset - PADDING_VERTICAL * 2;
  useEffect(() => {
    if (addSteps && offset) {
      setWalkthroughElementData({
        step: 'a7',
        elementData: {
          topPositionOfHighlightedElement: top,
          renderStepHighlight: () => (
            <View style={styles.walkthroughElementOuterContainer}>
              <View style={[styles.walkthroughElementContainer, {top}]}>
                <View style={[styles.walkthroughElementInnerContainer]}>
                  {renderActiveUsers()}
                </View>
              </View>
            </View>
          ),
        },
      });
    }
  }, [offset, addSteps, setWalkthroughElementData, renderActiveUsers, top]);
  useEffect(() => {
    if (addSteps && offset) {
      setWalkthroughElementData({
        step: 'a8',
        elementData: {
          topPositionOfHighlightedElement: top,
          renderStepHighlight: () => (
            <View
              style={[styles.walkthroughElementOuterContainer, styles.flexEnd]}>
              <View style={[styles.walkthroughElementContainer, {top}]}>
                <View style={[styles.walkthroughElementInnerContainer]}>
                  {renderEarnings()}
                </View>
              </View>
            </View>
          ),
        },
      });
    }
  }, [offset, addSteps, setWalkthroughElementData, renderEarnings, top]);

  return (
    <View {...stopPropagation} onLayout={onLayout}>
      <View style={styles.header}>
        {renderActiveUsers()}
        {renderEarnings()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
  title: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(22),
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  walkthroughElementOuterContainer: {
    flexDirection: 'row',
  },
  walkthroughElementContainer: {
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    paddingVertical: PADDING_VERTICAL,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
  },
  walkthroughElementInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    borderRadius: BORDER_RADIUS,
    paddingVertical: PADDING_VERTICAL,
    backgroundColor: COLORS.white,
  },
});
