// SPDX-License-Identifier: BUSL-1.1

import {HOME_REFRESH_MIN_INTERVAL_SEC} from '@constants/timeouts';
import {dayjs} from '@services/dayjs';
import {AccountActions} from '@store/modules/Account/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {StatsActions} from '@store/modules/Stats/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const REFRESH_ACTIONS = [
  TokenomicsActions.GET_BALANCE_SUMMARY,
  TokenomicsActions.GET_MINING_SUMMARY,
  TokenomicsActions.GET_PRE_STAKING_SUMMARY,
  TokenomicsActions.GET_RANKING_SUMMARY,
  AccountActions.GET_ACCOUNT,
  StatsActions.GET_ADOPTION,
  ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1'),
];

export const useRefresh = () => {
  const refreshTime = useRef(dayjs().valueOf());
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    const now = dayjs().valueOf();
    if (now - refreshTime.current > HOME_REFRESH_MIN_INTERVAL_SEC * 1000) {
      refreshTime.current = now;

      setRefreshing(true);

      REFRESH_ACTIONS.forEach(action => {
        dispatch(action.START.create());
      });
    }
  };

  const isManualUpdateLoading = useSelector((state: RootState) => {
    return !!REFRESH_ACTIONS.find(action => isLoadingSelector(action, state));
  });

  useEffect(() => {
    if (refreshing && !isManualUpdateLoading) {
      setRefreshing(false);
    }
  }, [isManualUpdateLoading, refreshing]);

  return {onRefresh, refreshing};
};
