import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {color} from '../../utils/utils';

// ?: 로 돼있는 건 props로 꼭 넘길 필요는 없음
// 배경색, 버튼 text, onPress 함수는 필수로 넘겨야 함
// disabled를 props로 넘기면 버튼 색 알아서 바뀌도록 구현
// style은 버튼 스타일, textStyle은 폰트 스타일

interface Props {
  backgroundColor: string;
  text: string;
  disabled?: boolean;
  borderRadius?: number;
  style?: object;
  textStyle?: object;
  onPress: () => void;
}

const CustomButton = ({
  backgroundColor,
  text,
  disabled = false,
  borderRadius = 0,
  style,
  textStyle,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[dstyles(backgroundColor, disabled, borderRadius).button, style]}
      activeOpacity={1}
      onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const dstyles = (
  backgroundColor: string,
  disabled: boolean,
  borderRadius: number,
) =>
  StyleSheet.create({
    button: {
      backgroundColor: disabled ? color.gray_03 : backgroundColor,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius,
    },
  });

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
export default CustomButton;
