// SPDX-License-Identifier: BUSL-1.1

import {ResurrectRequiredData} from '@api/tokenomics/types';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {dayjs} from '@services/dayjs';
import {MedKitIcon} from '@svg/MedKitIcon';
import {t} from '@translations/i18n';
import {getDurationString} from '@utils/date';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import reactStringReplace from 'react-string-replace';

export const openConfirmResurrect = (params: ResurrectRequiredData) => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  let message = reactStringReplace(
    t('pop_up.resurrection_message'),
    '[[:amount]]',
    (match, index) => (
      <Text key={match + index} style={styles.boldText}>
        {formatNumberString(params.amount)}
      </Text>
    ),
  );

  message = reactStringReplace(message, '[[:period]]', (match, index) => (
    <Text key={match + index} style={styles.boldText}>
      {getDurationString(dayjs.duration(params.duringTheLastXSeconds, 's'))}
    </Text>
  ));

  navigate({
    name: 'PopUp',
    params: {
      image: Images.popUp.resurrection,
      title: t('pop_up.resurrection'),
      message,
      warning: t('pop_up.resurrection_warning'),
      buttons: [
        {
          label: t('button.not_now'),
          preset: 'outlined',
          onPress: () => resultResolve('no'),
        },
        {
          Icon: <MedKitIcon />,
          label: t('button.resurrect_me'),
          onPress: () => resultResolve('yes'),
        },
      ],
      dismissOnButtonPress: false,
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  boldText: {
    ...font(14, 20, 'bold', 'primaryDark'),
  },
});
