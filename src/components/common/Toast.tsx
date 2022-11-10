import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {color} from '../../utils/utils';

interface PropTypes {
  text: string;
}

const Toast = ({text}: PropTypes) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 12,
    width: '100%',
    paddingVertical: 11,
    backgroundColor: color.gray_08,
    opacity: 0.7,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default Toast;
