// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountReducer} from '@store/modules/Account/reducer';
import {appCommonReducer} from '@store/modules/AppCommon/reducer';
import {collectionsReducer} from '@store/modules/Collections/reducer';
import {teamReducer} from '@store/modules/Contacts/reducer';
import {devicesReducer} from '@store/modules/Devices/reducer';
import {economyReducer} from '@store/modules/Economy/reducer';
import {linkingReducer} from '@store/modules/Linking/reducer';
import {newsReducer} from '@store/modules/News/reducer';
import {notificationsReducer} from '@store/modules/Notifications/reducer';
import {permissionsReducer} from '@store/modules/Permissions/reducer';
import {referralsReducer} from '@store/modules/Referrals/reducer';
import {statsReducer} from '@store/modules/Stats/reducer';
import {usersReducer} from '@store/modules/Users/reducer';
import {processStatusesReducer} from '@store/modules/UtilityProcessStatuses/reducer';
import {validationReducer} from '@store/modules/Validation/reducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: [],
};

const rootReducer = combineReducers({
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
  economy: economyReducer,
  linking: linkingReducer,
  notifications: notificationsReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistedRootReducer = persistReducer(persistConfig, rootReducer);
