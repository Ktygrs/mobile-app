// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {ResurrectResponseType} from '@store/modules/Analytics/types';
import {createAction} from '@store/utils/actions/createAction';

const UPDATE_RESURRECT_RESPONSE_TYPE = createAction(
  'UPDATE_RESURRECT_RESPONSE_TYPE',
  {
    START: (payload: {resurrectResponseType?: ResurrectResponseType}) =>
      payload,
    SUCCESS: true,
  },
);

const TRACK_SIGN_IN = createAction('TRACK_SIGN_IN', {
  START: (payload: {user: User}) => payload,
  SUCCESS: true,
});

const TRACK_SIGN_UP = createAction('TRACK_SIGN_UP', {
  START: (payload: {user: User}) => payload,
  SUCCESS: true,
});

const UPDATE_REFERRED_BY = createAction('UPDATE_REFERRED_BY', {
  START: (payload: {referredBy?: string}) => payload,
  SUCCESS: (payload: {referredBy: string}) => payload,
});

export const AnalyticsActions = Object.freeze({
  UPDATE_RESURRECT_RESPONSE_TYPE,
  UPDATE_REFERRED_BY,
  TRACK_SIGN_IN,
  TRACK_SIGN_UP,
});
