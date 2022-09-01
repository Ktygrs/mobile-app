// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CurrentRoleCard,
  CurrentRoleSkeleton,
} from '@screens/ProfileFlow/Profile/components/Role/components/CurrentRoleCard';
import React, {memo, useState} from 'react';

export const Role = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      {loading ? (
        <CurrentRoleSkeleton />
      ) : (
        <CurrentRoleCard
          imageSource={Images.roles.pioneer}
          title={'Pioneer'}
          description={'Are you flesh and blood?'}
          onNextPress={() => {
            navigation.navigate('MyRoles');
          }}
        />
      )}
    </>
  );
});
