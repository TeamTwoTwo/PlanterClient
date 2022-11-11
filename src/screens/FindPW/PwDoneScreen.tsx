import React from 'react';
import {color} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';

const PwDoneScreen = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  const onPress = (): void => {
    navigation.popToTop();
  };
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.wrap}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>비밀번호 재설정이</Text>
          <Text style={styles.title}>완료되었습니다.</Text>
        </View>
        <View style={styles.illustView}>
          <View style={styles.illust} />
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
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: 280,
    height: 280,
    backgroundColor: color.gray_03,
  },
});

export default PwDoneScreen;
