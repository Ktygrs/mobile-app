// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {DescriptionRenderData} from '@screens/WalkThrough/types';
import {getStepData} from '@store/modules/WalkThrough/selectors/utils';
import {useMemo} from 'react';

type Props = {
  step: number;
  walkThroughType: WalkThroughType;
};

export function useDescriptionData({step, walkThroughType}: Props) {
  const {description, link} = getStepData({
    walkThroughType,
    step,
  });
  return useMemo(() => {
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
    if (link) {
      renderData.push({type: 'url', value: link});
    }
    return renderData;
  }, [description, link]);
}
