import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Arrow from '../../assets/icon/ic-click-arrow.svg';

interface PropTypes {
  title: string;
  onPress: () => void;
}

const ListItem = ({title, onPress}: PropTypes) => {
  return (
    <Pressable style={styles.block} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Arrow />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    // borderWidth: 1,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: color.blueGray_06,
  },
});

export default ListItem;
