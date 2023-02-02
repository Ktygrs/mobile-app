// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from 'rn-units';

export const useWhoInvitedYou = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();
  const user = useSelector(userSelector) as User;

  const updateRefByUsernameError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const validationLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const isSuccessUpdateAccount = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const initialReferredBy = useRef(user.referredBy);
  const [refUsername, setRefUsername] = useState('');
  const [updateAccountFinished, setUpdateAccountFinished] = useState(false);

  const onBack = () => {
    resetError();
    removeUsernameStep(user);
  };

  const onChangeRefUsername = (text: string) => {
    setRefUsername(text);
    if (text !== '') {
      updateRefUsername(text);
    }
  };

  const resetError = useCallback(() => {
    if (validationError) {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.RESET.create());
    }
    if (updateRefByUsernameError) {
      dispatch(AccountActions.UPDATE_REF_BY_USERNAME.RESET.create());
    }
    if (isSuccessUpdateAccount || updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  }, [
    dispatch,
    validationError,
    updateError,
    isSuccessUpdateAccount,
    updateRefByUsernameError,
  ]);

  const removeUsernameStep = (userToUpdate: User) => {
    let finalizedSteps =
      userToUpdate.clientData?.registrationProcessFinalizedSteps ?? [];
    if (finalizedSteps.includes('username')) {
      finalizedSteps = finalizedSteps.filter(step => step !== 'username');
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              registrationProcessFinalizedSteps: [...finalizedSteps],
            },
          },
          function* (freshUser) {
            removeUsernameStep(freshUser);
            return {retry: false};
          },
        ),
      );
    }
  };

  const updateRefUsername = useCallback(
    (newRefUsername: string) => {
      resetError();
      dispatch(
        ValidationActions.REF_USERNAME_VALIDATION.START.create(newRefUsername),
      );
    },
    [dispatch, resetError],
  );

  const updateFinalizedSteps = useCallback(
    (currentUser: User) => {
      const finalizedSteps =
        currentUser.clientData?.registrationProcessFinalizedSteps ?? [];

      if (!finalizedSteps.includes('referral')) {
        const steps = [...finalizedSteps];
        if (!finalizedSteps.includes('referral')) {
          steps.push('referral');
        }
        dispatch(
          AccountActions.UPDATE_ACCOUNT.START.create(
            {
              clientData: {
                ...currentUser.clientData,
                registrationProcessFinalizedSteps: [
                  ...finalizedSteps,
                  'referral',
                ],
              },
            },
            function* (freshUser) {
              updateFinalizedSteps(freshUser);
              return {retry: false};
            },
          ),
        );
        dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
      }
    },
    [dispatch],
  );

  const onSubmit = () => {
    Keyboard.dismiss();
    resetError();
    dispatch(AccountActions.UPDATE_REF_BY_USERNAME.START.create(refUsername));
  };

  const onSkip = () => {
    navigation.navigate('PopUp', {
      title: `${t('global.attention')}!`,
      message: t('whoInvitedYou.confirm_text'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          label: t('button.yes_btn'),
          onPress: () => {
            dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
            dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
            updateFinalizedSteps(user);
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (user.referredBy !== initialReferredBy.current) {
      initialReferredBy.current = user.referredBy;
      setUpdateAccountFinished(true);
      /**
       * Added 1 sec wait here so User can see the user validation result
       * (green mark or red cross) inside text input before we update user account
       */
      wait(1000).then(() => {
        updateFinalizedSteps(user);
      });
    }
  }, [updateFinalizedSteps, user]);

  return {
    refUsername,
    onChangeRefUsername,
    validationError,
    updateRefByUsernameError,
    validationLoading,
    updateAccountFinished,
    updateError,
    updateLoading,
    onSubmit,
    onSkip,
    onBack,
  };
};
