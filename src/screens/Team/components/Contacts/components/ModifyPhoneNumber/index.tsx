// SPDX-License-Identifier: BUSL-1.1

import {ModifyPhoneNumberForm} from '@components/Forms/ModifyPhoneNumberForm';
import {temporaryPhoneNumberSelector} from '@store/modules/Validation/selectors';
import {getCountryByPhoneNumber} from '@utils/phoneNumber';
import React from 'react';
import {useSelector} from 'react-redux';

export const ModifyPhoneNumber = () => {
  const temporaryPhoneNumber = useSelector(temporaryPhoneNumberSelector);

  const countryByPhoneNumber = getCountryByPhoneNumber(temporaryPhoneNumber);

  return (
    <ModifyPhoneNumberForm
      initialPhoneNumber={countryByPhoneNumber?.nationalNumber}
      selectedCountry={countryByPhoneNumber?.country}
    />
  );
};
