// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {LoginSessionsSelectors} from '@store/modules/Sessions/selectors';
import {CheckMarkCircleFillIcon} from '@svg/CheckMarkCircleFillIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {
  BaseSessionActionButton,
  EndSessionButton,
  UnlinkButton,
} from './components/buttons';

interface Props {
  sessionId: string;
}

export const ActionButtons = ({sessionId}: Props) => {
  const isCurrentSession = useSelector(
    LoginSessionsSelectors.session.isCurrentSession(sessionId),
  );

  const isAllowedUnlink = useSelector(
    LoginSessionsSelectors.session.isAllowedUnlink(sessionId),
  );

  return (
    <View style={styles.container}>
      {isCurrentSession ? (
        <BaseSessionActionButton
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

const styles = StyleSheet.create({
  container: {
    marginLeft: rem(12),
    width: rem(76),
    backgroundColor: '#fff',
  },
});
