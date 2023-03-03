// SPDX-License-Identifier: BUSL-1.1

import {ActivityIndicator} from '@components/ActivityIndicator';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useAddCollapsedSnapPointListener} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useAddCollapsedSnapPointListener';
import {useContactsListRenderItems} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useContactsListRenderItems';
import {
  ContactSection,
  ContactSectionDataItem,
  useGetContactSegments,
} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import React from 'react';
import {
  SectionList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ContactsList = ({
  focused,
  addCollapsedSnapPointListener,
  containerStyle,
}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {sections, loadNext, loadNextLoading, refreshing} =
    useGetContactSegments(focused);

  const {renderItem, renderSectionHeader} = useContactsListRenderItems();

  const {bottomSheetRef} = useAddCollapsedSnapPointListener({
    addListener: addCollapsedSnapPointListener,
    hasSections: sections.length > 0,
  });

  return (
    <BottomSheetSectionList<ContactSectionDataItem, ContactSection>
      ref={bottomSheetRef}
      contentContainerStyle={[
        tabbarOffset.current,
        styles.container,
        containerStyle,
      ]}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={
        loadNextLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={false}
      onEndReached={focused ? loadNext : null}
      refreshing={refreshing}
    />
  );
};

export const ContactsListDummy = ({
  containerStyle,
}: {
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const {sections} = useGetContactSegments(false);

  const {renderItem, renderSectionHeader} = useContactsListRenderItems();

  return (
    <SectionList<ContactSectionDataItem, ContactSection>
      contentContainerStyle={[styles.container, containerStyle]}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(16),
  },
  loadingIndicator: {
    alignItems: 'center',
    flex: 1,
  },
});
