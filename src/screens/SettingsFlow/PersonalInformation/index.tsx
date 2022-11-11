// SPDX-License-Identifier: BUSL-1.1

import {EditableAvatar} from '@components/Avatar/EditableAvatar';
import {KeyboardDismiss, stopPropagination} from '@components/KeyboardDismiss';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {Country} from '@constants/countries';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListControlAction} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlAction';
import {ListControlSeparator} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import {ListControlCountry} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlCountry';
import {ListControlInput} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlInput';
import {useKeyboardAnimatedStyles} from '@screens/SettingsFlow/PersonalInformation/hooks/useKeyboardAnimatedStyles';
import {useUserDraft} from '@screens/SettingsFlow/PersonalInformation/hooks/useUserDraft';
import {AccountActions} from '@store/modules/Account/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import {getFilenameFromPath} from '@utils/file';
import React, {memo, useCallback, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PersonalInformation = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const isLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const {user, userDraft, setUserDraft, hasChanges} = useUserDraft();

  const userCountry = getCountryByCode(user.country);
  const [selectedCountry, setSelectedCountry] = useState(
    userCountry.current ?? userCountry.default,
  );
  const [isCountrySearchVisible, setCountrySearchVisibility] = useState(false);

  const {animatedCardStyle, animatedAvatarStyle, animatedBodyStyle} =
    useKeyboardAnimatedStyles();

  const onChangePhonePress = useCallback(
    () => navigation.navigate('ModifyPhoneNumber'),
    [navigation],
  );

  const onCountrySelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      setUserDraft(draft => ({
        ...draft,
        country: country.isoCode,
        city: user.country === country.isoCode ? user.city : '',
      }));
    },
    [setUserDraft, user],
  );

  const onChangeFirstName = useCallback(
    (firstName: string) => setUserDraft(draft => ({...draft, firstName})),
    [setUserDraft],
  );

  const onChangeLastName = useCallback(
    (lastName: string) => setUserDraft(draft => ({...draft, lastName})),
    [setUserDraft],
  );

  const onChangeCity = useCallback(
    (city: string) => setUserDraft(draft => ({...draft, city})),
    [setUserDraft],
  );

  const onChangeProfileImage = useCallback(
    image =>
      setUserDraft(draft => ({
        ...draft,
        profilePicture: {
          uri: image.path,
          name: getFilenameFromPath(image.path),
          type: image.mime,
        },
      })),
    [setUserDraft],
  );

  const onSubmitChanges = () => {
    Keyboard.dismiss();
    dispatch(AccountActions.UPDATE_ACCOUNT.START.create(userDraft));
  };

  return (
    <KeyboardDismiss onDismiss={() => setCountrySearchVisibility(false)}>
      <View style={styles.container}>
        <Header
          title={t('personal_information.title')}
          renderRightButtons={LangButton}
        />
        <Animated.View
          style={[styles.card, animatedCardStyle, bottomOffset.current]}>
          <Animated.View
            style={[
              styles.avatarWrapper,
              commonStyles.shadow,
              animatedAvatarStyle,
            ]}>
            <EditableAvatar
              uri={user.profilePictureUrl}
              onChange={onChangeProfileImage}
              imageWrapperStyle={commonStyles.shadow}
            />
          </Animated.View>
          <Animated.View
            style={[styles.body, animatedBodyStyle, commonStyles.shadow]}
            {...stopPropagination}>
            {hasChanges && (
              // The button is here with absolute positioning so it'd be underneath phone country select
              <PrimaryButton
                text={t('button.save')}
                style={styles.buttonPosition}
                onPress={onSubmitChanges}
                loading={isLoading}
              />
            )}
            <ListControlInput
              label={t('personal_information.first_name')}
              textContentType="name"
              defaultValue={userDraft.firstName ?? ''}
              onChangeText={onChangeFirstName}
              editable={!isLoading}
            />
            <ListControlSeparator />
            <ListControlInput
              label={t('personal_information.last_name')}
              textContentType="familyName"
              defaultValue={userDraft.lastName ?? ''}
              onChangeText={onChangeLastName}
              editable={!isLoading}
            />
            <ListControlSeparator />
            <ListControlAction
              label={t('personal_information.phone')}
              action={t('button.change').toUpperCase()}
              value={user.phoneNumber ?? ''}
              onPress={onChangePhonePress}
            />
            <ListControlSeparator />
            <ListControlCountry
              label={t('personal_information.country')}
              selectedCountry={selectedCountry}
              isCountrySearchVisible={isCountrySearchVisible}
              setCountrySearchVisibility={setCountrySearchVisibility}
              onCountrySelect={onCountrySelect}
              editable={!isLoading}
            />
            <ListControlSeparator />
            <ListControlInput
              label={t('personal_information.city')}
              textContentType="addressCity"
              defaultValue={userDraft.city ?? ''}
              onChangeText={onChangeCity}
              editable={!isLoading}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </KeyboardDismiss>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    paddingTop: rem(12),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    flex: 1,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  body: {
    borderRadius: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
  },
  buttonPosition: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: rem(30),
    height: rem(40),
    bottom: -rem(60),
  },
});
