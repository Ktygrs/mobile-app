// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import CheckMarkCircleFillIcon from '@svg/CheckMarkCircleFillIcon';
import {t} from '@translations/i18n';
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import BaseButton from './components/buttons/BaseButton';
import EndSessionButton from './components/buttons/EndSessionButton';
import UnlinkButton from './components/buttons/UnlinkButton';

interface Props {
  sessionId: string;
}

const ActionButtons: FunctionComponent<Props> = ({sessionId}) => {
  const isCurrentSession = useSelector(
    SessionsSelectors.session.isCurrentSession(sessionId),
  );

  const isAllowedUnlink = useSelector(
    SessionsSelectors.session.isAllowedUnlink(sessionId),
  );

  return (
    <View style={styles.container}>
      {isCurrentSession ? (
        <BaseButton
          Icon={CheckMarkCircleFillIcon}
          text={t('ActiveSessionsScreen.buttons.currentSession')}
          backgroundColor={COLORS.shamrock}
        />
      ) : (
        [
          <EndSessionButton key={'endSession'} sessionId={sessionId} />,
          isAllowedUnlink ? (
            <UnlinkButton key={'unlinkLogin'} sessionId={sessionId} />
          ) : undefined,
        ]
      )}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    marginLeft: rem(12),
    width: rem(76),
    backgroundColor: '#fff',
  },
});
