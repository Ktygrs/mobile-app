// SPDX-License-Identifier: BUSL-1.1

import {SMS_EMAIL_RESEND_TIMEOUT_SEC} from '@constants/timeouts';
import {dayjs} from '@services/dayjs';
import {useCallback, useEffect, useState} from 'react';

type Params = {
  lastSendTimestamp: number | null;
};

export const useResend = ({lastSendTimestamp}: Params) => {
  const getSecondsToResend = useCallback(() => {
    return lastSendTimestamp
      ? SMS_EMAIL_RESEND_TIMEOUT_SEC - dayjs().diff(lastSendTimestamp, 'second')
      : 0;
  }, [lastSendTimestamp]);

  const [resendTimeout, setResendTimeout] = useState(getSecondsToResend());
  const [resendAvailable, setResendAvailalbe] = useState(resendTimeout <= 0);

  const calculateResend = useCallback(() => {
    const secondsToResend = getSecondsToResend();
    if (secondsToResend <= 0 && !resendAvailable) {
      setResendAvailalbe(true);
    } else if (secondsToResend > 0 && resendAvailable) {
      setResendAvailalbe(false);
    }
    setResendTimeout(secondsToResend);
  }, [getSecondsToResend, resendAvailable]);

  useEffect(() => {
    calculateResend();
    if (!resendAvailable) {
      const interval = setInterval(calculateResend, 1000);
      return () => clearInterval(interval);
    }
  }, [resendAvailable, calculateResend]);

  return {
    resendAvailable,
    resendTimeout,
  };
};
