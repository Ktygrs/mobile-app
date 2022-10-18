// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {AuthStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BorderedButton} from '@screens/AuthFlow/SignIn/components/BorderedButton';
import {AuthActions} from '@store/modules/Auth/actions';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {EmailIcon} from '@svg/EmailIcon';
import {LogoSvg} from '@svg/Logo';
import {MagicIconSvg} from '@svg/MagicIcon';
import {PhoneIconSvg} from '@svg/PhoneIcon';
import {translate} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import {font} from '@utils/styles';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS, rem} from 'rn-units';

import {ESocialType, SocialSignIn} from './components/SocialSignIn';

export const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const deviceLocation = useSelector(deviceLocationSelector);
  const deviceCountry = getCountryByCode(deviceLocation?.country);
  const [email, onChangeEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    deviceCountry.current ?? deviceCountry.default,
  );
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState(false);

  const isEmailSignInLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.SIGN_IN_EMAIL),
  );
  const isPhoneSignInLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.SIGN_IN_PHONE),
  );
  const isSocialSignInLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.SIGN_IN_SOCIAL),
  );

  const failedReason = useSelector(
    failedReasonSelector.bind(null, AuthActions.FINISH_AUTH),
  );

  const isLoading =
    isEmailSignInLoading || isPhoneSignInLoading || isSocialSignInLoading;

  useEffect(() => {
    if (failedReason) {
      navigation.navigate('ErrorPopUp', {message: failedReason});
      dispatch(AuthActions.FINISH_AUTH.CLEAR.create());
    }
  }, [dispatch, failedReason, navigation]);

  const phoneNumber = `${selectedCountry.iddCode}${phone}`;

  useEffect(() => {
    if (deviceLocation) {
      const country = getCountryByCode(deviceLocation.country);
      if (country.current) {
        setSelectedCountry(country.current);
      }
    }
  }, [deviceLocation]);

  const onSignIn = () => {
    Keyboard.dismiss();
    if (inputType === 'email') {
      dispatch(AuthActions.SIGN_IN_EMAIL.START.create(email));
    } else {
      dispatch(AuthActions.SIGN_IN_PHONE.START.create(phoneNumber));
    }
  };
  const onPhonePress = () => {
    if (inputType === 'email') {
      setInputType('phone');
    } else {
      setInputType('email');
    }
  };
  const onSocialSignInPress = (type: ESocialType) => {
    switch (type) {
      case ESocialType.apple:
        dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('apple'));
        break;
      case ESocialType.google:
        dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('google'));
        break;
      case ESocialType.discord:
        dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('discord'));
        break;
      case ESocialType.facebook:
        dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('facebook'));
        break;
      case ESocialType.microsoft:
        dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('microsoft'));
        break;
      case ESocialType.twitter:
        dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('twitter'));
        break;
    }
  };

  const showCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(true);
  };
  const hideCountryCodeSearch = useCallback(() => {
    setCountryCodeSearchVisibility(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={styles.container}
        testID="signin">
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'none'}>
          <View style={styles.logo}>
            <LogoSvg />
          </View>

          <View testID="welcome_title">
            <Text style={styles.title}>{translate('signIn.welcome')}</Text>
          </View>

          <View style={styles.inputContainer}>
            {inputType === 'email' ? (
              <CommonInput
                icon={<EmailIcon />}
                onChangeText={onChangeEmail}
                value={email}
                label={translate('signIn.emailAddress')}
                containerStyle={styles.input}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />
            ) : (
              <PhoneNumberInput
                selectedCountry={selectedCountry}
                containerStyle={styles.input}
                showCountryCodeSearch={showCountryCodeSearch}
                value={phone}
                onValueChange={setPhone}
              />
            )}

            <PrimaryButton
              style={styles.button}
              onPress={onSignIn}
              text={translate('signIn.logInSignUp')}
            />

            <Text style={styles.text}>or</Text>

            <BorderedButton
              icon={inputType === 'email' ? <PhoneIconSvg /> : <EmailIcon />}
              onPress={onPhonePress}
              text={inputType === 'email' ? translate('signIn.phone') : 'Email'}
            />

            <SocialSignIn onPress={onSocialSignInPress} />

            {isCountryCodeSearchVisible ? (
              <PhoneNumberSearch
                containerStyle={styles.phoneNumberSeatch}
                selectedCountry={selectedCountry}
                close={hideCountryCodeSearch}
                setCountryCode={setSelectedCountry}
              />
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.securedBy}>
        <Text style={styles.securedByText}>
          {translate('signIn.securedBy')}
        </Text>
        <MagicIconSvg />
      </View>
      {isLoading && (
        <ActivityIndicator
          style={[StyleSheet.absoluteFill, styles.loading]}
          size={'large'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginBottom: rem(21),
    width: rem(247),
  },
  logo: {
    marginBottom: rem(59),
    marginTop: rem(50),
  },
  title: {
    marginBottom: rem(42),
    ...font(28, 33.6, 'black', 'primaryDark'),
  },
  text: {
    marginVertical: rem(14),
    textAlign: 'center',
    textTransform: 'uppercase',
    ...font(10, 12, 'regular', 'secondary'),
  },
  securedBy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securedByText: {
    ...font(13, 16, 'regular', 'secondaryLight'),
  },
  phoneNumberSeatch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  button: {
    width: rem(247),
  },
  loading: {
    backgroundColor: COLORS.transparentBackground,
  },
});
