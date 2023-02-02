// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {t} from '@translations/i18n';

export const openConfirmResurrectYes = () => {
  let resultResolve: (value: 'yes' | 'no') => void;
  const resultPromise = new Promise<'yes' | 'no'>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    params: {
      image: Images.popUp.resurrection,
      title: t('pop_up.please_confirm'),
      message: t('pop_up.resurrection_yes_confirm_message'),
      buttons: [
        {
          label: t('button.cancel'),
          preset: 'outlined',
          onPress: () => resultResolve('no'),
        },
        {
          label: t('button.confirm'),
          onPress: () => resultResolve('yes'),
        },
      ],
    },
  });

  return resultPromise;
};