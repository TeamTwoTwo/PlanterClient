import React, {useRef} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import {color} from '../../utils/color';

const Toast = () => {
  return (
    <Animated.View style={styles.wrap}>
      <Text style={styles.text}>인증번호가 전송되었습니다.</Text>
    </Animated.View>
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
