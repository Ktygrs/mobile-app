// SPDX-License-Identifier: BUSL-1.1

import {LogoIcon} from '@svg/LogoIcon';
import {translate} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid} from 'rn-units';

interface WelcomeItemDescriptionProps {
  items: Array<String | number>; // where 1 is icon with text 'ice'
}

export const WelcomeItemDescription = ({
  items,
}: WelcomeItemDescriptionProps) => {
  return (
    <Text style={styles.textContainerWithIcon}>
      {items.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <Text style={styles.text} key={`${index}-item`}>
              {item}
            </Text>
          );
        } else {
          return item === 1 ? (
            <Text style={styles.mediumText} key={`${index}-item`}>{`${translate(
              'global.project_name',
            )} `}</Text>
          ) : (
            <View key={`${index}-item`}>
              <LogoIcon />
            </View>
          );
        }
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  textContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    ...font(14, 24, 'regular', 'secondary'),
  },
  mediumText: {
    ...font(14, 24, isAndroid ? 'bold' : 'medium', 'secondary'),
  },
});
