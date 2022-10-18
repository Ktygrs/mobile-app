// SPDX-License-Identifier: BUSL-1.1

import {AuthActions} from '@store/modules/Auth/actions';
import {temporaryEmailSelector} from '@store/modules/Validation/selectors';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const RESEND_TIMEOUT_SEC = 30;

export const useResendCode = () => {
  const dispatch = useDispatch();
  const lastResendTime = useRef(Date.now());
  const email = useSelector(temporaryEmailSelector);
  const [resendTimeout, setResendTimeout] = useState(RESEND_TIMEOUT_SEC);
  const [resendAvailable, setResendAvailalbe] = useState(false);

  useEffect(() => {
    if (!resendAvailable) {
      const interval = setInterval(() => {
        const secondsPassed = Math.round(
          (Date.now() - lastResendTime.current) / 1000,
        );
        const secondsLeft = RESEND_TIMEOUT_SEC - secondsPassed;
        setResendTimeout(secondsLeft);
        if (secondsLeft < 0) {
          setResendAvailalbe(true);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendAvailable]);

  const resend = () => {
    lastResendTime.current = Date.now();
    setResendAvailalbe(false);
    dispatch(AuthActions.UPDATE_ACCOUNT.START.create({email}));
  };

  return {
    resend,
    resendAvailable,
    resendTimeout,
  };
};
