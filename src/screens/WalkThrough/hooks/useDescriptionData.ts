// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {DescriptionRenderData} from '@screens/WalkThrough/types';
import {t} from '@translations/i18n';
import {useMemo} from 'react';

type Props = {
  step: number;
  walkThroughType: WalkThroughType;
};

export function useDescriptionData({step, walkThroughType}: Props) {
  return useMemo(() => {
    const description = t(
      `walkthrough.${walkThroughType}.step_${step}.description`,
    );
    const url = t(`walkthrough.${walkThroughType}.step_${step}.url`, {
      defaultValue: '',
    });
    const descriptionArray = description.split('[[:ice]]');
    const renderData: DescriptionRenderData[] = [];
    const lastIndex = descriptionArray.length - 1;
    descriptionArray.forEach((value: string, index: number) => {
      renderData.push({
        type: 'text',
        value,
      });
      if (index !== lastIndex) {
        renderData.push({
          type: 'ice',
        });
      }
    });
    if (url) {
      renderData.push({type: 'url', value: url});
    }
    return renderData;
  }, [walkThroughType, step]);
}
