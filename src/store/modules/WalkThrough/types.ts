// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';

export type WalkThroughElementData = {
  topPositionOfHighlightedElement: number;
  renderStepHighlight: () => React.ReactNode;
};

export type WalkthroughStepKey =
  | 'allowContacts'
  | 'confirmPhone'
  | 'contactsList'
  | 'referrals'
  | 'earnings'
  | 'contacts'
  | 'tierone'
  | 'tiertwo'
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
  before?: () => void;
  after?: () => void;
};

export interface WalkThroughStep extends WalkThroughStepStaticData {
  elementData?: WalkThroughElementData;
}
