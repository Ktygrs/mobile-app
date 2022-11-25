// SPDX-License-Identifier: BUSL-1.1

import {DEFAULT_CELL_COUNT} from '@components/Inputs/CodeInput';
import {MainStackParamList} from '@navigation/Main';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {checkProp} from '@utils/guards';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

type Props = {
  clearError: () => void;
  validate: (code: string) => void;
  resetValidation: () => void;
  validationError?: string;
  validateResult?: unknown;
  cellCount?: number;
};

export const useCodeInput = ({
  clearError,
  validate,
  resetValidation,
  validateResult,
  cellCount = DEFAULT_CELL_COUNT,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [code, setCode] = useState('');

  const errorCode = checkProp(validateResult, 'errorCode')
    ? (validateResult.errorCode as string)
    : null;

  const errorMessage = checkProp(validateResult, 'errorMessage')
    ? (validateResult.errorMessage as string)
    : null;

  const onSetCode = (value: string) => {
    setCode(value);
    if (errorMessage) {
      clearError();
    }
    if (value.length === cellCount) {
      validate(value);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setCode('');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (errorCode) {
      if (errorCode === 'INVALID_VALIDATION_CODE') {
        setCode('');
      } else if (
        ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
          errorCode,
        ) &&
        errorMessage
      ) {
        resetValidation();
        // zero setTimeout to postpone error pop-up after step navigation change
        setTimeout(() =>
          navigation.navigate('ErrorPopUp', {message: errorMessage}),
        );
      }
    }
  }, [errorMessage, errorCode, resetValidation, navigation]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          resetValidation();
          return true;
        },
      );
      return () => subscription.remove();
    }, [resetValidation]),
  );

  return {
    code,
    setCode: onSetCode,
    validationError: errorMessage,
  };
};
