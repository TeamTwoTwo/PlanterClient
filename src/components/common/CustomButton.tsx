import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {color} from '../../utils/utils';

// ?: 로 돼있는 건 props로 꼭 넘길 필요는 없음
// 배경색, 버튼 text, onPress 함수는 필수로 넘겨야 함
// disabled를 props로 넘기면 버튼 색 알아서 바뀌도록 구현
// width는 16과 같이 숫자로 넘겨도 되고, '50%'와 같이 string으로 넘겨도 됨 (안 넘길 시 기본으로 가로 전체 차지)
interface Props {
  backgroundColor: string;
  text: string;
  disabled?: boolean;
  width?: number | string;
  borderRadius?: number;
  onPress: () => void;
}

const CustomButton = ({
  backgroundColor,
  text,
  disabled = false,
  width = Dimensions.get('window').width,
  borderRadius = 0,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={dstyles(backgroundColor, disabled, width, borderRadius).button}
      activeOpacity={1}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const dstyles = (
  backgroundColor: string,
  disabled: boolean,
  width: number | string,
  borderRadius: number,
) =>
  StyleSheet.create({
    button: {
      backgroundColor: disabled ? color.gray_03 : backgroundColor,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      width,
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
