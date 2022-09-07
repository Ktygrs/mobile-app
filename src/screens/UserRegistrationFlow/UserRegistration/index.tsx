// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SignUpStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationPanel} from '@screens/UserRegistrationFlow/Welcome/components/NavigationPanel';
import {magicUserSelector, userSelector} from '@store/modules/Auth/selectors';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {usernameSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from 'rn-units';

import {ClaimNickName} from './components/ClaimNickname';
import {WhoInvitedYou} from './components/WhoInvitedYou';

type Props = {
  navigation: NativeStackNavigationProp<SignUpStackParamList, 'SignIn'>;
};

export const UserRegistration = ({}: Props) => {
  const pagerViewRef = useRef<PagerView>(null);
  const magicUser = useSelector(magicUserSelector);
  const nickNameToPrefill =
    magicUser && magicUser.email
      ? magicUser.email.split('@')[0].replace(/[^a-zA-Z0-9-_.]/g, '')
      : '';
  const [myNickname, setMyNickname] = useState(
    magicUser?.preferredUsername
      ? magicUser.preferredUsername
      : nickNameToPrefill,
  );
  const [invitedNickname, setInvitedNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<SignUpStackParamList>>();
  const username = useSelector(usernameSelector);

  const claimValidationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );

  const refValidationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );

  useEffect(() => {
    if (claimValidationError && currentPage === 1) {
      navigation.goBack();
    }
  }, [claimValidationError, currentPage, navigation]);

  const wipeErrors = () => {
    if (claimValidationError) {
      dispatch(ValidationActions.USERNAME_VALIDATION.CLEAR.create());
    }

    if (refValidationError) {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
    }
  };

  useEffect(() => {
    if (username) {
      pagerViewRef.current?.setPage(1);
      setCurrentPage(1);
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      navigation.navigate('Welcome');
    }
  }, [user, navigation]);

  const onNextPress = () => {
    if (currentPage === 0) {
      dispatch(ValidationActions.USERNAME_VALIDATION.START.create(myNickname));
    }
  };

  const skipRefInvitation = () => {
    dispatch(
      ValidationActions.REF_USERNAME_VALIDATION.START.create(
        invitedNickname,
        true,
      ),
    );
  };

  const onMyNicknameChange = (v: string) => {
    wipeErrors();
    setMyNickname(v);
  };

  const onComplete = () => {
    dispatch(
      ValidationActions.REF_USERNAME_VALIDATION.START.create(
        invitedNickname,
        false,
      ),
    );
  };

  const isNextButtonActive =
    (currentPage === 0 && myNickname.trim().length > 0) ||
    (currentPage === 1 && invitedNickname.trim().length > 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={styles.container}>
        <Touchable onPress={Keyboard.dismiss} style={styles.pagerContainer}>
          <PagerView
            ref={pagerViewRef}
            style={styles.container}
            initialPage={0}
            scrollEnabled={false}>
            <View key={'claimNickname'} style={styles.container}>
              <ScrollView>
                <ClaimNickName
                  inputValue={myNickname}
                  onInputChange={onMyNicknameChange}
                  errorText={claimValidationError || ''}
                  onFocus={wipeErrors}
                />
              </ScrollView>
            </View>
            <View key={'whoInvitedYou'} style={styles.container}>
              <ScrollView>
                <WhoInvitedYou
                  inputValue={invitedNickname}
                  onInputChange={setInvitedNickname}
                  onSkip={skipRefInvitation}
                  errorText={refValidationError || ''}
                  onFocus={wipeErrors}
                />
              </ScrollView>
            </View>
          </PagerView>
        </Touchable>
      </KeyboardAvoidingView>

      <NavigationPanel
        amount={2}
        activeIndex={currentPage}
        nextPress={onNextPress}
        lastPageButtonText={t('button.complete')}
        yesPleasePress={onComplete}
        withError={!!claimValidationError || !!refValidationError}
        isButtonActive={isNextButtonActive}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
  pagerContainer: {
    flex: 1,
  },
});
