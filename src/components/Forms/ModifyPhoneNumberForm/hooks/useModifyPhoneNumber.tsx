// SPDX-License-Identifier: BUSL-1.1

import {Country} from '@constants/countries';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {smsSentTimestampSelector} from '@store/modules/Validation/selectors';
import {e164PhoneNumber} from '@utils/phoneNumber';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  initialPhoneNumber?: string | null;
  selectedCountry?: Country | null;
};

export const useModifyPhoneNumber = ({
  initialPhoneNumber,
  selectedCountry,
}: Props) => {
  const dispatch = useDispatch();
  const [phoneNumberBody, setPhoneNumberBody] = useState(
    initialPhoneNumber ?? '',
  );
  const fullPhoneRef = useRef('');

  const modifyPhoneFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const isModifyPhoneLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const smsSentTimestamp = useSelector(smsSentTimestampSelector);

  const modifyPhoneNumber = () =>
    dispatch(
      AccountActions.UPDATE_ACCOUNT.START.create({
        phoneNumber: e164PhoneNumber(
          fullPhoneRef.current ||
            `${selectedCountry?.iddCode ?? ''}${initialPhoneNumber ?? ''}`,
        ),
      }),
    );

  const onChangePhone = (phoneBody: string, iddCode: string) => {
    setPhoneNumberBody(phoneBody);
    fullPhoneRef.current = `${iddCode}${phoneBody}`;
  };

  // clean up on component unmount
  useEffect(
    () => () => {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    },
    [dispatch],
  );

  return {
    phoneNumberBody,
    onChangePhone,
    modifyPhoneNumber,
    isModifyPhoneLoading,
    modifyPhoneFailedReason,
    smsSentTimestamp,
  };
};
