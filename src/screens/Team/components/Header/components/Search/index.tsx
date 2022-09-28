// SPDX-License-Identifier: BUSL-1.1

import {SearchInput} from '@components/Inputs/SearchInput';
import {Touchable} from '@components/Touchable';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {useSearchAnimation} from '@screens/Team/components/Header/components/Search/hooks/useSearchAnimation';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
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
  ...textInputProps
}: SearchProps) => {
  const textInputRef: React.RefObject<TextInput> = React.createRef();
  const [cancelWidth, setCancelWidth] = useState(0);

  const topOffset = useTopOffsetStyle({extraOffset: rem(10)});
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
    <View style={topOffset.current}>
      <Animated.View style={animatedContainerStyle}>
        <SearchInput
          loading={loading}
          ref={textInputRef}
          placeholder={t('team.header.search_placeholder')}
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
    </View>
  );
};

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const CANCEL_HIT_SLOP = {top: 10, right: 20, bottom: 10, left: 20};

const styles = StyleSheet.create({
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
