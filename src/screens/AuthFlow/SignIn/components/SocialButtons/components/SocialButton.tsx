// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SocialButton = ({
  onPress,
  Icon,
}: {
  onPress: () => void;
  Icon: React.FC<SvgProps>;
}) => {
  return (
    <Touchable style={styles.button} onPress={onPress}>
      <Icon width={rem(36)} height={rem(36)} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: rem(10),
  },
});
