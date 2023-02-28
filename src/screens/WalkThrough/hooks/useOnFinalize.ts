// SPDX-License-Identifier: BUSL-1.1

import {User, WalkThroughType} from '@api/user/types';
import {useNavigation} from '@react-navigation/native';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {maxWalkThroughTypeVersionSelector} from '@store/modules/WalkThrough/selectors';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  walkThroughType: WalkThroughType;
};

export function useOnFinalize({walkThroughType}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(userSelector);
  const maxStepsVersion = useSelector(
    maxWalkThroughTypeVersionSelector(walkThroughType),
  );
  const onFinalise = ({
    currentUser,
    isSkipped,
  }: {
    currentUser: User | null;
    isSkipped: boolean;
  }) => {
    dispatch(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...currentUser?.clientData,
            walkTroughProgress: {
              ...currentUser?.clientData?.walkTroughProgress,
              [walkThroughType]: {
                type: walkThroughType,
                version: maxStepsVersion,
                finalized: !isSkipped,
              },
            },
          },
        },
        function* (freshUser) {
          onFinalise({currentUser: freshUser, isSkipped});
          return {retry: false};
        },
      ),
    );
    navigation.goBack();
  };
  return (isSkipped: boolean) => {
    onFinalise({currentUser: user, isSkipped});
  };
}
