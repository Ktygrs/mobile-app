// SPDX-License-Identifier: BUSL-1.1

import {HiddenProfileElement, User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useDispatch, useSelector} from 'react-redux';

export const useUpdateHiddenProfileElements = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;

  const loading = useSelector(
    isLoadingSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );

  const updateHiddenProfileElement = (
    currentUser: User,
    typeToUpdate: HiddenProfileElement,
  ) => {
    const hiddenElements = currentUser?.hiddenProfileElements ?? [];
    const alreadyHidden = hiddenElements.includes(typeToUpdate);
    let elementsToUpdate: HiddenProfileElement[] = [...hiddenElements];
    if (alreadyHidden) {
      elementsToUpdate = hiddenElements.filter(
        element => element !== typeToUpdate,
      );
    } else {
      elementsToUpdate.push(typeToUpdate);
    }

    dispatch(
      AuthActions.UPDATE_ACCOUNT.START.create(
        {
          hiddenProfileElements: elementsToUpdate,
        },
        function* (freshUser) {
          const freshUserHiddenElements =
            freshUser?.hiddenProfileElements ?? [];

          const alreadyHiddenInFreshUser =
            freshUserHiddenElements.includes(typeToUpdate);

          if (alreadyHidden && !alreadyHiddenInFreshUser) {
            updateHiddenProfileElement(freshUser, typeToUpdate);
          }

          return {retry: false};
        },
      ),
    );
  };

  const onUpdate = (typeToUpdate: HiddenProfileElement) =>
    updateHiddenProfileElement(user, typeToUpdate);

  return {onUpdate, loading};
};
