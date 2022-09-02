// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {InfoIcon} from '@svg/InfoIcon';
import {TicketIconSvg} from '@svg/Ticket';
import {TipTriangleIconSvg} from '@svg/TipTriangle';
import {WhoInvitedYouSvg} from '@svg/WhoInvitedYou';
import {translate} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem, screenHeight} from 'rn-units';

interface WhoInvitedYouProps {
  inputValue: string;
  onInputChange: (v: string) => void;
  onSkip: () => void;
  onFocus: () => void;
  errorText: string;
}

const h = (screenHeight * 275) / 811;
const w = (h * 236) / 275;

export const WhoInvitedYou = ({
  inputValue,
  onInputChange,
  onSkip,
  onFocus,
  errorText,
}: WhoInvitedYouProps) => {
  const [isTipVisible, setTipVisibility] = useState(false);

  const showTip = () => {
    setTipVisibility(true);
  };

  const hideTip = () => {
    setTipVisibility(false);
  };

  return (
    <View style={styles.container}>
      <WhoInvitedYouSvg width={h} height={w} />
      <View>
        <Text style={styles.title}>{translate('whoInvitedYou.title')}</Text>
        <Text style={styles.description}>
          {translate('whoInvitedYou.description')}
        </Text>

        <CommonInput
          placeholder={translate('whoInvitedYou.inputPlaceholder')}
          value={inputValue}
          onChangeText={onInputChange}
          icon={<TicketIconSvg />}
          containerStyle={styles.input}
          errorText={errorText}
          onFocus={onFocus}
        />

        <View style={styles.dontHaveCodeContainer}>
          <Touchable style={styles.infoButton} onPress={showTip}>
            <InfoIcon />
          </Touchable>
          <Text style={styles.dontHaveCodeText}>
            {translate('whoInvitedYou.dontHaveInvitationCode')}
          </Text>
          <Touchable onPress={onSkip}>
            <Text style={styles.tapHere}>
              {translate('whoInvitedYou.tapHere')}
            </Text>
          </Touchable>
        </View>
        {isTipVisible ? (
          <View style={styles.tipWrapper}>
            <View style={styles.tipContainer}>
              <Text style={styles.tipText}>
                {translate('whoInvitedYou.dontHaveCodeTip')}
              </Text>
            </View>
            <View style={styles.tipTriangle}>
              <TipTriangleIconSvg />
            </View>
          </View>
        ) : null}
      </View>

      {isTipVisible ? (
        <Touchable style={StyleSheet.absoluteFill} onPress={hideTip}>
          <View />
        </Touchable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: rem(80),
  },
  title: {
    marginTop: rem(24),
    marginBottom: rem(23),
    ...font(28, null, 'black', 'primaryDark'),
  },
  description: {
    textAlign: 'center',
    ...font(14, 24, 'regular', 'secondary'),
  },
  input: {
    marginTop: rem(30),
    width: rem(247),
  },
  dontHaveCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    padding: rem(9),
  },
  dontHaveCodeText: {
    ...font(12.5, 24, 'regular', 'primaryDark'),
  },
  tapHere: {
    ...font(12.5, 24, 'bold', 'primaryDark'),
  },
  tipText: {
    textAlign: 'center',
    ...font(11.5, 18, 'regular'),
  },
  tipContainer: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: rem(17.5),
    paddingTop: rem(9),
    paddingBottom: rem(13),
    borderRadius: rem(13),
  },
  tipTriangle: {
    marginLeft: rem(15),
  },
  tipWrapper: {
    position: 'absolute',
    bottom: rem(20),
  },
});
