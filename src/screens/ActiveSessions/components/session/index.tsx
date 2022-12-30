// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {dayjs} from '@services/dayjs';
import SessionsSelectors from '@store/modules/Sessions/selectors';
import {AppleIcon} from '@svg/AppleIcon';
import {ClockIcon} from '@svg/ClockIcon';
import {EmailIcon} from '@svg/EmailIcon';
import {FacebookIcon} from '@svg/FacebookIcon';
import {GoogleIcon} from '@svg/GoogleIcon';
import {PhoneIcon} from '@svg/PhoneIcon';
import {TwitterIcon} from '@svg/TwitterIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import ActionButtons from './components/actionButtons';

interface Props {
  sessionId: string;
}

const Session: FunctionComponent<Props> = ({sessionId}) => {
  const providerType = useSelector(
    SessionsSelectors.session.getProviderType(sessionId),
  );

  const locationName = useSelector(
    SessionsSelectors.session.getLocationName(sessionId),
  );

  const device = useSelector(SessionsSelectors.session.getDevice(sessionId));

  const lastActivityAt = useSelector(
    SessionsSelectors.session.getLastActivityAt(sessionId),
  );

  const loginIdentifierType = useSelector(
    SessionsSelectors.session.getLoginIdentifierType(sessionId),
  );

  const loginIdentifier = useSelector(
    SessionsSelectors.session.getLoginIdentifier(sessionId),
  );

  const ProviderIcon = useMemo(() => {
    switch (providerType) {
      case 'APPLE':
        return AppleIcon;

      case 'FACEBOOK':
        return FacebookIcon;

      case 'GOOGLE':
        return GoogleIcon;

      case 'TWITTER':
        return TwitterIcon;

      case 'EMAIL':
      default:
        return EmailIcon;
    }
  }, [providerType]);

  const renderExtraInfo = useCallback(
    (Icon: FunctionComponent<SvgProps>, text: string) => {
      return (
        <View style={styles.extraInfoItemContainer}>
          <Icon width={rem(16)} height={rem(16)} color={COLORS.secondary} />

          <Text style={styles.extraInfoItemText} numberOfLines={2}>
            {text}
          </Text>
        </View>
      );
    },
    [],
  );

  const renderLoginCredentials = useCallback(() => {
    switch (loginIdentifierType) {
      case 'EMAIL':
        return renderExtraInfo(EmailIcon, loginIdentifier);

      case 'PHONE_NUMBER':
        return renderExtraInfo(PhoneIcon, loginIdentifier);

      default:
        return null;
    }
  }, [loginIdentifier, loginIdentifierType, renderExtraInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.bodyContainer}>
          <View style={styles.topRowContainer}>
            <ProviderIcon width={rem(36)} height={rem(36)} />

            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {t('ActiveSessionsScreen.sessionName', {
                  providerName: providerType,
                })}
              </Text>

              <Text style={styles.location}>{locationName}</Text>
            </View>
          </View>

          <View style={styles.extraInfoRowContainer}>
            {renderExtraInfo(PhoneIcon, device.info)}

            {renderExtraInfo(ClockIcon, dayjs(lastActivityAt).fromNow())}
          </View>

          <View style={styles.extraInfoRowContainer}>
            {renderLoginCredentials()}
          </View>
        </View>

        <ActionButtons sessionId={sessionId} />
      </View>
    </View>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rem(20),
    borderRadius: rem(16),
    backgroundColor: '#fff',
    ...commonStyles.shadow,
  },
  innerContainer: {
    flexDirection: 'row',
    borderRadius: rem(16),
    overflow: 'hidden',
  },

  bodyContainer: {
    flex: 1,
    padding: rem(12),
  },

  topRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleContainer: {
    marginLeft: rem(10),
    flexShrink: 1,
  },
  title: {
    ...font(14, 16.8, 'semibold', 'primaryDark'),
  },
  location: {
    marginTop: rem(2),
    ...font(12, 14.4, 'medium', 'secondary'),
  },

  extraInfoRowContainer: {
    marginTop: rem(12),
    flexDirection: 'row',
  },
  extraInfoItemContainer: {
    paddingRight: rem(8),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraInfoItemText: {
    marginLeft: rem(6),
    flexShrink: 1,
    ...font(12, undefined, 'medium', 'secondary'),
  },
});
