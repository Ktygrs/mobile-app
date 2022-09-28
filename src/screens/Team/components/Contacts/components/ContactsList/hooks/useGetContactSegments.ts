// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {t} from '@translations/i18n';
import {useEffect, useMemo} from 'react';
import {Contact} from 'react-native-contacts';
import {useSelector} from 'react-redux';

export type ContactSection = {
  id: 'friends' | 'contacts';
  title?: string;
};

export type ContactSectionDataItem =
  | Contact
  | User
  | {element: 'Loading'}
  | {element: 'InviteFriendsButton'}
  | {element: 'Error'; message: string};

export const useGetContactSegments = (focused: boolean) => {
  const contacts = useSelector(contactsSelector);

  const {
    fetch,
    data: referrals,
    error,
    loadNext,
    loadNextLoading,
    hasNext,
    refresh,
    refreshing,
  } = useFetchCollection(
    useMemo(
      () => ({
        selector: referralsSelector({referralType: 'CONTACTS'}),
        action: ReferralsActions.GET_REFERRALS({referralType: 'CONTACTS'})(
          'CONTACTS',
        ),
      }),
      [],
    ),
  );

  useEffect(() => {
    if (focused) {
      fetch({offset: 0});
    }
  }, [fetch, focused]);

  let iceFriends: ContactSectionDataItem[] = [];
  if (!referrals.length) {
    if (error) {
      iceFriends = [{element: 'Error', message: error}];
    } else if (hasNext) {
      iceFriends = [{element: 'Loading'}, {element: 'Loading'}];
    } else {
      iceFriends = [{element: 'InviteFriendsButton'}];
    }
  } else {
    iceFriends = referrals;
  }

  const sections: (ContactSection & {data: ContactSectionDataItem[]})[] = [
    {
      id: 'friends',
      data: iceFriends,
    },
  ];

  /**
   * Populate contacts section only when all the referrals are loaded or were failed to load
   */
  if (!hasNext || error) {
    sections.push({
      id: 'contacts',
      title: t('team.contacts_list.all_contacts'),
      data: contacts,
    });
  }

  return {sections, loadNext, loadNextLoading, refresh, refreshing};
};
