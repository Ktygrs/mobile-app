// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {useCallback} from 'react';

type Props = {
  children: React.ReactNode;
};

export type WalkThroughData = {
  top: number;
  version: number;
  renderStepHighlight: () => React.ReactNode;
  icon?: React.ReactNode;
  onNext?: () => void;
};

type WalkThroughContextType = {
  getStepData: (step: number) => WalkThroughData | null;
  addStepData: ({
    step,
    stepData,
  }: {
    step: number;
    stepData: WalkThroughData;
  }) => void;
};

const defaultWalkThroughContext: WalkThroughContextType = {
  getStepData: () => ({top: 0, version: 1, renderStepHighlight: () => null}),
  addStepData: () => {},
};

export const WalkThroughContext = React.createContext<WalkThroughContextType>(
  defaultWalkThroughContext,
);

export function WalkThroughContextProvider({children}: Props) {
  const [stepsData, setStepsData] = React.useState<WalkThroughData[]>([]);

  const getStepData = useCallback(
    (step: number) => {
      return stepsData[step];
    },
    [stepsData],
  );

  const addStepData = useCallback(
    ({step, stepData}: {step: number; stepData: WalkThroughData}) => {
      setStepsData(data => {
        const newData = [...data];
        newData[step] = stepData;
        return newData;
      });
    },
    [],
  );

  const state = {
    getStepData,
    addStepData,
  };

  return (
    <WalkThroughContext.Provider value={state}>
      {children}
    </WalkThroughContext.Provider>
  );
}
