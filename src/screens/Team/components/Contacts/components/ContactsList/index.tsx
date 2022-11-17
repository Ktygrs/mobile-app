// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
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
import {t} from '@translations/i18n';
import {hapticFeedback} from '@utils/device';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
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
            userId={item.id}
            name={item.username}
            note={item.active ? t('users.active') : t('users.inactive')}
            profilePictureUrl={item.profilePictureUrl}
            active={item.active}
            AdditionalInfoComponent={
              <UserListPingButton pinged={item.pinged} />
            }
          />
        );
      }
      return null;
    },
    [onInvitePress],
  );

  return (
    <View style={styles.container}>
      <SectionList<ContactSectionDataItem, ContactSection>
        contentContainerStyle={tabbarOffset.current}
        style={styles.sectionListStyle}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNext}
        onRefresh={refresh}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  sectionListStyle: {
    marginTop: rem(10),
  },
  inviteButtonContainer: {
    marginHorizontal: 0,
  },
});
