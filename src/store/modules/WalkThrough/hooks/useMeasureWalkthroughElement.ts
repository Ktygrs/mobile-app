// SPDX-License-Identifier: BUSL-1.1

import {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';

export const useMeasureWalkthroughElement = () => {
  const [elementData, setElementData] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();
  const elementRef = useRef<View>(null);

  const measureElement = useCallback(() => {
    elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setElementData({x, y, width, height, pageY, pageX});
    });
  }, []);

  return {
    elementRef,
    elementData,
    measureElement,
  };
};
