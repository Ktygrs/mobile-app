// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const isMiningTooltipSeenSelector = (state: RootState) =>
  state.economy.isMiningTooltipSeen;
