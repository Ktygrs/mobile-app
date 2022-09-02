// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useSearchAnimation} from '@screens/Team/components/Header/components/Search/hooks/useSearchAnimation';
import {SearchIconSvg} from '@svg/SearchIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

type SearchProps = {
  searchShared: SharedValue<number>;
  loading: boolean;
  onClosePress: () => void;
} & TextInputProps;

export const Search = ({
  searchShared,
  loading,
  onClosePress,
  placeholder = t('team.header.search_placeholder'),
  ...textInputProps
}: SearchProps) => {
  const {top: topInset} = useSafeAreaInsets();
  const dynamicContainerStyle = useMemo(
    () => ({
      current: {
        marginTop: topInset + rem(10),
      },
    }),
    [topInset],
  );

  const textInputRef: React.RefObject<TextInput> = React.createRef();

  const [cancelWidth, setCancelWidth] = useState(0);
  const {animatedContainerStyle, animatedCancelStyle} = useSearchAnimation({
    searchShared,
    cancelWidth,
  });

  const closeSearch = () => {
    textInputRef.current?.clear();
    Keyboard.dismiss();
    onClosePress();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        dynamicContainerStyle.current,
        animatedContainerStyle,
      ]}>
      <View style={styles.searchButton}>
        {loading ? <ActivityIndicator /> : <SearchIconSvg />}
      </View>
      <TextInput
        ref={textInputRef}
        style={[styles.input]}
        placeholderTextColor={COLORS.heather}
        placeholder={placeholder}
        {...textInputProps}
      />
      <AnimatedTouchable
        onPress={closeSearch}
        hitSlop={CANCEL_HIT_SLOP}
        style={[styles.cancelButtonWrapper, animatedCancelStyle]}
        activeOpacity={1}
        onLayout={e => setCancelWidth(e.nativeEvent.layout.width)}>
        <Text style={styles.cancelText}>{t('button.cancel')}</Text>
      </AnimatedTouchable>
    </Animated.View>
  );
};

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const CANCEL_HIT_SLOP = {top: 10, right: 20, bottom: 10, left: 20};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: rem(15),
    backgroundColor: COLORS.white,
    height: rem(45),
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    paddingLeft: rem(46),
    ...font(13, null, 'regular', 'primaryDark'),
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rem(46),
  },
  cancelButtonWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '100%',
    justifyContent: 'center',
    paddingLeft: rem(20),
  },
  cancelText: {
    ...font(16, null, 'bold'),
  },
});
