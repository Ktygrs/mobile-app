// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getImageUriForSize} from '@utils/file';
import React, {memo, useMemo, useRef} from 'react';
import {ImageStyle, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export const DEFAULT_AVATAR_SIZE = rem(86);
const DEFAULT_BORDER_RADIUS = rem(25);

type Props = {
  uri?: string;
  size?: number;
  borderRadius?: number;
  allowFullScreen?: boolean;
  style?: StyleProp<ImageStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
};

export const Avatar = memo(
  ({
    uri,
    size = DEFAULT_AVATAR_SIZE,
    borderRadius = DEFAULT_BORDER_RADIUS,
    allowFullScreen = true,
    style,
    touchableStyle,
  }: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const imageRef = useRef<Animated.Image>(null);

    const dynamicStyle = useMemo(
      () => ({
        width: size,
        height: size,
        borderRadius,
      }),
      [borderRadius, size],
    );

    if (!uri) {
      return null;
    }

    const ImageComponent = (
      <Animated.Image
        source={{uri: getImageUriForSize(uri, {width: size})}}
        style={[dynamicStyle, style]}
        ref={imageRef}
      />
    );

    if (allowFullScreen) {
      const onAvatarPress = () => {
        navigation.navigate('ImageView', {uri, size, borderRadius, imageRef});
      };
      return (
        <Touchable onPress={onAvatarPress} style={touchableStyle}>
          {ImageComponent}
        </Touchable>
      );
    }

    return ImageComponent;
  },
);

export const AvatarSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
