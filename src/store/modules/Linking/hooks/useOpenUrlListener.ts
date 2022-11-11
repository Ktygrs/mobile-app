// SPDX-License-Identifier: BUSL-1.1

import {LinkingActions} from '@store/modules/Linking/actions';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useDispatch} from 'react-redux';

export const useOpenUrlListener = () => {
  const dispatch = useDispatch();
  Linking.getInitialURL().then(url => {
    if (url) {
      dispatch(LinkingActions.HANDLE_URL.STATE.create(url, true));
    }
  });
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({url}) => {
      dispatch(LinkingActions.HANDLE_URL.STATE.create(url, true));
    });
    return () => subscription.remove();
  }, [dispatch]);
};
