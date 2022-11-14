import React from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import {color, Typography} from '../../utils/utils.ts';

interface PropTypes {
  text: string;
  isEnabled: boolean;
  onPress: () => void;
}

const Toggle = ({text, isEnabled, onPress}: PropTypes) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{text}</Text>
      <Switch
        onValueChange={onPress}
        value={isEnabled}
        thumbColor={color.gray_00}
        trackColor={isEnabled ? color.mint_05 : color.blueGray_00}
        ios_backgroundColor="#EDF0F5"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: 58,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: color.blueGray_06,
  },
});

export default Toggle;
