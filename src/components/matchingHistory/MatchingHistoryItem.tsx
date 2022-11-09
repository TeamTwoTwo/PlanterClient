import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Badge from '../../assets/icon/ic-plant-badge.svg';
import GrayBadge from '../../assets/icon/ic-plant-badge-gray.svg';
import {ReqType} from '../../screens/MatchingHistory/MatchingHistoryListScreen';

interface Props {
  info: ReqType;
  onPress: () => void;
}

const category = ['식물 집사', '꽃집', '식물 전문가', '식물 케어 서비스'];

const MatchingHistoryItem = ({info, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={dstyles(info?.status).wrap}>
        <View style={styles.profileWrap}>
          <View style={styles.profileImgWrap}>
            <Image
              style={dstyles(info?.status).profileImg}
              source={{uri: info?.profileImg}}
            />
            {info?.status === 'new' && <View style={styles.redPoint} />}
          </View>
          <View style={styles.profileTextWrap}>
            <View style={styles.nameWrap}>
              <Text
                style={[
                  Typography.subtitle3,
                  {
                    color:
                      info?.status === 'cancel'
                        ? color.blueGray_01
                        : color.blueGray_06,
                  },
                ]}>
                {info?.name}
              </Text>
              <View style={styles.badgeWrap}>
                {info?.status === 'cancel' ? <GrayBadge /> : <Badge />}
              </View>
              <Text
                style={[
                  Typography.caption1,
                  {
                    color:
                      info?.status === 'cancel'
                        ? color.blueGray_01
                        : color.blueGray_05,
                  },
                ]}>
                {category[info?.category]}
              </Text>
            </View>
            <Text
              style={[
                Typography.body2,
                {
                  color:
                    info?.status === 'cancel'
                      ? color.blueGray_01
                      : color.blueGray_02,
                },
              ]}>
              요정일시 {info?.requestAt}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[Typography.subtitle4, dstyles(info?.status).text]}>
            {info?.status === 'care'
              ? '케어 진행중'
              : info?.status === 'request'
              ? '매칭 요청중'
              : info?.status === 'complete'
              ? '케어 완료'
              : info?.status === 'cancel'
              ? '매칭 취소'
              : '새 매칭 요청'}
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
        type === 'care' || type === 'new'
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
    wrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: type === 'new' ? color.mint_00 : color.gray_00,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
  });
const styles = StyleSheet.create({
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
  profileImgWrap: {
    position: 'relative',
  },
  redPoint: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    backgroundColor: color.red_02,
  },
});

export default MatchingHistoryItem;
