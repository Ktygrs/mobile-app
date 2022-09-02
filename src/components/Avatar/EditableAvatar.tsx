// SPDX-License-Identifier: BUSL-1.1

import {usePickImage} from '@components/Avatar/hooks/usePickImage';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useActionSheet} from '@hooks/useActionSheet';
import {CameraIcon} from '@svg/CameraIcon';
import {ImageIcon} from '@svg/ImageIcon';
import {PenIcon} from '@svg/PenIcon';
import {t} from '@translations/i18n';
import {getImageUriForSize} from '@utils/file';
import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Image as CropImage} from 'react-native-image-crop-picker';
import {isAndroid, rem} from 'rn-units';

const DEFAULT_AVATAR_SIZE = rem(86);
const PEN_SIZE = rem(22);

type Props = {
  uri?: string;
  onChange?: (image: CropImage) => void;
  avatarSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  imageWrapperStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

export const EditableAvatar = memo(
  ({
    uri,
    onChange,
    avatarSize = DEFAULT_AVATAR_SIZE,
    containerStyle,
    imageWrapperStyle,
    imageStyle,
  }: Props) => {
    const [localImage, setLocalImage] = useState<CropImage | null>(null);

    const {showActionSheet} = useActionSheet();

    const {openPicker} = usePickImage({
      onImageSelected: image => {
        setLocalImage(image);
        onChange?.(image);
      },
    });

    const onEditPress = () => {
      showActionSheet({
        title: t('settings.profile_image'),
        buttons: [
          {
            icon: CameraIcon,
            label: isAndroid ? t('images.camera') : t('images.take_photo'),
            onPress: () => openPicker('camera'),
          },
          {
            icon: ImageIcon,
            label: isAndroid ? t('images.gallery') : t('images.choose_photo'),
            onPress: () => openPicker('gallery'),
          },
        ],
      });
    };

    useEffect(() => {
      setLocalImage(null);
    }, [uri]);

    return (
      <View style={[containerStyle]}>
        <View style={[styles.avatarWrapper, imageWrapperStyle]}>
          {uri && (
            <Image
              source={{
                uri:
                  localImage?.path ??
                  getImageUriForSize(uri, {width: avatarSize}),
              }}
              style={[styles.image, imageStyle]}
            />
          )}
        </View>
        <Touchable style={styles.button} onPress={onEditPress}>
          <View style={styles.penWrapper}>
            <PenIcon width={rem(10)} height={rem(10)} />
          </View>
        </Touchable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  avatarWrapper: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: rem(25),
    overflow: 'hidden',
  },
  image: {
    width: DEFAULT_AVATAR_SIZE,
    height: DEFAULT_AVATAR_SIZE,
  },
  button: {
    position: 'absolute',
    bottom: -rem(10),
    right: -rem(10),
  },
  penWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PEN_SIZE,
    height: PEN_SIZE,
    borderRadius: PEN_SIZE / 2,
    backgroundColor: COLORS.primaryDark,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
