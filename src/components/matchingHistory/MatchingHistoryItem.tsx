import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Badge from '../../assets/icon/ic-plant-badge.svg';
import GrayBadge from '../../assets/icon/ic-plant-badge-gray.svg';

interface Props {
  type: string;
  onPress: () => void;
}

const MatchingHistoryItem = ({type, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.wrap}>
        <View style={styles.profileWrap}>
          <Image
            style={dstyles(type).profileImg}
            source={require('../../assets/img/img-expert-profile.png')}
          />
          <View style={styles.profileTextWrap}>
            <View style={styles.nameWrap}>
              <Text
                style={[
                  Typography.subtitle3,
                  {
                    color:
                      type === 'cancel' ? color.blueGray_01 : color.blueGray_06,
                  },
                ]}>
                김보경
              </Text>
              <View style={styles.badgeWrap}>
                {type === 'cancel' ? <GrayBadge /> : <Badge />}
              </View>
              <Text
                style={[
                  Typography.caption1,
                  {
                    color:
                      type === 'cancel' ? color.blueGray_01 : color.blueGray_05,
                  },
                ]}>
                식물 집사
              </Text>
            </View>
            <Text
              style={[
                Typography.body2,
                {
                  color:
                    type === 'cancel' ? color.blueGray_01 : color.blueGray_02,
                },
              ]}>
              요정일시 2022.10.24
            </Text>
          </View>
        </View>
        <View>
          <Text style={[Typography.subtitle4, dstyles(type).text]}>
            {type === 'care'
              ? '케어 진행중'
              : type === 'request'
              ? '매칭 요청중'
              : type === 'complete'
              ? '케어 완료'
              : '매칭 취소'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const dstyles = (type: string) =>
  StyleSheet.create({
    text: {
      color:
        type === 'care'
          ? color.mint_05
          : type === 'request'
          ? color.blueGray_06
          : color.blueGray_01,
    },
    profileImg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      opacity: type === 'cancel' ? 0.5 : 1,
    },
  });
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextWrap: {
    marginLeft: 13,
  },
  badgeWrap: {
    marginLeft: 4,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MatchingHistoryItem;
