// SPDX-License-Identifier: BUSL-1.1

import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {rem} from 'rn-units';

interface DescriptionProps {
  value?: string | null;
}

export const Description = ({value = ''}: DescriptionProps) => {
  return (
    <View style={styles.descriptionContainer}>
      <Markdown
        style={{
          body: styles.description,
          paragraph: styles.markdown,
        }}>
        {value}
      </Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    flex: 1,
    marginRight: rem(70),
  },
  description: {
    ...font(14, 19, 'medium', 'primaryDark'),
  },
  markdown: {
    marginTop: 0,
    marginBottom: 0,
  },
});
