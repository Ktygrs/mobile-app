// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';

export type WalkThroughElementData = {
  topPositionOfHighlightedElement: number;
  renderStepHighlight: () => React.ReactNode;
  icon?: React.ReactNode;
};

export type WalkThroughStepStaticData = {
  version: number;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
};

export interface WalkThroughStep extends WalkThroughStepStaticData {
  elementData?: WalkThroughElementData;
}

export type WalkThroughSteps = {
  news: {
    a1: WalkThroughStep;
    a2: WalkThroughStep;
  };
  team: {
    allowContactsButton: WalkThroughStep;
    referrals: WalkThroughStep;
    a3: WalkThroughStep;
    contacts: WalkThroughStep;
    tierone: WalkThroughStep;
    tiertwo: WalkThroughStep;
    a7: WalkThroughStep;
    a8: WalkThroughStep;
    a9: WalkThroughStep;
  };
  home: {};
};
