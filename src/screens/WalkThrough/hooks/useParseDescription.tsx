// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {replaceString, tagRegex} from '@translations/i18n';
import React, {useMemo} from 'react';
import {Linking, StyleSheet, Text} from 'react-native';
import {isIOS, rem} from 'rn-units';

type Props = {
  visibleStep: WalkThroughStep | undefined;
};

export function useParseDescription({visibleStep}: Props) {
  return useMemo(() => {
    if (!visibleStep) {
      return {parsedDescription: null};
    }

    let parsedDescription = replaceString(
      visibleStep.description,
      tagRegex('ice'),
      (match, index) => (
        <IceLabel key={match + index} iconOffsetY={isIOS ? rem(16) : rem(2)} />
      ),
    );

    if (visibleStep.link) {
      parsedDescription = replaceString(
        parsedDescription,
        tagRegex('link', false),
        (match, index) => {
          return (
            <Text
              key={match + index}
              style={styles.underlineText}
              onPress={() => {
                Linking.openURL(visibleStep.link ?? '');
              }}>
              {match}
            </Text>
          );
        },
      );
    }

    return {parsedDescription};
  }, [visibleStep]);
}

const styles = StyleSheet.create({
  underlineText: {
    textDecorationLine: 'underline',
  },
});
