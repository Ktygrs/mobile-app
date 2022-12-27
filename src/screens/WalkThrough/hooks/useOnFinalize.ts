// SPDX-License-Identifier: BUSL-1.1

import {User, WalkThroughType} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  walkThroughType: WalkThroughType;
  version: number;
  setIsFinished: (isFinished: boolean) => void;
};

export function useOnFinalize({
  walkThroughType,
  version,
  setIsFinished,
}: Props) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;
  return useCallback(
    (isSkipped: boolean) => {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              ...(user.clientData ?? {}),
              walkTroughProgress: {
                ...(user.clientData?.walkTroughProgress ?? {}),
                [walkThroughType]: {
                  type: walkThroughType,
                  version,
                  finalized: !isSkipped,
                },
              },
            },
          },
          function* () {
            return {retry: true};
          },
        ),
      );
      setIsFinished(true);
    },
    [dispatch, user.clientData, walkThroughType, version, setIsFinished],
  );
}
