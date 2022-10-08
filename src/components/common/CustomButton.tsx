import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {color} from '../../utils/color';

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
