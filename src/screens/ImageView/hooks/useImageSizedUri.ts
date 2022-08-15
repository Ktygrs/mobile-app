// SPDX-License-Identifier: BUSL-1.1

import {FULL_SCREEN_IMAGE_SIZE} from '@constants/images';
import {getImageUriForSize} from '@utils/file';
import {useEffect, useState} from 'react';
import {Image} from 'react-native';

export const useImageSizedUri = (uri: string, initialSize: number) => {
  const [imageUri, setImageUri] = useState(
    getImageUriForSize(uri, {width: initialSize}),
  );

  useEffect(() => {
    const fullScreeUri = getImageUriForSize(uri, {
      width: FULL_SCREEN_IMAGE_SIZE,
    });
    Image.prefetch(fullScreeUri).then(() => setImageUri(fullScreeUri));
  }, [uri]);

  return {imageUri};
};
