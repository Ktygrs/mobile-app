// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {font} from '@utils/styles';
import React, {FunctionComponent} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
        <ActivityIndicator
          size={'small'}
          style={styles.iconContainer}
          color={'#fff'}
        />
      ) : (
        Icon && (
          <View style={styles.iconContainer}>
            <Icon width={rem(20)} height={rem(20)} color={'#fff'} />
          </View>
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

  iconContainer: {
    marginBottom: rem(2),
    width: rem(20),
    height: rem(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    ...font(12, 14.4, 'regular', 'white'),
    flexShrink: 1,
    textAlign: 'center',
  },
});
