// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {Avatar} from '@components/Avatar/Avatar';
import {ConfirmPhoneNumber as ConfirmPhoneNumberComponent} from '@components/ConfirmPhoneNumber';
import {KeyboardDismiss} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {userSelector} from '@store/modules/Auth/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import React, {memo, useEffect, useRef} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS, rem} from 'rn-units';

export const ConfirmPhoneNumber = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const user = useSelector(userSelector) as User;
  const phoneNumberRef = useRef(user.phoneNumber);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  useEffect(() => {
    if (phoneNumberRef.current !== user.phoneNumber) {
      navigation.navigate('PersonalInformation');
    }
  }, [navigation, user.phoneNumber]);

  const onSubmitPress = (code: string) => {
    dispatch(ValidationActions.PHONE_VALIDATION.START.create(code));
  };

  return (
    <KeyboardDismiss>
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
          <View style={[styles.avatarWrapper, commonStyles.shadow]}>
            <Avatar uri={user.profilePictureUrl} style={styles.avatarImage} />
          </View>
          <ConfirmPhoneNumberComponent
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
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    marginTop: rem(80),
    paddingTop: rem(55),
  },
  avatarWrapper: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
    borderRadius: rem(25),
  },
  avatarImage: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
