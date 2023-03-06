// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ClosedEyeIcon} from '@svg/ClosedEyeIcon';
import {OpenedEyeIcon} from '@svg/OpenedEyeIcon';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  isPrivacyInfoShown: boolean;
  onPress: () => void;
};

export const ShowPrivacyButton = ({
  containerStyle,
  color = COLORS.primaryDark,
  onPress,
  isPrivacyInfoShown,
}: Props) => {
  return (
    <View style={containerStyle}>
      <Touchable onPress={onPress} hitSlop={SMALL_BUTTON_HIT_SLOP}>
        {isPrivacyInfoShown ? (
          <ClosedEyeIcon color={color} />
        ) : (
          <OpenedEyeIcon color={color} />
        )}
      </Touchable>
    </View>
  );
};
