// SPDX-License-Identifier: BUSL-1.1

import {logError} from '@services/logging';
import Sound from 'react-native-sound';

export const playLocalAudio = (audio: string) => {
  const sound = new Sound(audio, Sound.MAIN_BUNDLE, error => {
    if (error) {
      logError(error);
      return;
    }
    sound.play();
  });
};
