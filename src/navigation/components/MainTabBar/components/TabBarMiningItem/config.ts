// SPDX-License-Identifier: BUSL-1.1

import {LocalAudio} from '@audio';
import {MINING_LONG_PRESS_ACTIVATION_SEC} from '@constants/timeouts';
import {LottieAnimations} from '@lottie';
import {t} from '@translations/i18n';
import {AnimatedLottieViewProps} from 'lottie-react-native';

type MiningState =
  | 'inactive'
  | 'active'
  | 'restart'
  | 'expire'
  | 'holidayActive'
  | 'holidayRestart'
  | 'holidayExpire';

export const MiningStateConfig: {
  [key in MiningState]: {
    animation: AnimatedLottieViewProps['source'];
    tooltip?: string;
    showModalTooltip?: boolean;
    longPressActivation?: boolean;
    audio?: string;
  };
} = {
  inactive: {
    animation: LottieAnimations.miningInactive,
    tooltip: t('tabbar.mining_inactive_tooltip'),
    audio: LocalAudio.startMining,
  },
  active: {
    animation: LottieAnimations.miningActive,
    showModalTooltip: true,
    audio: LocalAudio.startMining,
  },
  restart: {
    animation: LottieAnimations.miningRestart,
    tooltip: t('tabbar.mining_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    longPressActivation: true,
    audio: LocalAudio.extendMining,
  },
  expire: {
    animation: LottieAnimations.miningExpire,
    tooltip: t('tabbar.mining_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    longPressActivation: true,
    audio: LocalAudio.extendMining,
  },
  holidayActive: {
    animation: LottieAnimations.miningHolidayActive,
    tooltip: t('tabbar.mining_holiday_active'),
    audio: LocalAudio.startMining,
  },
  holidayRestart: {
    animation: LottieAnimations.miningHolidayRestart,
    tooltip: t('tabbar.mining_holiday_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    longPressActivation: true,
    audio: LocalAudio.extendMining,
  },
  holidayExpire: {
    animation: LottieAnimations.miningHolidayExpire,
    tooltip: t('tabbar.mining_holiday_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    longPressActivation: true,
    audio: LocalAudio.extendMining,
  },
};

export const MiningStateSequence = Object.keys(
  MiningStateConfig,
) as unknown as (keyof typeof MiningStateConfig)[];
