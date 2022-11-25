// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {pick} from 'lodash';
import {useEffect, useMemo, useState} from 'react';

export const useUserDraft = (user: User) => {
  const userDraftProps: (keyof User)[] = useMemo(
    () => [
      'username',
      'firstName',
      'lastName',
      'country',
      'city',
      'profilePicture',
    ],
    [],
  );

  const [userDraft, setUserDraft] = useState(pick(user, userDraftProps));

  useEffect(() => {
    setUserDraft(pick(user, userDraftProps));
  }, [user, userDraftProps]);

  const changes = (Object.keys(userDraft) as (keyof typeof userDraft)[]).filter(
    prop => (user[prop] || userDraft[prop]) && user[prop] !== userDraft[prop],
  );

  return {user, userDraft, setUserDraft, changes};
};
