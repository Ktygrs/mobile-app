// SPDX-License-Identifier: BUSL-1.1

import {logError} from '@services/logging';
import Sound from 'react-native-sound';

const loadedAudio: {[path: string]: Promise<Sound>} = {};

export const playLocalAudio = async (audioPath: string) => {
  const sound = await loadLocalAudio(audioPath);
  return new Promise(resolve => sound.play(resolve));
};

export const loadLocalAudio = (audioPath: string) => {
  if (!loadedAudio[audioPath]) {
    loadedAudio[audioPath] = new Promise((resolve, reject) => {
      const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          logError(error);
          reject(error);
        } else {
          resolve(sound);
        }
      });
    });
  }
  return loadedAudio[audioPath];
};
