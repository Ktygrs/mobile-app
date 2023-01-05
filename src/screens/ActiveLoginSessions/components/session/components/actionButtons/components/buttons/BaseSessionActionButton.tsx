// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {font} from '@utils/styles';
import React, {FunctionComponent} from 'react';
import {ActivityIndicator, ColorValue, StyleSheet, Text} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

interface Props {
  isLoading?: boolean;
  Icon?: FunctionComponent<SvgProps>;
  text: string;
  backgroundColor: ColorValue;
  onPress?(): void;
}

export const BaseSessionActionButton = ({
  isLoading,
  Icon,
  text,
  backgroundColor,
  onPress,
}: Props) => {
  return (
    <Touchable
      key={text}
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
      disabled={!onPress || isLoading}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} style={styles.icon} color={'#fff'} />
      ) : (
        Icon && (
          <Icon
            style={styles.icon}
            width={rem(20)}
            height={rem(20)}
            color={'#fff'}
          />
        )
      )}

      <Text style={styles.text}>{text}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: rem(10),
    paddingHorizontal: rem(6.5),
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    marginBottom: rem(2),
  },

  text: {
    ...font(12, 14.4, 'regular', 'white'),
    flexShrink: 1,
    textAlign: 'center',
  },
});
