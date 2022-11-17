import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {color, Typography} from '../../utils/utils';

interface PropTypes {
  title: string;
  day: string;
  onPress: () => void;
}
const NoticeItem = ({title, day, onPress}: PropTypes) => {
  return (
    <Pressable style={styles.block} onPress={onPress}>
      <View>
        <Text
          numberOfLines={2}
          style={[Typography.subtitle3, {color: color.blueGray_06}]}>
          {title}
        </Text>
        <Text style={[Typography.body2, {color: color.blueGray_02}]}>
          {day}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    // borderWidth: 1,
    marginBottom: 28,
  },
});

export default NoticeItem;
