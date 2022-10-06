// SPDX-License-Identifier: BUSL-1.1

import {RegistrationProcessFinalizedStep} from '@api/user/types';
import {KeyboardDismiss} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {ClaimUsername} from '@screens/UserRegistrationFlow/ProfileFill/components/ClaimUsername';
import {WhoInvitedYou} from '@screens/UserRegistrationFlow/ProfileFill/components/WhoInvitedYou';
import {NavigationPanel} from '@screens/UserRegistrationFlow/Welcome/components/NavigationPanel';
import {userSelector} from '@store/modules/Auth/selectors';
import {t} from '@translations/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {isIOS} from 'rn-units';

export const PROFILE_FILL_STEPS: RegistrationProcessFinalizedStep[] = [
  'username',
  'referral',
  // 'email', TODO::uncomment when implemented
];

export type ProfileFillStepMethods = {
  submit: () => void;
};

export const ProfileFill = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const user = useSelector(userSelector);
  const finalizedSteps =
    user?.clientData?.registrationProcessFinalizedSteps ?? [];
  const steps = [
    {
      name: 'username',
      ref: useRef<ProfileFillStepMethods>(null),
      done: finalizedSteps.includes('username'),
      Component: ClaimUsername,
    },
    {
      name: 'referral',
      ref: useRef<ProfileFillStepMethods>(null),
      done: finalizedSteps.includes('referral'),
      Component: WhoInvitedYou,
    },
  ];
  const currentIndex = steps.findIndex(s => !s.done);

  useEffect(() => {
    pagerViewRef.current?.setPage(currentIndex);
    setCurrentPage(currentIndex);
  }, [currentIndex, user]);

  const onNextPress = () => {
    steps[currentPage].ref.current?.submit();
  };

  const onComplete = () => {
    steps[steps.length - 1].ref.current?.submit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={styles.container}>
        <KeyboardDismiss>
          <PagerView
            ref={pagerViewRef}
            style={styles.container}
            initialPage={currentIndex}
            scrollEnabled={false}>
            {steps.map(step => (
              <View style={styles.container} key={step.name}>
                <step.Component ref={step.ref} />
              </View>
            ))}
          </PagerView>
        </KeyboardDismiss>
      </KeyboardAvoidingView>

      <NavigationPanel
        amount={2}
        activeIndex={currentPage}
        nextPress={onNextPress}
        lastPageButtonText={t('button.complete')}
        yesPleasePress={onComplete}
        isButtonActive={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
});
