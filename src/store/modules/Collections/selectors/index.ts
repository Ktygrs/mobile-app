// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const collectionSelector =
  <T extends keyof RootState['collections']>(key: T) =>
  (state: RootState) =>
    state.collections[key];
