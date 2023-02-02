// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {DeviceActions} from '@store/modules/Devices/actions';
import {t} from '@translations/i18n';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export const useConfirmChangeLanguageDialog = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  return {
    openConfirmationDialog: useCallback(
      (language: string) => {
        navigation.navigate('PopUp', {
          title: t('settings.change_lang_confirm.title'),
          message: t('settings.change_lang_confirm.prompt'),
          buttons: [
            DEFAULT_DIALOG_NO_BUTTON,
            {
              label: t('button.change'),
              onPress: () => {
                dispatch(
                  DeviceActions.UPDATE_SETTINGS.START.create({language}),
                );
              },
            },
          ],
        });
      },
      [dispatch, navigation],
    ),
  };
};
