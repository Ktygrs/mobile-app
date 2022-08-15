// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DeviceActions} from '@store/modules/Devices/actions';
import {actionPayloadSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {useSelector} from 'react-redux';

export const useUpdateRequiredListener = () => {
  const updateMetadataPayload = useSelector(
    actionPayloadSelector.bind(null, DeviceActions.UPDATE_DEVICE_METADATA),
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  if (
    checkProp(updateMetadataPayload, 'errorCode') &&
    updateMetadataPayload.errorCode === 'UPDATE_REQUIRED'
  ) {
    navigation.navigate('UpdateRequired');
  }
};
