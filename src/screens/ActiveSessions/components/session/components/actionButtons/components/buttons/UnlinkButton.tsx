// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import useConfirmUnlinkLoginProviderDialog from '@screens/ActiveSessions/hooks/useConfirmUnlinkLoginProviderDialog';
import SessionsActions from '@store/modules/Sessions/actions';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import UnlinkIcon from '@svg/UnlinkIcon';
import {t} from '@translations/i18n';
import React, {FunctionComponent} from 'react';
import {useSelector} from 'react-redux';

import BaseButton from './BaseButton';

interface Props {
  sessionId: string;
}

const UnlinkButton: FunctionComponent<Props> = ({sessionId}) => {
  const {openConfirmationDialog} = useConfirmUnlinkLoginProviderDialog({
    sessionId,
  });

  const providerId = useSelector(
    SessionsSelectors.session.getProviderId(sessionId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, SessionsActions.PROVIDER_UNLINK(providerId)),
  );

  const isUnlinked = useSelector(
    isSuccessSelector.bind(null, SessionsActions.PROVIDER_UNLINK(providerId)),
  );

  return isUnlinked ? (
    <BaseButton
      text={t('ActiveSessionsScreen.buttons.loginUnlinked')}
      backgroundColor={COLORS.secondary}
    />
  ) : (
    <BaseButton
      isLoading={isLoading}
      Icon={UnlinkIcon}
      text={t('ActiveSessionsScreen.buttons.unlink')}
      backgroundColor={COLORS.attention}
      onPress={openConfirmationDialog}
    />
  );
};

export default UnlinkButton;
