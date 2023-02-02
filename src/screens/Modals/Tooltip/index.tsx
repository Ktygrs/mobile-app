// SPDX-License-Identifier: BUSL-1.1

import {stopPropagation} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {windowHeight} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Connector} from '@screens/Modals/Tooltip/assets/svg/Connector';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {rem} from 'rn-units';

export const Tooltip = () => {
  const navigation = useNavigation();
  const {
    params: {
      position,
      targetRef,
      TargetComponent,
      DescriptionComponent,
      targetCircleSize = rem(60),
      descriptionOffset = rem(40),
    },
  } = useRoute<RouteProp<MainStackParamList, 'Tooltip'>>();

  const [targetData, setTargetData] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    targetRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      // measure might return undefined values e.g. when underlying view is removed by android (removeClippedSubviews)
      if (pageX && pageY && width && height) {
        setTargetData({x: pageX, y: pageY, width, height});
      }
    });
  }, [targetRef]);

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.container}>
        {targetData && (
          <>
            <View
              {...stopPropagation}
              style={[
                styles.target,
                {
                  top: targetData.y,
                  left: targetData.x,
                  width: targetData.width,
                },
              ]}>
              {targetCircleSize && (
                <View
                  style={[
                    styles.targetCircle,
                    {
                      width: targetCircleSize,
                      height: targetCircleSize,
                      borderRadius: targetCircleSize / 2,
                    },
                  ]}>
                  <Connector
                    style={[
                      styles.connector,
                      position === 'below'
                        ? {bottom: -descriptionOffset}
                        : {top: -descriptionOffset},
                    ]}
                    height={descriptionOffset * 1.125}
                    width={descriptionOffset * 2}
                    color={COLORS.white}
                  />
                </View>
              )}
              <TargetComponent />
            </View>
            {targetData && (
              <View
                {...stopPropagation}
                style={[
                  styles.description,
                  position === 'below'
                    ? {
                        top:
                          targetData.y +
                          targetData.height +
                          (targetCircleSize - targetData.height) / 2 +
                          descriptionOffset,
                      }
                    : {
                        bottom:
                          windowHeight -
                          targetData.y +
                          (targetCircleSize - targetData.height) / 2 +
                          descriptionOffset,
                      },
                ]}>
                <DescriptionComponent />
              </View>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
  target: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetCircle: {
    position: 'absolute',
    backgroundColor: COLORS.white,
  },
  description: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  connector: {
    position: 'absolute',
    alignSelf: 'center',
  },
});