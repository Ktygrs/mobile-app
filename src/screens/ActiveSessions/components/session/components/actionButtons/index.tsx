// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import {CloseIcon} from '@svg/CloseIcon';
import UnlinkIcon from '@svg/UnlinkIcon';
import {font} from '@utils/styles';
import React, {FunctionComponent, useCallback} from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  sessionId: string;
}

// TODO: Translations
// TODO: Hide/disable buttons
// TODO: Fix icons
const ActionButtons: FunctionComponent<Props> = ({sessionId}) => {
  const isCurrentSession = useSelector(
    SessionsSelectors.session.isCurrentSession(sessionId),
  );

  const onEndSessionPress = useCallback(() => {
    // TODO: End session
  }, []);

  const onUnlinkPress = useCallback(() => {
    // TODO: Unlink login
  }, []);

  const renderButton = useCallback(
    ({
      Icon,
      text,
      backgroundColor,
      onPress,
    }: {
      Icon?: FunctionComponent<SvgProps>;
      text: string;
      backgroundColor: ColorValue;
      onPress?(): void;
    }) => {
      return (
        <TouchableOpacity
          key={text}
          style={[
            styles.buttonContainer,
            {
              backgroundColor,
            },
          ]}
          disabled={!onPress}
          onPress={onPress}>
          {Icon && (
            <View style={styles.buttonIconContainer}>
              <Icon color={'#fff'} />
            </View>
          )}

          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      {isCurrentSession
        ? renderButton({
            Icon: CheckMarkThinIcon,
            text: '_Current session',
            backgroundColor: COLORS.shamrock,
          })
        : [
            renderButton({
              Icon: CloseIcon,
              text: '_End Session',
              backgroundColor: COLORS.primaryLight,
              onPress: onEndSessionPress,
            }),
            renderButton({
              Icon: UnlinkIcon,
              text: '_Unlink',
              backgroundColor: COLORS.attention,
              onPress: onUnlinkPress,
            }),
          ]}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    width: rem(76),
    backgroundColor: '#fff',
  },

  buttonContainer: {
    marginLeft: rem(10),
    paddingVertical: rem(10),
    paddingHorizontal: rem(6.5),
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconContainer: {
    marginBottom: rem(2),
    width: rem(20),
    height: rem(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...font(12, 14.4, 'regular', 'white'),
    flexShrink: 1,
    textAlign: 'center',
  },
});
