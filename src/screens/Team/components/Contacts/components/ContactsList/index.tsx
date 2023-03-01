// SPDX-License-Identifier: BUSL-1.1

import {ActivityIndicator} from '@components/ActivityIndicator';
import {InviteButton} from '@components/InviteButton';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {SectionHeader} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {useAddCollapsedSnapPointListener} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useAddCollapsedSnapPointListener';
import {
  ContactSection,
  ContactSectionDataItem,
  useGetContactSegments,
} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {hapticFeedback} from '@utils/device';
import React, {useCallback} from 'react';
import {SectionListRenderItem, StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
};

export const ContactsList = ({
  focused,
  addCollapsedSnapPointListener,
}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {sections, loadNext, loadNextLoading, refreshing} =
    useGetContactSegments(focused);

  const {bottomSheetRef} = useAddCollapsedSnapPointListener({
    addListener: addCollapsedSnapPointListener,
    hasSections: sections.length > 0,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onInvitePress = useCallback(
    (contact: Contact) => {
      hapticFeedback();
      navigation.navigate('InviteFriend', {contact});
    },
    [navigation],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: ContactSection}) => (
      <SectionHeader title={section.title} />
    ),
    [],
  );

  const renderItem: SectionListRenderItem<
    ContactSectionDataItem,
    ContactSection
  > = useCallback(
    ({item, index}) => {
      if (typeof item === 'string') {
        return (
          <UserListItem
            userId={item}
            AdditionalInfoComponent={<UserListPingButton userId={item} />}
          />
        );
      }

      if ('element' in item) {
        switch (item.element) {
          case 'InviteFriendsButton':
            return <InviteButton style={styles.inviteButtonContainer} />;

          case 'Loading':
            return <ListItemSkeleton />;

          case 'Error':
            return <Text>{item.message}</Text>;
        }
      }

      if ('recordID' in item) {
        return (
          <ContactItem contact={item} index={index} onInvite={onInvitePress} />
        );
      }

      return null;
    },
    [onInvitePress],
  );

  return (
    <BottomSheetSectionList<ContactSectionDataItem, ContactSection>
      ref={bottomSheetRef}
      contentContainerStyle={[tabbarOffset.current, styles.container]}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(16),
  },
  inviteButtonContainer: {
    marginHorizontal: 0,
  },
  loadingIndicator: {
    alignItems: 'center',
    flex: 1,
  },
});
