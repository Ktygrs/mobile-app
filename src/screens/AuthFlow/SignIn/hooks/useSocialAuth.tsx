// SPDX-License-Identifier: BUSL-1.1

import {AuthStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SocialSignInProvider} from '@services/auth/signin/types';
import {AccountActions} from '@store/modules/Account/actions';
import {
  actionPayloadSelector,
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {checkProp} from '@utils/guards';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const AUTH_ACTIONS = [
  AccountActions.SIGN_IN_SOCIAL,
  AccountActions.USER_STATE_CHANGE,
];

export const useSocialAuth = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [selectedSocialType, setSelectedSocialType] =
    useState<SocialSignInProvider>();

  const failedReason = useSelector((state: RootState) => {
    const failedAction = AUTH_ACTIONS.find(action =>
      failedReasonSelector(action, state),
    );
    if (failedAction) {
      return failedReasonSelector(failedAction, state);
    }
    return null;
  });

  const isSocialAuthLoading = useSelector((state: RootState) =>
    Boolean(AUTH_ACTIONS.find(action => isLoadingSelector(action, state))),
  );

  const socialPayload = useSelector(
    actionPayloadSelector.bind(null, AccountActions.SIGN_IN_SOCIAL),
  );

  useEffect(() => {
    if (failedReason) {
      navigation.navigate('ErrorPopUp', {message: failedReason});
    }
  }, [failedReason, navigation]);

  useEffect(() => {
    if (checkProp(socialPayload, 'provider')) {
      const provider = socialPayload.provider as SocialSignInProvider;
      setSelectedSocialType(provider);
    }
  }, [socialPayload]);

  return {isSocialAuthLoading, selectedSocialType};
};
