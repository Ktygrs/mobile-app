// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

export type ConfirmButton = {
  label: string;
  onPress?: () => void;
  preset?: 'default' | 'destructive';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const DEFAULT_CONFIRM_YES_BUTTON: ConfirmButton = {
  label: t('button.yes'),
};

export const DEFAULT_CONFIRM_NO_BUTTON: ConfirmButton = {
  label: t('button.no_cancel'),
  preset: 'destructive',
};

const ACTION_SHEET_HEIGHT = rem(270);

export const ActionSheet = () => {
  const {
    params: {title, buttons},
  } = useRoute<RouteProp<MainStackParamList, 'ActionSheet'>>();
  const navigation = useNavigation();
  const {bottom: bottomInset} = useSafeAreaInsets();
  const actionSheetHeight = ACTION_SHEET_HEIGHT + bottomInset;
  const positionY = useSharedValue(-ACTION_SHEET_HEIGHT);
  const animatedStyle = useAnimatedStyle(() => ({
    bottom: positionY.value,
  }));

  useEffect(() => {
    positionY.value = withTiming(0);
  }, [positionY]);

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.background}>
        <Animated.View
          style={[
            styles.container,
            {height: actionSheetHeight},
            animatedStyle,
          ]}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.buttons}>
            {buttons.map((button, index) => (
              <Touchable
                key={index}
                onPress={() => {
                  navigation.goBack();
                  button.onPress();
                }}>
                <View style={styles.button}>
                  <View style={styles.buttonIcon}>
                    {button.icon({
                      color: COLORS.primaryLight,
                      width: rem(24),
                      height: rem(24),
                    })}
                  </View>
                  <Text style={styles.buttonLabelText}>{button.label}</Text>
                </View>
              </Touchable>
            ))}
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    paddingTop: rem(30),
    paddingBottom: rem(38),
    position: 'absolute',
    bottom: -ACTION_SHEET_HEIGHT,
    left: 0,
    right: 0,
  },
  titleText: {
    ...font(14, 16.8, 'semibold', 'primaryDark'),
  },
  buttons: {
    marginTop: rem(20),
  },
  button: {
    flexDirection: 'row',
    marginRight: rem(30),
    alignItems: 'center',
    marginVertical: rem(10),
  },
  buttonIcon: {
    width: rem(44),
    height: rem(44),
    borderRadius: rem(12),
    backgroundColor: COLORS.linkWater,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabelText: {
    marginLeft: rem(12),
    ...font(16, 19.2, 'bold', 'primaryDark'),
  },
});
