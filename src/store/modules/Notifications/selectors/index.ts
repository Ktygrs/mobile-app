// SPDX-License-Identifier: BUSL-1.1

import {Activity, ActivitySection} from '@api/notifications/types';
import {orderDataBySections} from '@screens/Notifications/helpers';
import {RootState} from '@store/rootReducer';
import {createSelector} from 'reselect';

export const hasMoreToLoadSelector = (state: RootState) =>
  state.notifications.hasMore;

export const notificationsByIdsSelector = (state: RootState) =>
  state.notifications.items;

export const notificationsCountSelector = (state: RootState) => {
  return Object.keys(state.notifications.items).length;
};

export const getNotificationsListDataSelector = createSelector(
  [notificationsByIdsSelector],
  (
    items,
  ): ActivitySection &
    {
      data: Activity[];
    }[] => {
    const allActivities = Object.values(items);
    return orderDataBySections(allActivities);
  },
);
