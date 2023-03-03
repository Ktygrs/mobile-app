// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {replaceString, tagRegex} from '@translations/i18n';
import React, {useMemo} from 'react';
import {Linking, StyleSheet, Text} from 'react-native';

type Props = {
  step: WalkThroughStep | undefined;
};

export function useParseDescription({step}: Props) {
  return useMemo(() => {
    if (!step) {
      return {parsedDescription: null};
    }

    let parsedDescription = replaceString(
      step.description,
      tagRegex('ice'),
      (match, index) => <IceLabel key={match + index} iconOffsetY={0} />,
    );

    if (step.link) {
      parsedDescription = replaceString(
        parsedDescription,
        tagRegex('link', false),
        (match, index) => {
          return (
            <Text
              key={match + index}
              style={styles.underlineText}
              onPress={() => {
                Linking.openURL(step.link ?? '');
              }}>
              {match}
            </Text>
          );
        },
      );
    }

    return {parsedDescription};
  }, [step]);
}

const styles = StyleSheet.create({
  underlineText: {
    textDecorationLine: 'underline',
  },
});
