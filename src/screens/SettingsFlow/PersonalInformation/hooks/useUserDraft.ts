// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {userSelector} from '@store/modules/Auth/selectors';
import {pick} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

export const useUserDraft = () => {
  const userDraftProps: (keyof User)[] = useMemo(
    () => ['firstName', 'lastName', 'country', 'city', 'profilePicture'],
    [],
  );

  const user = useSelector(userSelector) as User;
  const [userDraft, setUserDraft] = useState(pick(user, userDraftProps));

  useEffect(() => {
    setUserDraft(pick(user, userDraftProps));
  }, [user, userDraftProps]);

  const hasChanges = Boolean(
    (Object.keys(userDraft) as (keyof typeof userDraft)[]).find(
      prop => (user[prop] || userDraft[prop]) && user[prop] !== userDraft[prop],
    ),
  );

  return {user, userDraft, setUserDraft, hasChanges};
};
