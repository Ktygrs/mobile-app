// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CancelButton} from '@screens/PopUps/ProfilePrivacyEdit/components/CancelButton';
import {Description} from '@screens/PopUps/ProfilePrivacyEdit/components/Description';
import {NextButton} from '@screens/PopUps/ProfilePrivacyEdit/components/NextButton';
import {CurrentRoleCard} from '@screens/ProfileFlow/Profile/components/Role/components/CurrentRoleCard';
import {t} from '@translations/i18n';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const ProfilePrivacyEditStep2 = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const goNext = () => {
    navigation.replace('ProfilePrivacyEditStep3');
  };

  return (
    <View style={styles.background}>
      <ImageBackground
        resizeMode={'contain'}
        style={styles.container}
        source={Images.backgrounds.privacyBgMiddle}>
        <Description
          style={styles.descriptionContainer}
          title={t('profile_privacy_edit.step2.title')}
          description={t('profile_privacy_edit.step2.description')}
        />
        <View style={styles.roleContainer}>
          <CurrentRoleCard
            imageSource={Images.roles.pioneer}
            imageSourceHidden={Images.roles.pioneerInactive}
            title={t('role.pioneer.title')}
            description={t('role.pioneer.description')}
            isProfilePrivacyEditMode
          />
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
    height: rem(461),
    paddingBottom: rem(40),
    marginTop: rem(100),
  },
  descriptionContainer: {
    marginTop: rem(120),
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    marginTop: rem(40),
  },
});
