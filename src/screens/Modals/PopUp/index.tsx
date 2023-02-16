// SPDX-License-Identifier: BUSL-1.1

import {stopPropagation} from '@components/KeyboardDismiss';
import {LottieView, LottieViewProps} from '@components/LottieView';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Banner} from '@screens/Modals/PopUp/components/Banner';
import {CloseButton} from '@screens/Modals/PopUp/components/CloseButton';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {
  PopUpButton,
  PopUpButtonProps,
} from '@screens/Modals/PopUp/components/PopUpButton';
import {Title} from '@screens/Modals/PopUp/components/Title';
import {Warning} from '@screens/Modals/PopUp/components/Warning';
import React, {ReactNode, useEffect} from 'react';
import {
  BackHandler,
  Image,
  ImageProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {rem} from 'rn-units';

export type PopUpProps = {
  imageProps?: ImageProps;
  animationProps?: LottieViewProps;
  banner?: string | ReactNode;
  title?: string | ReactNode;
  message?: string | ReactNode;
  warning?: string | ReactNode;
  buttons?: PopUpButtonProps[];
  dismissOnOutsideTouch?: boolean;
  dismissOnButtonPress?: boolean;
  dismissAndroidHardwareBack?: boolean;
  showCloseButton?: boolean;
  onDismiss?: () => void;
};

export const PopUp = () => {
  const {
    params: {
      imageProps,
      animationProps,
      banner,
      title,
      message,
      warning,
      buttons = [],
      dismissOnOutsideTouch = true,
      dismissOnButtonPress = true,
      dismissAndroidHardwareBack = false,
      showCloseButton = false,
      onDismiss,
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
  }, [dismissAndroidHardwareBack, onDismiss]);

  useEffect(() => () => onDismiss?.());

  return (
    <TouchableWithoutFeedback onPress={onPressOutside}>
      <View style={styles.background}>
        <View style={styles.container} {...stopPropagation}>
          {!!imageProps && (
            <Image
              resizeMode={'contain'}
              style={styles.image}
              {...imageProps}
            />
          )}
          {!!animationProps && (
            <View style={styles.animation}>
              <LottieView autoPlay={true} loop={true} {...animationProps} />
            </View>
          )}
          {!!banner &&
            (typeof banner === 'string' ? <Banner text={banner} /> : banner)}
          {!!title &&
            (typeof title === 'string' ? <Title text={title} /> : title)}
          {!!message && typeof message === 'string' ? (
            <Message text={message} />
          ) : (
            message
          )}
          {!!warning &&
            (typeof warning === 'string' ? (
              <Warning text={warning} />
            ) : (
              warning
            ))}
          {buttons.length > 0 && (
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
          )}
          {showCloseButton && <CloseButton style={styles.closeButton} />}
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
  animation: {
    marginTop: -rem(75),
    marginBottom: -rem(15),
    width: rem(250),
    height: rem(250),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(15),
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: rem(15),
    right: rem(15),
  },
});
