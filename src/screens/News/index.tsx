// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {WalkThroughContextProvider} from '@contexts/WalkThroughContext';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {NewsContent} from '@screens/News/NewsContent';
import {NewsActions} from '@store/modules/News/actions';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

export const News = () => {
  useFocusStatusBar({style: 'light-content'});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(NewsActions.NEWS_LOAD.START.create({isRefresh: true}));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <WalkThroughContextProvider>
        <NewsContent />
      </WalkThroughContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
