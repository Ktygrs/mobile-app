// SPDX-License-Identifier: BUSL-1.1

import {achievements} from './achievements';
import {devices} from './devices';
import {news} from './news';
import {notifications} from './notifications';
import {referrals} from './referrals';
import {statistics} from './statistics';
import {tokenomics} from './tokenomics';
import {user} from './user';
import {validations} from './validations';

export const Api = Object.freeze({
  user,
  statistics,
  referrals,
  validations,
  devices,
  tokenomics,
  news,
  notifications,
  achievements,
});
