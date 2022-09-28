// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {LinesBackground} from '@components/LinesBackground';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import InviteAvatar, {
  AVATAR_CONTAINER_SIDE_DIMENSION,
} from '@screens/InviteFlow/InviteFriend/components/InviteAvatar';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {InviteIcon} from '@svg/InviteIcon';
import {t} from '@translations/i18n';
import {getContactName} from '@utils/contacts';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

const icon = require('./assets/images/inviteFromAgendaGrafik.png');
export const INVITE_CARD_TOP_OFFSET = rem(63);

export const InviteFriend = () => {
  useFocusStatusBar({style: 'dark-content'});
  const dispatch = useDispatch();
  const {bottom: bottomInset} = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList, 'InviteFriend'>>();
  const contact = route.params?.contact;
  const {shadowStyle} = useScrollShadow();

  const onInvite = () => {
    dispatch(ContactsActions.INVITE_CONTACT.START.create(contact?.recordID));
  };

  const nameToDisplay = getContactName({
    givenName: contact.givenName,
    familyName: contact.familyName,
  });

  const phoneNumbers = contact.phoneNumbers.map(n => n.number);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('invite_share.title')}
      />
      <View style={[styles.bgCard, commonStyles.baseSubScreen]}>
        <LinesBackground />
        <Text style={styles.name}>{nameToDisplay}</Text>
        {phoneNumbers && <Text style={styles.number}>{phoneNumbers[0]}</Text>}
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <View style={styles.iconContainer}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.description}>
              {t('invite_friend.description_part1')}
              <IceLabel color={COLORS.primaryDark} />
              {t('invite_friend.description_part2')}
            </Text>
            <View style={styles.button}>
              <PrimaryButton
                onPress={onInvite}
                text={t('invite_friend.button_title')}
                icon={<InviteIcon width={24} height={23} fill={COLORS.white} />}
                style={[
                  styles.inviteButton,
                  {marginBottom: bottomInset + rem(80)},
                ]}
              />
            </View>
          </View>
        </View>
      </View>
      <InviteAvatar contact={contact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bgCard: {
    marginTop: INVITE_CARD_TOP_OFFSET,
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  icon: {
    alignSelf: 'center',
    maxHeight: rem(241),
  },
  card: {
    alignItems: 'center',
    flex: 1,
    marginTop: rem(16),
  },
  name: {
    marginTop: AVATAR_CONTAINER_SIDE_DIMENSION / 2 + rem(8),
    textAlign: 'center',
    ...font(17, 20, 'semibold', 'white'),
  },
  number: {
    textAlign: 'center',
    ...font(17, 20, 'semibold', 'white'),
    marginTop: rem(10),
  },
  description: {
    textAlign: 'center',
    ...font(17, 22, 'medium', 'primaryDark'),
    marginBottom: rem(30),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconContainer: {flex: 1},
  button: {width: screenWidth, alignItems: 'center', justifyContent: 'center'},
  inviteButton: {
    width: screenWidth - rem(100),
    backgroundColor: COLORS.primaryLight,
    height: rem(56),
    borderRadius: rem(16),
  },
});
