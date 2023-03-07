// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';

export type WalkThroughElementData = {
  top: number;
  render: () => React.ReactNode;
};

export type WalkthroughStepKey =
  | 'allowContacts'
  | 'confirmPhone'
  | 'contactsList'
  | 'referrals'
  | 'earnings'
  | 'segmentedControlTierOne'
  | 'segmentedControlTierTwo'
  | 'activeUsers'
  | 'tierOneEarnings'
  | 'ping';

export type WalkThroughStepStaticData = {
  key: WalkthroughStepKey;
  version: number;
  title: string;
  description: string;
  link?: string;
  Icon?: React.ReactNode;
  circlePosition?: 'top' | 'bottom'; // otherwise automatically
  before?: () => void;
  after?: () => void;
};

export interface WalkThroughStep extends WalkThroughStepStaticData {
  elementData?: WalkThroughElementData;
}
