import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackArrow from '../../assets/icon/ic-back-arrow-black.svg';
import {color, Typography} from '../../utils/utils';
import {RootStackNavigationProp} from '../../screens/RootStack';
import {MainTabNavigationProp} from '../../screens/MainTab';
import Meatball from '../../assets/icon/ic-meatball.svg';

// <MatchingHeader title="~~" meatball /> 이렇게만 써도 true, meatball 안 쓰면 default false
interface PropTypes {
  title: string;
  meatball?: boolean;
  message?: boolean;
  onModal?: () => void;
}

const MatchingHeader = ({
  title,
  meatball = false,
  message = false,
  onModal,
}: PropTypes) => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };
  return (
    <View style={styles.block}>
      <TouchableOpacity
        style={[styles.btn, {marginLeft: -8}]}
        activeOpacity={0.5}
        onPress={onGoBack}>
        <BackArrow />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {meatball ? (
        <TouchableOpacity
          style={[styles.btn, {marginRight: -8}]}
          activeOpacity={0.5}
          onPress={onModal}>
          <Meatball fill={color.gray_08} />
        </TouchableOpacity>
      ) : (
        <View style={styles.empty} />
      )}
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
  btn: {
    padding: 8,
  },
  empty: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default MatchingHeader;
