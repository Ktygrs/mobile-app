// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
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
import {hapticFeedback} from '@utils/device';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
} from 'react-native';
import {Contact} from 'react-native-contacts';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const ContactsList = ({focused}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {sections, loadNext, loadNextLoading, refresh, refreshing} =
    useGetContactSegments(focused);

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
      <SectionHeader section={section} />
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
          return <UserListItemSkeleton />;
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
      contentContainerStyle={[tabbarOffset.current, styles.container]}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
      showsVerticalScrollIndicator={false}
      onEndReached={loadNext}
      onRefresh={refresh}
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
});
