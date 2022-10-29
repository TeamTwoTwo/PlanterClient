import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackArrow from '../../assets/icon/ic-back-arrow-black.svg';
import {color, Typography} from '../../utils/utils';
import {RootStackNavigationProp} from '../../screens/RootStack';
import {MainTabNavigationProp} from '../../screens/MainTab';
import Meatball from '../../assets/icon/ic-meatball.svg';

interface PropTypes {
  title: string;
}

const MessageHeader = ({title}: PropTypes) => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };
  return (
    <View style={styles.block}>
      <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
        <BackArrow size={20} />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.side} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: color.blueGray_06,
    lineHeight: 24,
  },
  side: {
    width: 20,
    height: 20,
  },
});

export default MessageHeader;
