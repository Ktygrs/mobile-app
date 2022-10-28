// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const HANDLE_URL = createAction('HANDLE_URL', {
  STATE: (urlToParse: string) => ({urlToParse}),
});

export const LinkingActions = Object.freeze({
  HANDLE_URL,
});
