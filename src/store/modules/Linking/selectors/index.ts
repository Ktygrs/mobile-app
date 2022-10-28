// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const handledUrlSelector = (state: RootState) =>
  state.linking.handledUrl;
