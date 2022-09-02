// SPDX-License-Identifier: BUSL-1.1

import {SectionHeader} from '@components/SectionHeader';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type TTeamMember = {
  nickname: string;
  isIceMember: boolean;
};
const mockTeamMembers: TTeamMember[] = [
  {nickname: 'mysterioX', isIceMember: true},
  {nickname: 'johnny327', isIceMember: true},
  {nickname: 'MissMistiq', isIceMember: true},
  {nickname: 'thesempeerwwwerr', isIceMember: false},
  {nickname: 'Septiemma', isIceMember: false},
  {nickname: 'Deemer', isIceMember: false},
];

export const Team = memo(() => {
  return (
    <>
      <SectionHeader title="TEAM" action="view team" />
      <FlatList
        horizontal
        data={mockTeamMembers}
        renderItem={renderTeamMember}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.memberContent}
      />
    </>
  );
});

const renderTeamMember = ({item}: {item: TTeamMember}) => {
  return (
    <Touchable style={styles.memberContainer}>
      <View style={styles.memberImage}>
        {item.isIceMember ? (
          <View style={styles.memberIcon}>
            <LogoIcon color={COLORS.white} width={rem(15)} height={rem(15)} />
          </View>
        ) : null}
      </View>

      <Text style={styles.memberNickname} numberOfLines={1}>
        {item.nickname}
      </Text>
    </Touchable>
  );
};
const renderSeparator = () => <View style={styles.separator} />;
const keyExtractor = (key: TTeamMember) => key.nickname;

const styles = StyleSheet.create({
  memberContainer: {
    width: rem(60),
    alignItems: 'center',
  },
  memberImage: {
    width: rem(60),
    height: rem(60),
    backgroundColor: COLORS.secondary,
    borderRadius: rem(20),
  },
  memberNickname: {
    marginTop: rem(5),
    ...font(10, 12, 'regular', 'secondary'),
  },
  separator: {
    width: rem(19),
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: rem(23),
  },
  memberIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primaryLight,
    width: rem(22),
    height: rem(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(22 / 2),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
