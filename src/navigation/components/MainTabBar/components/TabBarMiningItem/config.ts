// SPDX-License-Identifier: BUSL-1.1

import {LocalAudio} from '@audio';
import {MINING_LONG_PRESS_ACTIVATION_SEC} from '@constants/timeouts';
import {LottieAnimations} from '@lottie';
import {loadLocalAudio} from '@services/audio';
import {MiningState} from '@store/modules/Tokenomics/types';
import {t} from '@translations/i18n';
import {AnimatedLottieViewProps} from 'lottie-react-native';

type GestureConfig = {
  showStackingModal?: boolean;
  startMining?: boolean;
  audioFeedback?: ReturnType<typeof loadLocalAudio>;
  hapticFeedback?: boolean;
};

export const MiningButtonConfig: {
  [key in MiningState]: {
    animation: AnimatedLottieViewProps['source'];
    tooltip?: string;
    showStackingModalOnTransition?: boolean;
    onTap?: GestureConfig;
    onLongPress?: GestureConfig;
  };
} = {
  inactive: {
    animation: LottieAnimations.miningInactive,
    tooltip: t('tabbar.mining_inactive_tooltip'),
    onTap: {
      startMining: true,
      audioFeedback: loadLocalAudio(LocalAudio.startMining),
      hapticFeedback: true,
    },
  },
  active: {
    animation: LottieAnimations.miningActive,
    showStackingModalOnTransition: true,
    onTap: {
      showStackingModal: true,
    },
  },
  restart: {
    animation: LottieAnimations.miningRestart,
    tooltip: t('tabbar.mining_reset_tooltip'),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
      audioFeedback: loadLocalAudio(LocalAudio.extendMining),
      hapticFeedback: true,
    },
  },
  expire: {
    animation: LottieAnimations.miningExpire,
    tooltip: t('tabbar.mining_reset_tooltip'),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
      audioFeedback: loadLocalAudio(LocalAudio.extendMining),
      hapticFeedback: true,
    },
  },
  holidayActive: {
    animation: LottieAnimations.miningHolidayActive,
    tooltip: t('tabbar.mining_holiday_active'),
    showStackingModalOnTransition: true,
    onTap: {
      showStackingModal: true,
    },
  },
  holidayRestart: {
    animation: LottieAnimations.miningHolidayRestart,
    tooltip: t('tabbar.mining_holiday_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
      audioFeedback: loadLocalAudio(LocalAudio.extendMining),
      hapticFeedback: true,
    },
  },
  holidayExpire: {
    animation: LottieAnimations.miningHolidayExpire,
    tooltip: t('tabbar.mining_holiday_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
      audioFeedback: loadLocalAudio(LocalAudio.extendMining),
      hapticFeedback: true,
    },
  },
};
