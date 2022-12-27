// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CancelButton} from '@screens/PopUps/ProfilePrivacyEdit/components/CancelButton';
import {Description} from '@screens/PopUps/ProfilePrivacyEdit/components/Description';
import {NextButton} from '@screens/PopUps/ProfilePrivacyEdit/components/NextButton';
import {LadderBar} from '@screens/ProfileFlow/Profile/components/LadderBar';
import {t} from '@translations/i18n';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const ProfilePrivacyEditStep1 = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const goNext = () => {
    navigation.replace('ProfilePrivacyEditStep2');
  };

  return (
    <View style={styles.background}>
      <ImageBackground
        resizeMode={'contain'}
        style={styles.container}
        source={Images.backgrounds.privacyBgTop}>
        <Description
          style={styles.descriptionContainer}
          title={t('profile_privacy_edit.step1.title')}
          description={t('profile_privacy_edit.step1.description')}
        />
        <View style={styles.ladderContainer}>
          <LadderBar isProfilePrivacyEditMode={true} />
        </View>
        <NextButton onPress={goNext} />
      </ImageBackground>
      <CancelButton style={styles.cancelButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    width: screenWidth,
    height: rem(418),
    paddingBottom: rem(40),
  },
  ladderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: rem(84),
  },
  cancelButton: {
    marginTop: rem(40),
  },
});
