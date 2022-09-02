// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {Images} from '@images';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningTooltip} from '@navigation/components/MainTabBar/components/MiningTooltip';
import {MiningAnimation} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningAnimation';
import {StartMiningTooltip} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/StartMiningTooltip';
import {useFadeLottie} from '@navigation/components/MainTabBar/components/TabBarMiningItem/hooks/useFadeLottie';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {EconomyActions} from '@store/modules/Economy/actions';
import {isMiningTooltipSeenSelector} from '@store/modules/Economy/selectors';
import {MiningInactiveIcon} from '@svg/TabBar/MiningInactiveIcon';
import LottieView from 'lottie-react-native';
import React, {useRef, useState} from 'react';
import {Animated, ImageBackground, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();

  const isMiningTooltipSeen = useSelector(isMiningTooltipSeenSelector);
  const [miningActive, setMiningActive] = useState(false);

  const lottieRef = useRef<LottieView>(null);
  const lottieWrapperRef = useRef<View>(null);
  const {animatedOpacity} = useFadeLottie(miningActive, lottieRef);

  const onButtonPress = () => {
    if (!isMiningTooltipSeen) {
      dispatch(EconomyActions.STORE_MINIG_TOOLTIP_SEEN.STATE.create());
    }
    if (miningActive) {
      navigation.navigate('Tooltip', {
        descriptionPosition: 'above',
        targetRef: lottieWrapperRef,
        descriptionOffset: rem(40),
        targetCircleSize: rem(92),
        TargetComponent: () => <MiningAnimation />,
        DescriptionComponent: () => <MiningTooltip />,
      });
    } else {
      setMiningActive(state => !state);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      {!isMiningTooltipSeen && <StartMiningTooltip />}
      <Touchable accessibilityRole="button" onPress={onButtonPress}>
        <View style={styles.button}>
          <Animated.View
            style={{opacity: animatedOpacity}}
            ref={lottieWrapperRef}>
            <MiningAnimation />
          </Animated.View>
          <Animated.View
            style={[
              styles.inactiveIcon,
              {
                opacity: animatedOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            <MiningInactiveIcon width={rem(62)} height={rem(62)} />
          </Animated.View>
        </View>
      </Touchable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MAIN_TAB_BAR_HEIGHT,
    width: rem(112),
  },
  button: {
    position: 'absolute',
    left: rem(7),
    top: rem(-46),
    height: rem(100),
    width: rem(100),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inactiveIcon: {
    position: 'absolute',
    top: rem(20),
    left: rem(20),
  },
});
