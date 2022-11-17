import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {color, Typography} from '../../utils/utils';

interface PropTypes {
  text: string;
  id: number;
  onAddList: (id: number) => void;
  checkList: number[];
}

const MatchingFilter = ({text, id, onAddList, checkList}: PropTypes) => {
  return (
    <Pressable
      onPress={() => {
        onAddList(id);
      }}>
      <View style={[dstyles(id, checkList).wrap, Typography.body2]}>
        <Text style={[Typography.body2, dstyles(id, checkList).text]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const dstyles = (id: number, checkList: number[]) =>
  StyleSheet.create({
    wrap: {
      height: 34,
      borderWidth: 1,
      borderColor: checkList.includes(id) ? color.mint_05 : color.blueGray_00,
      borderRadius: 49,
      marginRight: 8,
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: checkList.includes(id) ? color.mint_00 : color.gray_00,
    },
    text: {
      color: checkList.includes(id) ? color.mint_05 : color.blueGray_03,
      fontWeight: checkList.includes(id) ? '600' : '400',
    },
  });

const styles = StyleSheet.create({
  wrap: {
    height: 34,
    borderWidth: 1,
    borderColor: color.blueGray_00,
    borderRadius: 49,
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});

export default MatchingFilter;
