// SPDX-License-Identifier: BUSL-1.1

import {accountReducer} from '@store/modules/Account/reducer';
import {appCommonReducer} from '@store/modules/AppCommon/reducer';
import {collectionsReducer} from '@store/modules/Collections/reducer';
import {teamReducer} from '@store/modules/Contacts/reducer';
import {devicesReducer} from '@store/modules/Devices/reducer';
import {linkingReducer} from '@store/modules/Linking/reducer';
import {newsReducer} from '@store/modules/News/reducer';
import {notificationsReducer} from '@store/modules/Notifications/reducer';
import {permissionsReducer} from '@store/modules/Permissions/reducer';
import {referralsReducer} from '@store/modules/Referrals/reducer';
import {statsReducer} from '@store/modules/Stats/reducer';
import {tokenomicsReducer} from '@store/modules/Tokenomics/reducer';
import {usersReducer} from '@store/modules/Users/reducer';
import {processStatusesReducer} from '@store/modules/UtilityProcessStatuses/reducer';
import {validationReducer} from '@store/modules/Validation/reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  appCommon: appCommonReducer,
  permissions: permissionsReducer,
  account: accountReducer,
  stats: statsReducer,
  news: newsReducer,
  team: teamReducer,
  validation: validationReducer,
  collections: collectionsReducer,
  referrals: referralsReducer,
  utilityProcessStatuses: processStatusesReducer,
  devices: devicesReducer,
  linking: linkingReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  tokenomics: tokenomicsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
