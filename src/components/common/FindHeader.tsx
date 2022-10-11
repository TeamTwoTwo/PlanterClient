import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import Back from '../../assets/icon/ic-back.svg';
import {color} from '../../utils/color';
import {LoginStackNavigationProp} from '../../screens/LoginStack';

const FindHeader = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };
  return (
    <View style={styles.block}>
      <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
        <WithLocalSvg width={9} height={13} asset={Back} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    height: 48,
    paddingHorizontal: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FindHeader;
