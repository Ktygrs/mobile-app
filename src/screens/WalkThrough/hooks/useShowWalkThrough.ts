// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useHasStepsToShow} from '@store/modules/WalkThrough/hooks/useHasStepsToShow';
import {useEffect} from 'react';

type Props = {walkThroughType: WalkThroughType};

export function useShowWalkThrough({walkThroughType}: Props) {
  //TODO::check if element is populated -> hasStepsToShow
  const hasStepsToShow = useHasStepsToShow(walkThroughType);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  useEffect(() => {
    if (hasStepsToShow) {
      navigation.push('WalkThrough', {walkThroughType});
    }
  }, [navigation, hasStepsToShow, walkThroughType]);
}
