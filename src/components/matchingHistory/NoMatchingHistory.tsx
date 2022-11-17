import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Rcv from '../../assets/illust/illust-no-received.svg';
import Req from '../../assets/illust/illust_no_request.svg';

interface Props {
  type: string;
}
const NoMatchingHistory = ({type}: Props) => {
  return (
    <View style={styles.wrap}>
      {type === '요청한' ? <Req /> : <Rcv />}
      <View style={styles.textWrap}>
        <Text style={[Typography.body1, {color: color.blueGray_06}]}>
          {type} 매칭 내역이 없습니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    marginTop: 20,
  },
});

export default NoMatchingHistory;
