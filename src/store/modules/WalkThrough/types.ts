// SPDX-License-Identifier: BUSL-1.1

import {ReactNode, RefObject} from 'react';
import {View} from 'react-native';

export type ElementMeasurements = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

export type WalkThroughElementData = {
  getRef: () => RefObject<View> | null;
  getTop: (measurements: ElementMeasurements) => number;
  render: (measurements: ElementMeasurements) => ReactNode;
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
