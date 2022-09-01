// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const STORE_MINIG_TOOLTIP_SEEN = createAction('STORE_MINIG_TOOLTIP_SEEN', {
  STATE: () => {},
});

export const EconomyActions = Object.freeze({
  STORE_MINIG_TOOLTIP_SEEN,
});
