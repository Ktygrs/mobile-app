// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import SessionsActions from '@store/modules/Sessions/actions';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import UnlinkIcon from '@svg/UnlinkIcon';
import React, {FunctionComponent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BaseButton from './BaseButton';

interface Props {
  sessionId: string;
}

// TODO: Translations
const UnlinkButton: FunctionComponent<Props> = ({sessionId}) => {
  const dispatch = useDispatch();

  const providerId = useSelector(
    SessionsSelectors.session.getProviderId(sessionId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, SessionsActions.PROVIDER_UNLINK(providerId)),
  );

  const isUnlinked = useSelector(
    isSuccessSelector.bind(null, SessionsActions.PROVIDER_UNLINK(providerId)),
  );

  const onPress = useCallback(() => {
    // TODO:Open dialog

    dispatch(
      SessionsActions.PROVIDER_UNLINK(providerId).START.create({
        providerId,
      }),
    );
  }, [dispatch, providerId]);

  return isUnlinked ? (
    <BaseButton text={'_Login unlinked'} backgroundColor={COLORS.secondary} />
  ) : (
    <BaseButton
      isLoading={isLoading}
      Icon={UnlinkIcon}
      text={'_Unlink'}
      backgroundColor={COLORS.attention}
      onPress={onPress}
    />
  );
};

export default UnlinkButton;
