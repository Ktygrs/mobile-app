// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from '@translations/i18n';
import {ActionSheetIOS} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {isIOS} from 'rn-units';

type Button = {
  label: string;
  icon: (props: SvgProps) => JSX.Element;
  onPress: () => void;
};

export const useActionSheet = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const showActionSheet = ({
    title,
    buttons,
  }: {
    title: string;
    buttons: Button[];
  }) => {
    if (isIOS) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          options: [...buttons.map(b => b.label), t('button.cancel')],
          cancelButtonIndex: buttons.length,
        },
        index => buttons[index]?.onPress(),
      );
    } else {
      navigation.navigate('ActionSheet', {title, buttons});
    }
  };
  return {showActionSheet};
};
