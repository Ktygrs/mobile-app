// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WebView as RNWebView} from 'react-native-webview';
import {rem, screenWidth} from 'rn-units';

export default function WebView() {
  const {shadowStyle} = useScrollShadow();
  const webViewRef = useRef<RNWebView>(null);

  const {
    params: {title, url},
  } = useRoute<RouteProp<MainStackParamList, 'WebView'>>();

  return (
    <>
      <Header title={title || ''} containerStyle={shadowStyle} />
      <RNWebView style={styles.wrapper} source={{uri: url}} ref={webViewRef} />
      <LinearGradient
        pointerEvents="none"
        colors={[COLORS.transparent, COLORS.white]}
        style={styles.bottomGradient}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  bottomGradient: {
    width: screenWidth,
    height: rem(85),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
