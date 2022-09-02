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

const ACTION_SHEET_HEIGHT = rem(180);

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
    <Touchable onPress={navigation.goBack}>
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
                      fill: COLORS.primary,
                      width: rem(25),
                      height: rem(25),
                    })}
                  </View>
                  <Text style={styles.buttonLabelText}>{button.label}</Text>
                </View>
              </Touchable>
            ))}
          </View>
        </Animated.View>
      </View>
    </Touchable>
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
    paddingTop: rem(30),
    paddingBottom: rem(38),
    position: 'absolute',
    bottom: -ACTION_SHEET_HEIGHT,
    left: 0,
    right: 0,
  },
  titleText: {
    ...font(18, 24, 'black', 'primaryDark'),
  },
  buttons: {
    flexDirection: 'row',
    marginTop: rem(20),
  },
  button: {
    marginRight: rem(30),
    alignItems: 'center',
  },
  buttonIcon: {
    width: rem(50),
    height: rem(50),
    borderRadius: rem(25),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabelText: {
    marginTop: rem(5),
    ...font(14, 20, 'regular', 'secondary'),
  },
});
