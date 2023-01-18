// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {
  MiningStateConfig,
  MiningStateSequence,
} from '@navigation/components/MainTabBar/components/TabBarMiningItem/config';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useMiningState = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const [miningState, setMiningState] = useState<
    typeof MiningStateSequence[number]
  >(MiningStateSequence[0]);

  const miningStateTooltipSeen =
    user?.clientData?.miningStateTooltipSeen?.includes(miningState);

  const setMiningStateTooltipSeen = (
    currentUser: User,
    seenMiningState: string,
  ) => {
    dispatch(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...currentUser?.clientData,
            miningStateTooltipSeen: [
              ...(currentUser.clientData?.miningStateTooltipSeen ?? []),
              seenMiningState,
            ],
          },
        },
        function* (freshUser) {
          if (
            !freshUser.clientData?.miningStateTooltipSeen?.includes(
              seenMiningState,
            )
          ) {
            setMiningStateTooltipSeen(freshUser, seenMiningState);
          }
          return {retry: false};
        },
      ),
    );
  };

  const startMining = () => {
    if (user && !miningStateTooltipSeen) {
      setMiningStateTooltipSeen(user, miningState);
    }
    const nextStateIndex = MiningStateSequence.indexOf(miningState) + 1;
    setMiningState(
      MiningStateSequence[
        nextStateIndex >= MiningStateSequence.length ? 0 : nextStateIndex
      ],
    );
  };

  const stateConfig = MiningStateConfig[miningState];

  return {
    stateConfig,
    miningStateTooltipSeen,
    startMining,
    closeTooltip: () => user && setMiningStateTooltipSeen(user, miningState),
  };
};
