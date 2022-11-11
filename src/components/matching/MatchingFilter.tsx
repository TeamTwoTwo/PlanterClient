import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, Typography} from '../../utils/utils';

interface PropTypes {
  text: string;
  onAddList: (text: string) => void;
  checkList: string[];
}

const MatchingFilter = ({text, onAddList, checkList}: PropTypes) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onAddList(text);
      }}
      activeOpacity={1}>
      <View style={[dstyles(text, checkList).wrap, Typography.body2]}>
        <Text style={[Typography.body2, dstyles(text, checkList).text]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const dstyles = (text: string, checkList: string[]) =>
  StyleSheet.create({
    wrap: {
      height: 34,
      borderWidth: 1,
      borderColor: checkList.includes(text) ? color.mint_05 : color.blueGray_00,
      borderRadius: 49,
      marginRight: 8,
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: checkList.includes(text) ? color.mint_00 : color.gray_00,
    },
    text: {
      color: checkList.includes(text) ? color.mint_05 : color.blueGray_03,
      fontWeight: checkList.includes(text) ? '600' : '400',
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
