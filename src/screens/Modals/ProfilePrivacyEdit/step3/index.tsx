// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {useNavigation} from '@react-navigation/native';
import {CancelButton} from '@screens/Modals/ProfilePrivacyEdit/components/CancelButton';
import {Description} from '@screens/Modals/ProfilePrivacyEdit/components/Description';
import {NextButton} from '@screens/Modals/ProfilePrivacyEdit/components/NextButton';
import {BadgeList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeList';
import {LAST_BADGES} from '@screens/ProfileFlow/Profile/components/Badges/mockData';
import {t} from '@translations/i18n';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const ProfilePrivacyEditStep3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <CancelButton style={styles.cancelButton} />
      <ImageBackground
        resizeMode={'contain'}
        style={styles.container}
        source={Images.backgrounds.privacyBgBottom}>
        <Description
          style={styles.descriptionContainer}
          title={t('profile_privacy_edit.step3.title')}
          description={t('profile_privacy_edit.step3.description')}
        />
        <View style={styles.badgesContainer}>
          <BadgeList
            isProfilePrivacyEditMode
            loading={false}
            data={LAST_BADGES}
          />
        </View>
        <NextButton
          text={t('button.finish')}
          style={styles.finishButton}
          onPress={navigation.goBack}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'space-between',
  },
  container: {
    width: screenWidth,
    height: rem(565),
  },
  badgesContainer: {
    marginTop: rem(44),
    height: rem(210),
    marginBottom: rem(40),
  },
  descriptionContainer: {
    marginTop: rem(50),
  },
  cancelButton: {
    marginTop: rem(140),
  },
  finishButton: {
    marginBottom: rem(72),
  },
});
