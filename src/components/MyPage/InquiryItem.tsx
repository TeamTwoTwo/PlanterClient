import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {color, Typography} from '../../utils/utils.ts';

interface PropTypes {
  title: string;
  day: string;
  isAnswered: boolean;
  onPress: () => void;
}

let maxlimit = 20;

const InquiryItem = ({title, day, isAnswered, onPress}: PropTypes) => {
  return (
    <Pressable style={styles.block} onPress={onPress}>
      <View>
        <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
          {title.length > maxlimit
            ? title.slice(0, maxlimit + 1) + '...'
            : title}
        </Text>
        <Text style={[Typography.body2, {color: color.blueGray_02}]}>
          {day}
        </Text>
      </View>
      <View>
        <Text
          style={[
            Typography.subtitle4,
            {color: isAnswered ? color.mint_05 : color.blueGray_01},
          ]}>
          {isAnswered ? '답변 완료' : '답변 대기중'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
});

export default InquiryItem;
