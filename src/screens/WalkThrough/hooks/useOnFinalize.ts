// SPDX-License-Identifier: BUSL-1.1

import {User, WalkThroughType} from '@api/user/types';
import {useNavigation} from '@react-navigation/native';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {getMaxStepVersion} from '@store/modules/WalkThrough/selectors/utils';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  walkThroughType: WalkThroughType;
};

export function useOnFinalize({walkThroughType}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
                  version: getMaxStepVersion(walkThroughType),
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
      navigation.goBack();
    },
    [dispatch, user.clientData, walkThroughType, navigation],
  );
}
