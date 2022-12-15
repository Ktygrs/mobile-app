// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useDispatch, useSelector} from 'react-redux';

export const useFinishOnboarding = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;

  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const finishOnboarding = (currentUser: User) => {
    const finalizedSteps =
      currentUser?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('onboarding')) {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create({
          clientData: {
            ...currentUser.clientData,
            registrationProcessFinalizedSteps: [
              ...finalizedSteps,
              'onboarding',
            ],
          },
        }),
      );
    }
  };

  const onSubmit = () => finishOnboarding(user);

  return {onSubmit, loading};
};
