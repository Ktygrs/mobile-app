// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {KeyboardDismiss} from '@components/KeyboardDismiss';
import {ModifyPhoneNumber as ModifyPhoneNumberComponent} from '@components/ModifyPhoneNumber';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthActions} from '@store/modules/Auth/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {phoneVerificationStepSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import React, {memo, useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS, rem} from 'rn-units';

export const ModifyPhoneNumber = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const [isCountrySearchVisible, setCountrySearchVisibility] = useState(false);

  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );

  useEffect(() => {
    if (phoneVerificationStep === 'code') {
      navigation.navigate('ConfirmPhoneNumber');
    }
  }, [navigation, phoneVerificationStep]);

  const onSubmitPress = (phone: string) => {
    dispatch(AuthActions.UPDATE_ACCOUNT.START.create({phoneNumber: phone}));
  };

  return (
    <KeyboardDismiss onDismiss={() => setCountrySearchVisibility(false)}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={isIOS ? 'padding' : undefined}>
        <Header
          color={COLORS.white}
          title={t('personal_information.title')}
          titlePreset={'small'}
          renderRightButtons={LangButton}
        />
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <Avatar
            showPen
            uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            style={styles.avatar}
          />
          <ModifyPhoneNumberComponent
            showCountriesList={setCountrySearchVisibility}
            isCountriesVisible={isCountrySearchVisible}
            onSubmitPress={onSubmitPress}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </KeyboardDismiss>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(80),
    paddingTop: rem(55),
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
});
