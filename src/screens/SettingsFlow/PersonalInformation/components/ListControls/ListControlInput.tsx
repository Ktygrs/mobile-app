// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import {font} from '@utils/styles';
import React, {memo, useRef} from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type Props = {
  label: string;
} & TextInputProps;

export const ListControlInput = memo(({label, ...inputProps}: Props) => {
  const inputRef = useRef<TextInput>(null);
  return (
    <Touchable onPress={() => inputRef.current?.focus()}>
      <ListControlBase label={label}>
        <TextInput style={styles.input} {...inputProps} ref={inputRef} />
      </ListControlBase>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  input: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    ...font(14, null, 'bold', 'secondary'),
  },
});
