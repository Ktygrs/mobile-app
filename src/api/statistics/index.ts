// SPDX-License-Identifier: BUSL-1.1

import {getTopCountries} from './getTopCountries';
import {getTopMiners} from './getTopMiners';
import {getUserGrowth} from './getUserGrowth';

export const statistics = Object.freeze({
  getTopCountries,
  getTopMiners,
  getUserGrowth,
});
