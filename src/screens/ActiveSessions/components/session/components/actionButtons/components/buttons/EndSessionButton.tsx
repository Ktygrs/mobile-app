// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import SessionsActions from '@store/modules/Sessions/actions';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {CloseIcon} from '@svg/CloseIcon';
import React, {FunctionComponent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BaseButton from './BaseButton';

interface Props {
  sessionId: string;
}

// TODO: Translations
const EndSessionButton: FunctionComponent<Props> = ({sessionId}) => {
  const dispatch = useDispatch();

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

  const onPress = useCallback(() => {
    // TODO: Open dialog

    dispatch(
      SessionsActions.SESSION_END(sessionId).START.create({
        sessionId,
      }),
    );
  }, [dispatch, sessionId]);

  return isSessionEnded || isUnlinked ? (
    <BaseButton
      text={'_Session ended'}
      backgroundColor={COLORS.periwinkleGray}
    />
  ) : (
    <BaseButton
      isLoading={isLoading}
      Icon={CloseIcon}
      text={'_End Session'}
      backgroundColor={COLORS.primaryLight}
      onPress={onPress}
    />
  );
};

export default EndSessionButton;
