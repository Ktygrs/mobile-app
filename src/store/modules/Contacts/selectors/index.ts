// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const contactsSelector = (state: RootState) => state.team.contacts;
