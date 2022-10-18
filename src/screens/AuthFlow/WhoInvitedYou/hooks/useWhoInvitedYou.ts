// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_CONFIRM_NO_BUTTON} from '@screens/Dialogs/Confirm';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {refUserSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {debounce} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useWhoInvitedYou = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const user = useSelector(userSelector) as User;
  const refUser = useSelector(refUserSelector);

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const validationLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );

  const [refUsername, setRefUsername] = useState('');

  const validateFefUsername = useMemo(
    () =>
      debounce((text: string) => {
        if (text) {
          dispatch(
            ValidationActions.REF_USERNAME_VALIDATION.START.create(text),
          );
        }
      }, 600),
    [dispatch],
  );

  const onChangeRefUsername = (text: string) => {
    setRefUsername(text);
  };

  const updateReferredBy = (currentUser: User, referredBy?: string) => {
    const finalizedSteps =
      currentUser.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('referral')) {
      dispatch(
        AuthActions.UPDATE_ACCOUNT.START.create(
          {
            ...(referredBy ? {referredBy} : {}),
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: [
                ...finalizedSteps,
                'referral',
              ],
            },
          },
          function* (freshUser) {
            updateReferredBy(freshUser, referredBy);
            return {retry: false};
          },
        ),
      );
    }
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (refUser) {
      updateReferredBy(user, refUser.id);
    } else {
      dispatch(
        AuthActions.UPDATE_ACCOUNT.FAILED.create(
          t('errors.invalid_ref_username'),
        ),
      );
    }
  };

  const onSkip = () => {
    navigation.navigate('Confirm', {
      title: `${t('global.attention')}!`,
      subtitle: t('whoInvitedYou.confirm_text'),
      buttons: [
        DEFAULT_CONFIRM_NO_BUTTON,
        {
          label: t('button.yes_btn'),
          onPress: () => {
            updateReferredBy(user);
          },
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
    validateFefUsername(refUsername);
  }, [dispatch, refUsername, validateFefUsername]);

  return {
    refUsername,
    onChangeRefUsername,
    validationError,
    validationLoading,
    isSuccessValidation,
    updateError,
    updateLoading,
    onSubmit,
    onSkip,
  };
};
