// SPDX-License-Identifier: BUSL-1.1

import {
  startTrackingCurrentUser,
  updateUserAttributes,
} from '@services/analytics';
import {userSelector} from '@store/modules/Account/selectors';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export function useTrackUserInfo() {
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      startTrackingCurrentUser(user.id);
      updateUserAttributes(user);
    }
  }, [user]);
}
