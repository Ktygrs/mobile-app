// SPDX-License-Identifier: BUSL-1.1

import {stopPropagation} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  PopUpButton,
  PopUpButtonProps,
} from '@screens/Modals/PopUp/components/PopUpButton';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {font} from '@utils/styles';
import React, {ReactNode, useEffect} from 'react';
import {
  BackHandler,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {rem} from 'rn-units';

export type PopUpProps = {
  image?: ImageSourcePropType;
  title?: string | ReactNode;
  message?: string | ReactNode;
  warning?: string | ReactNode;
  buttons: PopUpButtonProps[];
  dismissOnOutsideTouch?: boolean;
  dismissOnButtonPress?: boolean;
  dismissAndroidHardwareBack?: boolean;
};

export const PopUp = () => {
  const {
    params: {
      image,
      title,
      message,
      warning,
      buttons,
      dismissOnOutsideTouch = true,
      dismissOnButtonPress = true,
      dismissAndroidHardwareBack = false,
    },
  } = useRoute<RouteProp<MainStackParamList, 'PopUp'>>();
  const navigation = useNavigation();

  const onPressOutside = () => {
    if (dismissOnOutsideTouch) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => !dismissAndroidHardwareBack,
    );
    return () => backHandler.remove();
  }, [dismissAndroidHardwareBack]);

  return (
    <TouchableWithoutFeedback onPress={onPressOutside}>
      <View style={styles.background}>
        <View style={styles.container} {...stopPropagation}>
          {!!image && (
            <Image resizeMode={'contain'} style={styles.image} source={image} />
          )}
          {!!title && <Text style={styles.titleText}>{title}</Text>}
          {!!message && <Text style={styles.messageText}>{message}</Text>}
          {!!warning && (
            <View style={styles.warning}>
              <InfoOutlineIcon
                color={COLORS.primaryLight}
                width={rem(13)}
                height={rem(13)}
              />
              <Text style={styles.warningText}>{warning}</Text>
            </View>
          )}
          <View style={styles.buttons}>
            {buttons.map((button, index) => (
              <PopUpButton
                {...button}
                key={index}
                onPress={() => {
                  if (dismissOnButtonPress) {
                    navigation.goBack();
                  }
                  button.onPress?.();
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    paddingBottom: rem(25),
    paddingTop: rem(30),
    alignItems: 'center',
  },
  image: {
    marginTop: -rem(75),
    width: rem(250),
    height: rem(230),
  },
  titleText: {
    ...font(24, 29, 'black', 'primaryDark'),
    textAlign: 'center',
  },
  messageText: {
    ...font(14, 20, 'medium', 'secondary'),
    textAlign: 'center',
    marginTop: rem(16),
    marginHorizontal: rem(30),
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
    marginHorizontal: rem(30),
  },
  warningText: {
    ...font(14, 20, 'medium', 'primaryLight'),
    marginLeft: rem(8),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(15),
    justifyContent: 'center',
  },
});
