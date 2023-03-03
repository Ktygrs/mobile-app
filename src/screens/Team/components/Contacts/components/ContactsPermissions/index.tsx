// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {useAddStepData} from '@store/modules/WalkThrough/hooks/useAddStepData';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

const icon = require('@screens/Team/assets/images/teamAgendaNotShared.png');

const CONTAINER_MARGIN_TOP = rem(24);
const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(20);

function AllowContactButton() {
  const dispatch = useDispatch();
  return (
    <PrimaryButton
      text={t('team.contacts.empty_button_title')}
      onPress={() =>
        dispatch(PermissionsActions.GET_PERMISSIONS.START.create('contacts'))
      }
      style={styles.button}
      textStyle={styles.buttonText}
      icon={<AddressBookIcon />}
    />
  );
}

type Props = {offset: number};

export const ContactsPermissions = ({offset}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const [allowContactButtonY, setAllowContactButton] = useState(0);

  const addStepData = useAddStepData('team');
  useEffect(() => {
    if (allowContactButtonY) {
      const top =
        offset +
        allowContactButtonY +
        CONTAINER_MARGIN_TOP -
        WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      addStepData({
        step: 1,
        stepData: {
          topPositionOfHighlightedElement: top,
          icon: <AddressBookIcon color={COLORS.primaryLight} />,
          renderStepHighlight: () => (
            <View style={styles.walkthroughElementOuterContainer}>
              <View style={[styles.walkthroughElementContainer, {top}]}>
                <View style={styles.walkthroughElementInnerContainer}>
                  <AllowContactButton />
                </View>
              </View>
            </View>
          ),
        },
      });
    }
  }, [addStepData, allowContactButtonY, offset]);

  return (
    <View style={[styles.container, tabbarOffset.current]}>
      <Image source={icon} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>
        {replaceString(
          t('team.contacts.empty_title'),
          tagRegex('ice'),
          (match, index) => (
            <IceLabel
              key={match + index}
              iconSize={28}
              color={COLORS.primaryDark}
              iconOffsetY={isAndroid ? 2 : 3}
            />
          ),
        )}
      </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {replaceString(
            t('team.contacts.empty_description'),
            tagRegex('ice'),
            (match, index) => (
              <IceLabel
                key={match + index}
                iconSize={14}
                color={COLORS.secondary}
                iconOffsetY={isAndroid ? 2 : -1}
              />
            ),
          )}
        </Text>
        <View
          style={styles.buttonContainer}
          onLayout={({nativeEvent}) => {
            setAllowContactButton(nativeEvent.layout.y);
          }}>
          <AllowContactButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: rem(200), height: rem(170)},
  container: {
    marginTop: CONTAINER_MARGIN_TOP,
    alignItems: 'center',
    marginHorizontal: rem(38),
  },
  title: {
    marginTop: rem(16),
    textAlign: 'center',
    ...font(24, 29, 'black', 'primaryDark'),
  },
  descriptionContainer: {
    paddingHorizontal: rem(10),
  },
  description: {
    marginTop: rem(12),
    textAlign: 'center',
    ...font(14, 22, 'regular', 'secondary'),
  },
  buttonContainer: {
    marginTop: rem(36),
  },
  button: {
    width: rem(253),
    height: rem(52),
    borderRadius: rem(12),
  },
  buttonText: {
    ...font(17, 20, 'bold'),
  },
  walkthroughElementOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  walkthroughElementContainer: {
    borderRadius: 20,
    backgroundColor: COLORS.white02opacity,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
  },
  walkthroughElementInnerContainer: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
  },
});
