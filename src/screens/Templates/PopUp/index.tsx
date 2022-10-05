// SPDX-License-Identifier: BUSL-1.1

import {stopPropagination} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {font} from '@utils/styles';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  image: ImageSourcePropType;
  title: string;
  message: string;
  buttonIcon?: React.ReactNode;
  buttonText: string;
  onButtonPress?: Function | undefined;
  dismissOnOutsideTouch?: boolean;
  dismissOnButtonPress?: boolean;
};

const PopUp = ({
  image,
  title,
  message,
  buttonIcon,
  buttonText,
  onButtonPress,
  dismissOnOutsideTouch = true,
  dismissOnButtonPress = true,
}: Props) => {
  const navigation = useNavigation();

  const onPress = () => {
    onButtonPress && onButtonPress();
    dismissOnButtonPress && navigation.goBack();
  };

  const onPressOutside = () => {
    dismissOnOutsideTouch && navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={onPressOutside}>
      <View style={styles.container}>
        <View style={styles.modalView} {...stopPropagination}>
          <Image resizeMode={'contain'} style={styles.image} source={image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{message}</Text>
          <Touchable onPress={onPress}>
            <View style={styles.button}>
              {buttonIcon}
              <Text
                style={[styles.buttonText, !!buttonIcon && styles.iconMargin]}>
                {buttonText}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBackground,
  },
  modalView: {
    marginHorizontal: rem(16),
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    paddingHorizontal: rem(35),
    paddingBottom: rem(20),
    alignItems: 'center',
  },
  image: {
    marginTop: -rem(45),
    width: rem(250),
    height: rem(230),
  },
  button: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(12),
    paddingVertical: rem(8),
    paddingHorizontal: rem(16),
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: rem(20),
    marginBottom: rem(10),
    alignItems: 'center',
  },
  iconMargin: {
    marginLeft: rem(6),
  },
  buttonText: {
    ...font(14, 17, 'black', 'white'),
  },
  title: {
    ...font(24, 29, 'black', 'primaryDark'),
    marginVertical: rem(12),
    textAlign: 'center',
  },
  text: {
    ...font(14, 20, 'medium', 'secondary'),
    textAlign: 'center',
    paddingHorizontal: rem(8),
  },
});
