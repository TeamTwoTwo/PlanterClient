import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, Typography} from '../../utils/utils.ts';
import Receive from '../../assets/icon/ic-receive.svg';

const ReceiveMessage = () => {
  return (
    <View style={styles.wrap}>
      <View style={styles.block}>
        <View style={styles.statusWrap}>
          <Receive />
          <Text style={styles.status}>받은 쪽지</Text>
        </View>
        <Text style={styles.message}>
          몬스테라는 크기가 있다보니 제가 직접 그 장소로 가겠습니다! 괜찮으세요?
        </Text>
        <Text style={[Typography.body2, styles.time]}>오후 08:40</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    // borderWidth: 1,
    // borderColor: color.blueGray_00,
    paddingVertical: 20,
  },
  status: {
    color: color.mint_05,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  block: {
    paddingHorizontal: 24,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: color.blueGray_06,
    fontWeight: '400',
  },
  time: {
    marginTop: 4,
    color: color.blueGray_02,
  },
});

export default ReceiveMessage;
