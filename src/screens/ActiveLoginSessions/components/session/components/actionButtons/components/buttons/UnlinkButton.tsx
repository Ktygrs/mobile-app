// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useConfirmUnlinkLoginProviderDialog} from '@screens/ActiveLoginSessions/hooks/useConfirmUnlinkLoginProviderDialog';
import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {LoginSessionsSelectors} from '@store/modules/Sessions/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {UnlinkLoginProviderIcon} from '@svg/UnlinkLoginProviderIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {useSelector} from 'react-redux';

import {BaseSessionActionButton} from './BaseSessionActionButton';

interface Props {
  sessionId: string;
}

export const UnlinkButton = ({sessionId}: Props) => {
  const {openConfirmationDialog} = useConfirmUnlinkLoginProviderDialog({
    sessionId,
  });

  const providerId = useSelector(
    LoginSessionsSelectors.session.getProviderId(sessionId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(
      null,
      LoginSessionsActions.PROVIDER_UNLINK(providerId),
    ),
  );

  const isUnlinked = useSelector(
    isSuccessSelector.bind(
      null,
      LoginSessionsActions.PROVIDER_UNLINK(providerId),
    ),
  );

  return isUnlinked ? (
    <BaseSessionActionButton
      text={t('ActiveSessionsScreen.buttons.loginUnlinked')}
      backgroundColor={COLORS.secondary}
    />
  ) : (
    <BaseSessionActionButton
      isLoading={isLoading}
      Icon={UnlinkLoginProviderIcon}
      text={t('ActiveSessionsScreen.buttons.unlink')}
      backgroundColor={COLORS.attention}
      onPress={openConfirmationDialog}
    />
  );
};
