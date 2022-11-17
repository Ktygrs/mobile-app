// SPDX-License-Identifier: BUSL-1.1

import {ReferralHistoryRecord, Referrals} from '@api/referrals/types';
import {ReferralType} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import produce from 'immer';

export interface State {
  data: {
    [userId: string]: {
      [key in ReferralType]?: Referrals;
    };
  };
  history: ReferralHistoryRecord[];
}

const getReferralsActionCreator = ReferralsActions.GET_REFERRALS({})(null);
type Actions = ReturnType<
  | typeof getReferralsActionCreator.SUCCESS.create
  | typeof ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  data: {},
  history: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case getReferralsActionCreator.SUCCESS.type:
        const {userId, referralType, offset, result} = action.payload;
        if (offset === 0) {
          draft.data[userId] = {
            ...state.data[userId],
            [referralType]: result,
          };
        } else {
          draft.data[userId] = {
            ...state.data[userId],
            [referralType]: {
              active: result.active,
              total: result.total,
              referrals: [
                ...(state.data[userId][referralType]?.referrals ?? []),
                ...result.referrals,
              ],
            },
          };
        }
        break;
      case ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.type: {
        draft.history = action.payload.history;
        break;
      }
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const referralsReducer = reducer;
