// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_CONFIRM_NO_BUTTON} from '@screens/Dialogs/Confirm';
import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {LoginSessionsSelectors} from '@store/modules/Sessions/selectors';
import {t} from '@translations/i18n';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

interface Params {
  sessionId: string;
}

export const useConfirmEndSessionDialog = ({sessionId}: Params) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ActiveLoginSessions'>
    >();

  const dispatch = useDispatch();

  const providerId = useSelector(
    LoginSessionsSelectors.session.getProviderId(sessionId),
  );

  const openConfirmationDialog = useCallback(() => {
    navigation.navigate('Confirm', {
      title: t('ActiveSessionsScreen.dialogs.endSession.title'),
      subtitle: t('ActiveSessionsScreen.dialogs.endSession.message', {
        providerName: providerId,
      }),
      buttons: [
        DEFAULT_CONFIRM_NO_BUTTON,
        {
          label: t('ActiveSessionsScreen.buttons.endSession'),
          onPress: () => {
            dispatch(
              LoginSessionsActions.SESSION_END(sessionId).START.create({
                sessionId,
              }),
            );
          },
        },
      ],
    });
  }, [dispatch, navigation, providerId, sessionId]);

  return {
    openConfirmationDialog,
  };
};
