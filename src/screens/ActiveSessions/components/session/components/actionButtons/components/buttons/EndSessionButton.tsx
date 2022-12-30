// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import useConfirmEndSessionDialog from '@screens/ActiveSessions/hooks/useConfirmEndSessionDialog';
import SessionsActions from '@store/modules/Sessions/actions';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {CloseIcon} from '@svg/CloseIcon';
import {t} from '@translations/i18n';
import React, {FunctionComponent} from 'react';
import {useSelector} from 'react-redux';

import BaseButton from './BaseButton';

interface Props {
  sessionId: string;
}

const EndSessionButton: FunctionComponent<Props> = ({sessionId}) => {
  const {openConfirmationDialog} = useConfirmEndSessionDialog({
    sessionId,
  });

  const providerId = useSelector(
    SessionsSelectors.session.getProviderId(sessionId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, SessionsActions.SESSION_END(sessionId)),
  );

  const isSessionEnded = useSelector(
    isSuccessSelector.bind(null, SessionsActions.SESSION_END(sessionId)),
  );

  const isUnlinked = useSelector(
    isSuccessSelector.bind(null, SessionsActions.PROVIDER_UNLINK(providerId)),
  );

  return isSessionEnded || isUnlinked ? (
    <BaseButton
      text={t('ActiveSessionsScreen.buttons.sessionEnded')}
      backgroundColor={COLORS.periwinkleGray}
    />
  ) : (
    <BaseButton
      isLoading={isLoading}
      Icon={CloseIcon}
      text={t('ActiveSessionsScreen.buttons.endSession')}
      backgroundColor={COLORS.primaryLight}
      onPress={openConfirmationDialog}
    />
  );
};

export default EndSessionButton;
