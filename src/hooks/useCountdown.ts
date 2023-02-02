// SPDX-License-Identifier: BUSL-1.1

import {Duration} from 'dayjs/plugin/duration';
import {useEffect, useRef, useState} from 'react';

export const useCountdown = (duration: Duration) => {
  const initialized = useRef(false);
  const [durationLeft, setDurationLeft] = useState<Duration>(duration.clone());
  const isCountdownOver = durationLeft.asMilliseconds() <= 0;

  useEffect(() => {
    if (initialized.current) {
      setDurationLeft(duration.clone());
    } else {
      initialized.current = true;
    }
  }, [duration]);

  useEffect(() => {
    if (!isCountdownOver) {
      const interval = setInterval(() => {
        setDurationLeft(left => left.subtract(1, 's'));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountdownOver]);

  return {durationLeft, isCountdownOver};
};
