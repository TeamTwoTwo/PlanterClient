import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, Typography} from '../../utils/utils';

interface Props {
  type: string;
}
const NoMatchingHistory = ({type}: Props) => {
  return (
    <View style={styles.wrap}>
      {/* <View style={styles.illust} /> */}
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
  illust: {
    width: 160,
    height: 160,
    backgroundColor: '#D9D9D9',
  },
  textWrap: {
    marginTop: 20,
  },
});

export default NoMatchingHistory;
