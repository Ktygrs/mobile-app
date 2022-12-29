// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';

export type WalkThroughData = {
  topPositionOfHighlightedElement: number;
  renderStepHighlight: () => React.ReactNode;
  icon?: React.ReactNode;
  onNext?: () => void;
};
