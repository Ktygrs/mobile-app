// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {stopPropagation} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {PopUpButton} from '@screens/Modals/PopUp/components/PopUpButton';
import {Title} from '@screens/Modals/PopUp/components/Title';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export type JoinTelegramPopUpProps = {
  dismissOnOutsideTouch?: boolean;
  dismissOnButtonPress?: boolean;
  dismissOnAndroidHardwareBack?: boolean;
  onDismiss?: () => void;
};

export const JoinTelegramPopUp = () => {
  const {
    params: {
      dismissOnOutsideTouch = true,
      dismissOnButtonPress = true,
      dismissOnAndroidHardwareBack = true,
      onDismiss,
    },
  } = useRoute<RouteProp<MainStackParamList, 'JoinTelegramPopUp'>>();
  const navigation = useNavigation();
  const isKeyboardShown = useIsKeyboardShown();
  const [text, setText] = useState('@');
  const dispatch = useDispatch();

  const onPressOutside = () => {
    if (dismissOnOutsideTouch) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      () => !dismissOnAndroidHardwareBack,
    );
    return () => backHandler.remove();
  }, [dismissOnAndroidHardwareBack, onDismiss]);

  useEffect(() => () => onDismiss?.());

  const onChangeText = (inputText: string) => {
    if (inputText === '') {
      setText('@');
    } else if (!inputText.startsWith('@')) {
      setText(`@${inputText}`);
    } else {
      setText(inputText);
    }
  };

  const handleConfirmation = () => {
    /** TODO: achievements: replace with update account call when api is connected
     * call completeJoinTelegramAchievementSaga on UPDATE_ACCOUNT.SUCCESS
     */

    dispatch(AchievementsActions.COMPLETE_NEXT_ACHIEVEMENT.STATE.create());
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={onPressOutside}>
      <View style={[styles.background]}>
        <View
          style={[
            styles.container,
            isKeyboardShown ? {marginTop: -rem(150)} : {},
          ]}
          {...stopPropagation}>
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={Images.popUp.telegram}
          />
          <Title text={t('home.achievements.popup.title')} />
          <Message text={t('home.achievements.popup.description')} />

          <CommonInput
            label={t('home.achievements.popup.placeholder')}
            onChangeText={onChangeText}
            icon={
              <ManIcon
                color={COLORS.secondary}
                width={rem(16)}
                height={rem(16)}
              />
            }
            value={text}
            containerStyle={styles.textInputStyle}
          />

          <View style={styles.buttons}>
            <PopUpButton
              text={t('button.cancel')}
              preset="outlined"
              onPress={() => {
                if (dismissOnButtonPress) {
                  navigation.goBack();
                }
              }}
            />
            <PopUpButton
              text={t('button.confirm')}
              onPress={handleConfirmation}
              disabled={text.length < 2}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    paddingBottom: rem(25),
    paddingTop: rem(30),
    alignItems: 'center',
  },
  image: {
    width: rem(54),
    height: rem(54),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(15),
    justifyContent: 'center',
  },
  textInputStyle: {
    marginHorizontal: rem(20),
    marginTop: rem(20),
  },
});
