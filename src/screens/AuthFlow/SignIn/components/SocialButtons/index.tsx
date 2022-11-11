// SPDX-License-Identifier: BUSL-1.1

import {SocialButton} from '@screens/AuthFlow/SignIn/components/SocialButtons/components/SocialButton';
import {AccountActions} from '@store/modules/Account/actions';
import {AppleIcon} from '@svg/AppleIcon';
import {FacebookIcon} from '@svg/FacebookIcon';
import {GoogleIcon} from '@svg/GoogleIcon';
import {TwitterIcon} from '@svg/TwitterIcon';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {isIOS, rem} from 'rn-units';

export const SOCIAL_BUTTONS_HEIGHT = rem(88);

export const SocialButtons = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {isIOS ? (
        <SocialButton
          onPress={() =>
            dispatch(AccountActions.SIGN_IN_SOCIAL.START.create('apple'))
          }
          Icon={AppleIcon}
        />
      ) : null}

      <SocialButton
        onPress={() =>
          dispatch(AccountActions.SIGN_IN_SOCIAL.START.create('google'))
        }
        Icon={GoogleIcon}
      />

      <SocialButton
        onPress={() =>
          dispatch(AccountActions.SIGN_IN_SOCIAL.START.create('facebook'))
        }
        Icon={FacebookIcon}
      />

      <SocialButton
        onPress={() =>
          dispatch(AccountActions.SIGN_IN_SOCIAL.START.create('twitter'))
        }
        Icon={TwitterIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: SOCIAL_BUTTONS_HEIGHT,
  },
});
