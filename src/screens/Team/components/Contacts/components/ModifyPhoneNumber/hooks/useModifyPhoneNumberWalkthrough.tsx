// SPDX-License-Identifier: BUSL-1.1

import {UPDATE_ACCOUNT_FIELD_BUTTON_OFFSET} from '@components/Forms/components/UpdateAccountField';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {t} from '@translations/i18n';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const BORDER_RADIUS = rem(20);
const OUTER_VERTICAL_PADDING = rem(16);
const INNER_VERTICAL_PADDING = rem(20);

//TODO:combine with useEarningsWalkthrough
export const useModifyPhoneNumberWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const [elementData, setElementData] = useState<{
    pageY: number;
  }>();
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (elementData) {
      const top =
        elementData.pageY - INNER_VERTICAL_PADDING - OUTER_VERTICAL_PADDING;
      setWalkthroughElementData({
        stepKey: 'confirmPhone',
        elementData: {
          top,
          render: () => (
            <View style={styles.outerContainer}>
              <View style={[styles.innerContainer]} pointerEvents={'none'}>
                <PhoneNumberInput
                  value={''}
                  onChangePhone={() => {}}
                  editable={false}
                />
                <PrimaryButton
                  text={t('confirm_phone.button')}
                  style={styles.button}
                />
              </View>
            </View>
          ),
        },
      });
    }
  }, [elementData, setWalkthroughElementData]);

  const onElementLayout = () => {
    setTimeout(() => {
      elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setElementData({pageY});
      });
    }, 500);
  };

  return {
    elementRef,
    onElementLayout,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    //TODO:set to constants?
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    paddingVertical: OUTER_VERTICAL_PADDING,
    marginLeft: -SCREEN_SIDE_OFFSET / 2,
    marginRight: -SCREEN_SIDE_OFFSET / 2,
  },
  innerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: INNER_VERTICAL_PADDING,
  },
  button: {
    marginTop: UPDATE_ACCOUNT_FIELD_BUTTON_OFFSET,
  },
});
