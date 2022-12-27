// SPDX-License-Identifier: BUSL-1.1

import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import SessionsActions from '@store/modules/Sessions/actions';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

import Session from './components/session';

const ActiveSessions: FunctionComponent = () => {
  const dispatch = useDispatch();

  const {scrollHandler, shadowStyle} = useScrollShadow();

  const bottomOffset = useBottomOffsetStyle({
    extraOffset: rem(16),
  });

  const data = useSelector(SessionsSelectors.getSortedSessionIds);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, SessionsActions.ACTIVE_SESSIONS_LOAD),
  );

  const onRefresh = useCallback(() => {
    dispatch(SessionsActions.ACTIVE_SESSIONS_LOAD.START.create());
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const renderItem: ListRenderItem<typeof data[0]> = useCallback(
    ({item: sessionId}) => {
      return <Session sessionId={sessionId} />;
    },
    [],
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const keyExtractor = useCallback((item: typeof data[0]) => item, []);

  return (
    <View style={styles.container}>
      <Header
        title={t('ActiveSessionsScreen.title')}
        containerStyle={shadowStyle}
      />

      <Animated.FlatList
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainerStyle,
          bottomOffset.current,
        ]}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        refreshing={isLoading}
        onRefresh={onRefresh}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />

      {/* TODO: Add gradient */}
    </View>
  );
};

export default ActiveSessions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: rem(16),
  },

  separator: {
    height: rem(16),
  },
});
