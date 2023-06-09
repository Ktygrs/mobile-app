// SPDX-License-Identifier: BUSL-1.1

import {ReferralHistoryRecord} from '@api/referrals/types';
import {ReferralType, User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {CollectionActions} from '@store/modules/Collections';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import produce from 'immer';

export interface State {
  users: {
    [userId: string]: User;
  };
  data: {
    [key in ReferralType]?: {
      active: number;
      total: number;
      referrals: string[];
    };
  };
  history: ReferralHistoryRecord[];
}

const getReferralsActionCreator = ReferralsActions.GET_REFERRALS({})(null);
const actionCreatorPingReferral = ReferralsActions.PING_REFERRAL(null);
type Actions = ReturnType<
  | typeof CollectionActions.SEARCH_USERS.SUCCESS.create
  | typeof getReferralsActionCreator.SUCCESS.create
  | typeof actionCreatorPingReferral.SUCCESS.create
  | typeof actionCreatorPingReferral.FAILED.create
  | typeof ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  users: {},
  data: {},
  history: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case CollectionActions.SEARCH_USERS.SUCCESS.type:
        {
          const {result} = action.payload;

          draft.users = {
            ...draft.users,
            ...result.reduce<{
              [userId: string]: User;
            }>((usersByIds, user) => {
              usersByIds[user.id] = user;
              return usersByIds;
            }, {}),
          };
        }
        break;

      case getReferralsActionCreator.SUCCESS.type:
        {
          const {referralType, offset, result} = action.payload;

          const userIds: string[] = [];
          const usersByIds: {
            [userId: string]: User;
          } = {};

          result.referrals.forEach(user => {
            usersByIds[user.id] = user;
            userIds.push(user.id);
          });

          draft.users = {
            ...draft.users,
            ...usersByIds,
          };

          if (offset === 0) {
            draft.data[referralType] = {
              ...result,
              referrals: userIds,
            };
          } else {
            draft.data[referralType] = {
              ...result,
              referrals: [
                ...(state.data[referralType]?.referrals ?? []),
                ...userIds,
              ],
            };
          }
        }
        break;

      case ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.type:
        draft.history = action.payload.history;
        break;

      case ReferralsActions.PING_REFERRAL(null).SUCCESS.type:
      case ReferralsActions.PING_REFERRAL(null).FAILED.type:
        {
          const {userId} = action.payload;

          draft.users[userId].pinged = true;
        }
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
        };
    }
  });
}

export const referralsReducer = reducer;
