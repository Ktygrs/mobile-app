// SPDX-License-Identifier: BUSL-1.1

import {SEARCH_INPUT_HEIGHT, SearchInput} from '@components/Inputs/SearchInput';
import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
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
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SEARCH_INPUT_TOP_OFFSET = rem(10);
export const SEARCH_HEIGHT = SEARCH_INPUT_HEIGHT + SEARCH_INPUT_TOP_OFFSET;

type SearchProps = {
  isActive: boolean;
  loading: boolean;
  onClosePress: () => void;
} & TextInputProps;

export const Search = ({
  isActive,
  loading,
  onClosePress,
  ...textInputProps
}: SearchProps) => {
  const textInputRef: React.RefObject<TextInput> = React.createRef();
  const [cancelWidth, setCancelWidth] = useState(0);

  const topOffset = useTopOffsetStyle();
  const {animatedContainerStyle, animatedCancelStyle} = useSearchAnimation({
    isActive,
    cancelWidth,
  });

  const closeSearch = () => {
    textInputRef.current?.clear();
    Keyboard.dismiss();
    onClosePress();
  };

  return (
    <View style={topOffset.current}>
      <Animated.View style={[animatedContainerStyle, styles.container]}>
        <SearchInput
          loading={loading}
          ref={textInputRef}
          placeholder={t('team.header.search_placeholder')}
          {...textInputProps}
        />
        <AnimatedTouchable
          onPress={closeSearch}
          hitSlop={MIDDLE_BUTTON_HIT_SLOP}
          style={[styles.cancelButtonWrapper, animatedCancelStyle]}
          activeOpacity={1}
          onLayout={e => {
            if (!cancelWidth) {
              setCancelWidth(e.nativeEvent.layout.width);
            }
          }}>
          <Text style={styles.cancelText}>{t('button.cancel')}</Text>
        </AnimatedTouchable>
      </Animated.View>
    </View>
  );
};

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const styles = StyleSheet.create({
  container: {
    marginTop: SEARCH_INPUT_TOP_OFFSET,
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
