// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {TeamHeaderEarningsIcon} from '@screens/Team/assets/svg/TeamHeaderEarningsIcon';
import {TeamHeaderReferralsIcon} from '@screens/Team/assets/svg/TeamHeaderReferralsIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export enum InfoItemType {
  'referrals',
  'earnings',
}

type InfoItemProps = {
  type: InfoItemType;
};

export function InfoItem({type}: InfoItemProps): React.ReactElement {
  const refsCount = 0; //TODO: get from selectors
  const earningsValue = 121985; //TODO: get from selectors

  const asset = () => {
    switch (type) {
      case InfoItemType.referrals:
        return <TeamHeaderReferralsIcon />;
      case InfoItemType.earnings:
        return <TeamHeaderEarningsIcon />;
    }
  };

  const title = () => {
    switch (type) {
      case InfoItemType.referrals:
        return 'team.header.referrals';
      case InfoItemType.earnings:
        return 'team.header.earnings';
    }
  };

  const value = () => {
    switch (type) {
      case InfoItemType.referrals:
        return <Text style={styles.referrals}>{refsCount}</Text>;
      case InfoItemType.earnings:
        return (
          <Text style={styles.earnings}>
            {earningsValue} <IceLabel iconSize={16} />
          </Text>
        );
    }
  };

  return (
    <View style={styles.container}>
      {asset()}
      <View>
        <Text style={styles.title}>{t(title())}</Text>
        {value()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    marginLeft: rem(8.5),
    ...font(14, null, 'medium'),
  },
  referrals: {
    marginLeft: rem(8.5),
    ...font(22, null, 'semibold'),
  },
  earnings: {
    marginLeft: rem(8.5),
    marginTop: rem(5),
    ...font(14, null, 'medium'),
  },
});
