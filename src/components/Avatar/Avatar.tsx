// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getImageUriForSize} from '@utils/file';
import React, {memo, useMemo, useRef} from 'react';
import {Image, ImageStyle, StyleProp, TouchableOpacity} from 'react-native';
import {rem} from 'rn-units';

const DEFAULT_AVATAR_SIZE = rem(86);
const DEFAULT_BORDER_RADIUS = rem(25);

type Props = {
  uri?: string;
  size?: number;
  borderRadius?: number;
  allowFullScreen?: boolean;
  style?: StyleProp<ImageStyle>;
};

export const Avatar = memo(
  ({
    uri,
    size = DEFAULT_AVATAR_SIZE,
    borderRadius = DEFAULT_BORDER_RADIUS,
    allowFullScreen = true,
    style,
  }: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const imageRef = useRef<Image>(null);

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
      <Image
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
        <TouchableOpacity onPress={onAvatarPress}>
          {ImageComponent}
        </TouchableOpacity>
      );
    }

    return ImageComponent;
  },
);
