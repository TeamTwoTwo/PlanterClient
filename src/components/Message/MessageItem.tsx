import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {color, Typography} from '../../utils/utils';
import PlantBadge from '../../assets/icon/ic-plant-badge.svg';

const MessageItem = () => {
  return (
    <View style={styles.wrap}>
      <View>
        <Image
          style={styles.profileImg}
          source={require('../../assets/img/img-expert-profile.png')}
        />
      </View>
      <View style={styles.bodyWrap}>
        <View style={styles.nameLine}>
          <Text style={[Typography.subtitle3, styles.name]}>김보경</Text>
          <PlantBadge />
          <Text style={[Typography.body2, {color: color.blueGray_05}]}>
            식물 집사
          </Text>
        </View>
        <View style={styles.messageLine}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[Typography.body1, {color: color.blueGray_06}]}>
            몬스테라는 크기가 있다보니 제가 직접 그 장소로 가겠습니다!
            괜찮으세요?
          </Text>
        </View>
        <Text style={[Typography.body2, {color: color.blueGray_02}]}>
          오후 09:03
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    // borderWidth: 1,
    height: 106,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyWrap: {
    marginLeft: 8.5,
  },
  name: {
    color: color.blueGray_06,
    marginRight: 5,
  },
  messageLine: {
    width: '100%',
    paddingRight: 35,
    marginVertical: 3,
  },
});

export default MessageItem;
