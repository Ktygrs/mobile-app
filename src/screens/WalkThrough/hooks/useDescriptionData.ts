// SPDX-License-Identifier: BUSL-1.1

import {DescriptionRenderData} from '@screens/WalkThrough/types';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {useMemo} from 'react';

type Props = {
  stepData: WalkThroughStep | undefined;
};

export function useDescriptionData({stepData}: Props) {
  return useMemo(() => {
    if (!stepData) {
      return {descriptionData: []};
    }

    const {description, link} = stepData;
    const descriptionArray = description.split('[[:ice]]');
    const descriptionData: DescriptionRenderData[] = [];
    const lastIndex = descriptionArray.length - 1;
    descriptionArray.forEach((value: string, index: number) => {
      descriptionData.push({
        type: 'text',
        value,
      });
      if (index !== lastIndex) {
        descriptionData.push({
          type: 'ice',
        });
      }
    });
    if (link) {
      descriptionData.push({type: 'url', value: link});
    }
    return {descriptionData};
  }, [stepData]);
}
