// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_CONFIRM_NO_BUTTON} from '@screens/Dialogs/Confirm';
import SessionsActions from '@store/modules/Sessions/actions';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {t} from '@translations/i18n';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

interface Params {
  sessionId: string;
}

const useConfirmUnlinkLoginProviderDialog = ({sessionId}: Params) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ActiveSessions'>
    >();

  const dispatch = useDispatch();

  const providerId = useSelector(
    SessionsSelectors.session.getProviderId(sessionId),
  );

  const openConfirmationDialog = useCallback(() => {
    navigation.navigate('Confirm', {
      title: t('ActiveSessionsScreen.dialogs.unlinkLogin.title'),
      subtitle: t('ActiveSessionsScreen.dialogs.unlinkLogin.message', {
        providerName: providerId,
      }),
      buttons: [
        DEFAULT_CONFIRM_NO_BUTTON,
        {
          label: t('ActiveSessionsScreen.buttons.unlink'),
          preset: 'destructive',
          onPress: () => {
            dispatch(
              SessionsActions.PROVIDER_UNLINK(providerId).START.create({
                providerId,
              }),
            );
          },
        },
      ],
    });
  }, [dispatch, navigation, providerId]);

  return {
    openConfirmationDialog,
  };
};

export default useConfirmUnlinkLoginProviderDialog;
