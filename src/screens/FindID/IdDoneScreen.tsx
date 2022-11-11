import React from 'react';
import {color} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/common/CustomButton';
import Flowerpot from '../../assets/icon/ic-flowerpot.svg';

const IdDoneScreen = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  const onPress = (): void => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.wrap}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>가입 아이디는</Text>
          <Text style={styles.email}>example@email.kr</Text>
          <Text style={styles.title}>입니다.</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 70}}>
          <Flowerpot />
        </View>
      </View>
      <View>
        <CustomButton
          backgroundColor={color.mint_05}
          text="로그인 화면으로 돌아가기"
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
  },
  titleWrap: {
    paddingHorizontal: 33,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
    color: color.gray_07,
  },
  email: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
    color: color.blueGray_04,
  },
  illustView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: 280,
    height: 280,
    backgroundColor: color.gray_03,
  },
});

export default IdDoneScreen;
