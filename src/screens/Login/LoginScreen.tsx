import React, {useRef, useState} from 'react';
import {color, screen, url} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Apple from '../../assets/icon/ic-apple.svg';
import Naver from '../../assets/icon/ic-naver.svg';
import Bubble from '../../assets/icon/ic-bubble.svg';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import axios from 'axios';
import {setData} from '../../utils/AsyncStorage';
import {useSetRecoilState} from 'recoil';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';

interface ButtonRefProps {
  isLoading: boolean;
}

const LoginScreen = () => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });
  const setLoginStatus = useSetRecoilState(LoginStatusState);
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onIdPress = (): void => {
    navigation.navigate('FirstScreen');
  };

  const onPwPress = (): void => {
    navigation.navigate('FirstPwScreen');
  };

  const onSignupPress = (): void => {
    navigation.navigate('TermsOfService');
  };

  const onPressLogin = () => {
    if (email !== '' && password !== '') {
      if (buttonRef.current.isLoading) {
        return;
      }

      buttonRef.current.isLoading = true;

      axios
        .post(url.dev + 'auth/login', {email, password})
        .then(res => {
          console.log(res.data.result);
          if (res.status === 200) {
            const {
              name,
              nickname,
              birth,
              phone,
              address,
              detailAddress,
              token,
              userId,
            } = res.data.result;

            const signupInfo = {
              email: res.data.result.email,
              password: res.data.result.password,
              name,
              nickname,
              birth,
              phone,
              address,
              detailAddress,
            };
            const authInfo = {token, userId};

            setData('userInfo', signupInfo);
            setData('auth', authInfo);
            setLoginStatus({isLogined: true});
          }
        })
        .finally(() => {
          buttonRef.current.isLoading = false;
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.wrap}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.idInput}
            placeholder="아이디"
            placeholderTextColor="#AEAEAE"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.pwInput}
            placeholder="비밀번호"
            placeholderTextColor="#AEAEAE"
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={onPressLogin}>
            <View style={styles.loginBtn}>
              <Text style={styles.loginText}>로그인</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.underWrap}>
          <Text style={styles.underText} onPress={onSignupPress}>
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
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    width: '100%',
  },
  idInput: {
    height: 54,
    borderWidth: 1,
    borderColor: color.gray_03,
    borderRadius: 5,
    paddingLeft: 12,
    fontSize: 14,
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
