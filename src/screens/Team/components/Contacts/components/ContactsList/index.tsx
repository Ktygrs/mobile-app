// SPDX-License-Identifier: BUSL-1.1

import {ActivityIndicator} from '@components/ActivityIndicator';
import {InviteButton} from '@components/InviteButton';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {BottomSheetSectionListMethods} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {SectionHeader} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {
  ContactSection,
  ContactSectionDataItem,
  useGetContactSegments,
} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {AGENDA} from '@screens/Team/constants';
import {hapticFeedback} from '@utils/device';
import React, {useCallback, useEffect, useRef} from 'react';
import {SectionListRenderItemInfo, StyleSheet, Text, View} from 'react-native';
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

  const ref = useRef<BottomSheetSectionListMethods>(null);

  const {sections, loadNext, loadNextLoading, refreshing} =
    useGetContactSegments(focused);

  useEffect(() => {
    addCollapsedSnapPointListener(AGENDA, () => {
      if (ref.current && sections.length) {
        ref.current.scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
        });
      }
    });
  }, [addCollapsedSnapPointListener, ref, sections]);

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

  const renderItem = useCallback(
    ({
      item,
      index,
    }: SectionListRenderItemInfo<ContactSectionDataItem, ContactSection>) => {
      if ('element' in item) {
        if (item.element === 'InviteFriendsButton') {
          return <InviteButton style={styles.inviteButtonContainer} />;
        } else if (item.element === 'Loading') {
          return <ListItemSkeleton />;
        } else if (item.element === 'Error') {
          return <Text>{item.message}</Text>;
        }
      } else if ('recordID' in item) {
        return (
          <ContactItem contact={item} index={index} onInvite={onInvitePress} />
        );
      } else if ('id' in item) {
        return (
          <UserListItem
            user={item}
            AdditionalInfoComponent={
              item.pinged != null && <UserListPingButton pinged={item.pinged} />
            }
          />
        );
      }
      return null;
    },
    [onInvitePress],
  );

  return (
    <BottomSheetSectionList<ContactSectionDataItem, ContactSection>
      ref={ref}
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
