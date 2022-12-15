// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useDispatch, useSelector} from 'react-redux';

export const useIceBonus = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;

  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const currentBalance = '10.00';

  const finishIceBonus = (currentUser: User) => {
    const finalizedSteps =
      currentUser?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('iceBonus')) {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create({
          clientData: {
            ...currentUser.clientData,
            registrationProcessFinalizedSteps: [...finalizedSteps, 'iceBonus'],
          },
        }),
      );
    }
  };

  const onSubmit = () => finishIceBonus(user);

  return {
    currentBalance,
    loading,
    onSubmit,
  };
};
