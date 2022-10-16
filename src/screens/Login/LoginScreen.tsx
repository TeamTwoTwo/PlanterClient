import React from 'react';
import {color} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Apple from '../../assets/icon/ic-apple.svg';
import Naver from '../../assets/icon/ic-naver.svg';
import Bubble from '../../assets/icon/ic-bubble.svg';
import {LoginStackNavigationProp} from '../../screens/LoginStack';

const LoginScreen = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  const onIdPress = (): void => {
    navigation.navigate('FirstScreen');
  };

  const onPwPress = (): void => {
    navigation.navigate('FirstPwScreen');
  };

  const onSignUp = (): void => {
    navigation.navigate('TermsOfService');
  };

  return (
    <SafeAreaView style={styles.block}>
      <View>
        <TextInput
          style={styles.idInput}
          placeholder="아이디"
          placeholderTextColor="#AEAEAE"
        />
        <TextInput
          style={styles.pwInput}
          placeholder="비밀번호"
          placeholderTextColor="#AEAEAE"
        />
        <TouchableOpacity>
          <View style={styles.loginBtn}>
            <Text style={styles.loginText}>로그인</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.underWrap}>
        <Text style={styles.underText} onPress={onSignUp}>
          회원가입
        </Text>
        <View style={styles.firstLine} />
        <Text style={styles.underText} onPress={onIdPress}>
          아이디 찾기
        </Text>
        <View style={styles.secondLine} />
        <Text style={styles.underText} onPress={onPwPress}>
          비밀번호 찾기
        </Text>
      </View>
      <View style={styles.socialWrap}>
        <Apple width={40} height={40} />
        <View style={styles.kakao}>
          <Bubble width={25.71} height={25.71} />
        </View>
        <Naver width={40} height={40} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
    paddingHorizontal: 24,
  },
  idInput: {
    height: 54,
    borderWidth: 1,
    borderColor: color.gray_03,
    borderRadius: 5,
    paddingLeft: 12,
    fontSize: 14,
    marginTop: 224,
    marginBottom: 12,
    letterSpacing: -1,
  },
  pwInput: {
    height: 54,
    borderWidth: 1,
    borderColor: color.gray_03,
    borderRadius: 5,
    paddingLeft: 12,
    fontSize: 14,
    marginBottom: 24,
    letterSpacing: -1,
  },
  loginBtn: {
    height: 54,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 29,
  },
  loginText: {
    color: color.gray_00,
  },
  underWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLine: {
    height: 13,
    borderRightWidth: 1,
    borderColor: color.gray_03,
    marginRight: 23,
    marginLeft: 30,
  },
  secondLine: {
    height: 13,
    borderRightWidth: 1,
    borderColor: color.gray_03,
    marginLeft: 23,
    marginRight: 17,
  },
  underText: {
    lineHeight: 22,
    letterSpacing: -1,
  },
  socialWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 49,
  },
  kakao: {
    marginHorizontal: 40,
    width: 40,
    height: 40,
    backgroundColor: '#FFDE5B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});

export default LoginScreen;
