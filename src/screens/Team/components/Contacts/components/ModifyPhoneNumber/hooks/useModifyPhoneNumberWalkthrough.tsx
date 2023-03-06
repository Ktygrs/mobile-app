// SPDX-License-Identifier: BUSL-1.1

import {UPDATE_ACCOUNT_FIELD_BUTTON_OFFSET} from '@components/Forms/components/UpdateAccountField';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {t} from '@translations/i18n';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const OUTER_CONTAINER_VERTICAL_PADDING = rem(16);
const INNER_CONTAINER_VERTICAL_PADDING = rem(20);

export const useModifyPhoneNumberWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const [elementData, setElementData] = useState<{
    pageY: number;
  }>();
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (elementData) {
      const top =
        elementData.pageY -
        INNER_CONTAINER_VERTICAL_PADDING -
        OUTER_CONTAINER_VERTICAL_PADDING;
      setWalkthroughElementData({
        stepKey: 'confirmPhone',
        elementData: {
          top,
          render: () => (
            <WalkThroughElementContainer
              outerStyle={styles.outerContainer}
              innerStyle={styles.innerContainer}
              pointerEvents={'none'}>
              <PhoneNumberInput
                value={''}
                onChangePhone={() => {}}
                editable={false}
              />
              <PrimaryButton
                text={t('confirm_phone.button')}
                style={styles.button}
              />
            </WalkThroughElementContainer>
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
    paddingVertical: OUTER_CONTAINER_VERTICAL_PADDING,
    marginLeft: -SCREEN_SIDE_OFFSET / 2,
    marginRight: -SCREEN_SIDE_OFFSET / 2,
  },
  innerContainer: {
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: INNER_CONTAINER_VERTICAL_PADDING,
  },
  button: {
    marginTop: UPDATE_ACCOUNT_FIELD_BUTTON_OFFSET,
  },
});
