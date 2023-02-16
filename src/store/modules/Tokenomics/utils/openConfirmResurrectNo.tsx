// SPDX-License-Identifier: BUSL-1.1

import {ResurrectRequiredData} from '@api/tokenomics/types';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import reactStringReplace from 'react-string-replace';

export const openConfirmResurrectNo = (params: ResurrectRequiredData) => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  const message = reactStringReplace(
    t('pop_up.resurrection_no_confirm_message'),
    '[[:amount]]',
    (match, index) => (
      <Text key={match + index} style={styles.boldText}>
        {formatNumberString(params.amount)}
      </Text>
    ),
  );

  navigate({
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.resurrection},
      title: t('pop_up.please_confirm'),
      message: <Message text={message} />,
      buttons: [
        {
          text: t('button.cancel'),
          preset: 'outlined',
          onPress: () => resultResolve('no'),
        },
        {
          text: t('button.confirm'),
          onPress: () => resultResolve('yes'),
        },
      ],
      onDismiss: () => resultResolve('no'),
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  boldText: {
    ...font(14, 20, 'bold', 'primaryDark'),
  },
});
