// SPDX-License-Identifier: BUSL-1.1

import {
  ScrollEventHandlerCallbackType,
  ScrollEventsHandlersHookType,
  useScrollEventsHandlersDefault,
} from '@gorhom/bottom-sheet';
import {ScrollEventContextType} from '@gorhom/bottom-sheet/lib/typescript/hooks/useScrollEventsHandlersDefault';
import {
  SharedValue,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';

export const useScrollEventsHandlersCustom: () => {
  useDefaultHook: ScrollEventsHandlersHookType;
  scrollY: SharedValue<number>;
} = () => {
  const scrollY = useSharedValue(0);

  return {
    useDefaultHook: (scrollableRef, scrollableContentOffsetY) => {
      const {handleOnScroll, ...rest} = useScrollEventsHandlersDefault(
        scrollableRef,
        scrollableContentOffsetY,
      );

      const handleOnScrollCustom: ScrollEventHandlerCallbackType<ScrollEventContextType> =
        useWorkletCallback(
          (event, ctx) => {
            scrollY.value = event.contentOffset.y;
            handleOnScroll?.(event, ctx);
          },
          [handleOnScroll, scrollY],
        );

      return {
        ...rest,
        handleOnScroll: handleOnScrollCustom,
      };
    },
    scrollY,
  };
};
