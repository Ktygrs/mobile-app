// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import auth from '@react-native-firebase/auth';
import {startAppleSignIn} from '@services/auth/signin/apple';
import {startFacebookSignIn} from '@services/auth/signin/facebook';
import {startGoogleSignIn} from '@services/auth/signin/google';
import {startTwitterSignIn} from '@services/auth/signin/twitter';
import {SocialSignInProvider} from '@services/auth/signin/types';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';

export const signInWithGoogle = async () => {
  const result = await startGoogleSignIn();
  if (!result.cancelled) {
    const googleCredential = auth.GoogleAuthProvider.credential(
      result.data.token,
    );
    await auth().signInWithCredential(googleCredential);
  }
  return result;
};

export const signInWithFacebook = async () => {
  const result = await startFacebookSignIn();
  if (!result.cancelled) {
    const facebookCredential = auth.FacebookAuthProvider.credential(
      result.data.token,
    );
    await auth().signInWithCredential(facebookCredential);
  }
  return result;
};

export const signInWithApple = async () => {
  const result = await startAppleSignIn();
  if (!result.cancelled) {
    const appleCredential = auth.AppleAuthProvider.credential(
      result.data.token,
      result.data.nonce,
    );
    await auth().signInWithCredential(appleCredential);
  }
  return result;
};

export const signInWithTwitter = async () => {
  const result = await startTwitterSignIn();
  if (!result.cancelled) {
    const twitterCredential = auth.TwitterAuthProvider.credential(
      result.data.token,
      result.data.secret,
    );
    await auth().signInWithCredential(twitterCredential);
  }
  return result;
};

export const signInWithPhoneNumber = async (phoneNumber: string) => {
  return auth().signInWithPhoneNumber(phoneNumber, true);
};

export const sendSignInLinkToEmail = async (email: string) => {
  return auth().sendSignInLinkToEmail(email, {
    //TODO:configure prod dynamic links
    dynamicLinkDomain: ENV.DEEPLINK_DOMAIN,
    handleCodeInApp: true,
    iOS: {
      bundleId: ENV.APP_ID,
    },
    android: {
      packageName: ENV.APP_ID ?? '',
      installApp: true,
    },
    url: `https://${ENV.DEEPLINK_DOMAIN}/email-confirmation`,
  });
};

export const signInWithEmailLink = async (email: string, emailLink: string) => {
  return auth().signInWithEmailLink(email, emailLink);
};

export const isSignInWithEmailLink = (emailLink: string) => {
  return auth().isSignInWithEmailLink(emailLink);
};

const getSignInMethodForProvider = (provider: SocialSignInProvider) => {
  switch (provider) {
    case 'apple':
      return signInWithApple;
    case 'google':
      return signInWithGoogle;
    case 'facebook':
      return signInWithFacebook;
    case 'twitter':
      return signInWithTwitter;
    default:
      throw new Error(`Auth ${provider} is not supported yet`);
  }
};

export const signInWithProvider = (provider: SocialSignInProvider) => {
  return getSignInMethodForProvider(provider)();
};

export const onUserChanged = (listener: () => void) => {
  return auth().onUserChanged(listener);
};

export const signOut = () => {
  return auth().signOut();
};

export const getAuthToken = async () => {
  return auth().currentUser?.getIdToken() ?? null;
};

export const getAuthenticatedUser = async (forceRefresh?: boolean) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const idTokenResult = await currentUser.getIdTokenResult(forceRefresh);
    return {
      uid: currentUser.uid,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      token: idTokenResult.token,
      isAdmin: idTokenResult.claims.role === 'admin',
    };
  }
  return null;
};

export const getAuthErrorMessage = (error: unknown) => {
  if (checkProp(error, 'code')) {
    switch (error.code) {
      case 'auth/invalid-verification-code':
      case 'auth/invalid-verification-id':
        // Thrown if the credential is a firebase.auth.PhoneAuthProvider.credential and the verification code or verification ID of the credential is not valid.
        return t('errors.invalid_validation_code');
      case 'auth/invalid-phone-number':
      case 'auth/missing-phone-number':
        // Thrown if the phone number has an invalid format or missing.
        return t('errors.invalid_phone');
      case 'auth/user-disabled':
        // Thrown if the user corresponding to the given credential has been disabled.
        return t('errors.user_disabled');
      case 'auth/invalid-email':
        // Thrown if the email address is not valid.
        return t('errors.invalid_email');
      case 'auth/expired-action-code':
        // Thrown if OTP in email link expires.
        return t('errors.expired_action_code');
      case 'auth/account-exists-with-different-credential':
        // Thrown if there already exists an account with the email address asserted by the credential.
        return t('errors.account_exists_with_different_credential');
      case 'auth/invalid-credential':
        // Thrown if the credential is malformed or has expired.
        return t('errors.invalid_credential');
      case 'auth/operation-not-allowed':
        // Thrown if the type of account corresponding to the credential is not enabled. Enable the account type in the Firebase Console, under the Auth tab.
        return t('errors.operation_not_allowed');
      case 'auth/user-not-found':
        // Thrown if signing in with a credential from firebase.auth.EmailAuthProvider.credential and there is no user corresponding to the given email.
        return t('errors.user_not_found');
    }
  }
};

export const getAuthLanguageCode = () => {
  return auth().languageCode;
};

export const setAuthLanguageCode = async (languageCode: string | null) => {
  return auth().setLanguageCode(languageCode);
};
