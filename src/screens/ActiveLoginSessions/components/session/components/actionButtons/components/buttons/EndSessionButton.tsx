// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useConfirmEndSessionDialog} from '@screens/ActiveLoginSessions/hooks/useConfirmEndSessionDialog';
import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {LoginSessionsSelectors} from '@store/modules/Sessions/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {CloseIcon} from '@svg/CloseIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {useSelector} from 'react-redux';

import {BaseSessionActionButton} from './BaseSessionActionButton';

interface Props {
  sessionId: string;
}

export const EndSessionButton = ({sessionId}: Props) => {
  const {openConfirmationDialog} = useConfirmEndSessionDialog({
    sessionId,
  });

  const providerId = useSelector(
    LoginSessionsSelectors.session.getProviderId(sessionId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, LoginSessionsActions.SESSION_END(sessionId)),
  );

  const isSessionEnded = useSelector(
    isSuccessSelector.bind(null, LoginSessionsActions.SESSION_END(sessionId)),
  );

  const isUnlinked = useSelector(
    isSuccessSelector.bind(
      null,
      LoginSessionsActions.PROVIDER_UNLINK(providerId),
    ),
  );

  return isSessionEnded || isUnlinked ? (
    <BaseSessionActionButton
      text={t('ActiveSessionsScreen.buttons.sessionEnded')}
      backgroundColor={COLORS.periwinkleGray}
    />
  ) : (
    <BaseSessionActionButton
      isLoading={isLoading}
      Icon={CloseIcon}
      text={t('ActiveSessionsScreen.buttons.endSession')}
      backgroundColor={COLORS.primaryLight}
      onPress={openConfirmationDialog}
    />
  );
};
