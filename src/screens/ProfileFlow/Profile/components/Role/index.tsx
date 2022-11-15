// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CurrentRoleCard,
  CurrentRoleSkeleton,
} from '@screens/ProfileFlow/Profile/components/Role/components/CurrentRoleCard';
import React, {memo, useState} from 'react';

type Props = {
  user: User | null;
};

export const Role = memo(({user}: Props) => {
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
          imageSourceHidden={Images.roles.pioneerInactive}
          title={'Pioneer'}
          description={'Are you flesh and blood?'}
          user={user}
          onNextPress={() => {
            navigation.navigate('MyRoles');
          }}
        />
      )}
    </>
  );
});
