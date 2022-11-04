import React, {useEffect, useReducer, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import CustomInput from '../../components/common/CustomInput';
import {color, url} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../LoginStack';
import CustomButton from '../../components/common/CustomButton';
import {useSetRecoilState} from 'recoil';
import {signupState} from '../../recoil/atoms/signup';
import FindHeader from '../../components/common/FindHeader';
import axios from 'axios';

interface CheckStatusProps {
  email: boolean;
  password: boolean;
  checkPassword: boolean;
}

interface Action {
  type: string;
  status: boolean;
}

const initialState: CheckStatusProps = {
  email: true,
  password: true,
  checkPassword: true,
};

const reducer = (state: CheckStatusProps, action: Action) => {
  switch (action.type) {
    case 'email':
      return {...state, email: action.status};
    case 'password':
      return {...state, password: action.status};
    case 'checkPassword':
      return {...state, checkPassword: action.status};
    default:
      throw new Error('error');
  }
};

const SignupScreen01 = () => {
  const set = useSetRecoilState(signupState);
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [showPasswordView, setShowPasswordView] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력 단계
  const [checkStatus, dispatch] = useReducer(reducer, initialState);

  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean>(false);

  const setCheckStatus = (type: string, status: boolean) =>
    dispatch({type, status});

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    emailCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    passwordCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    if (password === checkPassword) {
      setCheckStatus('checkPassword', true);
    } else {
      setCheckStatus('checkPassword', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, checkPassword]);

  const clear = () => {
    set(prevState => ({...prevState, email, password}));
    Keyboard.dismiss();
    setEmail('');
    setPassword('');
    setCheckPassword('');
    setStep(1);
    setShowPasswordView(false);
  };

  const onPressNext = () => {
    if (!showPasswordView && checkStatus.email) {
      setShowPasswordView(true);
      setStep(2);
    } else if (
      showPasswordView &&
      checkStatus.email &&
      checkStatus.password &&
      checkStatus.checkPassword
    ) {
      clear();
      navigation.navigate('Signup02');
    }
  };

  // 이메일 형식 체크 정규식
  const emailRegExp = (str: string) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  // 이메일 형식 체크 함수
  const emailCheckFunc = () => {
    if (emailRegExp(email) || email.length === 0) {
      if (emailRegExp(email)) {
        axios
          .get(url.dev + `auth/check-duplication?email=${email}`)
          .then(res => {
            if (!res.data.isSuccess) {
              setCheckStatus('email', false);
              setIsEmailDuplicated(true);
              return;
            } else {
              setCheckStatus('email', true);
              setIsEmailDuplicated(false);
            }
          })
          .catch(e => {
            console.error(e);
          });
      } else {
        setCheckStatus('email', true);
        setIsEmailDuplicated(false);
      }
    } else {
      setCheckStatus('email', false);
      setIsEmailDuplicated(false);
    }
  };

  // 영문, 숫자, 특수 문자가 포함된 8자 이상 20자 이하 비밀번호 정규식
  const passwordRegExp = (str: string) => {
    var regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&)])[A-Za-z\d@$!%*#?&]{8,20}$/;
    return regExp.test(str) ? true : false;
  };

  // 비밀번호 형식 체크 함수
  const passwordCheckFunc = () => {
    if (passwordRegExp(password) || password.length === 0) {
      setCheckStatus('password', true);
    } else {
      setCheckStatus('password', false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <FindHeader />
          <ScrollView>
            <View style={styles.progressBarWrap}>
              <View style={styles.progressBarOuter}>
                <View style={styles.progressBarInner} />
              </View>
            </View>
            <View style={styles.contentWrap}>
              <Text style={styles.stepText}>회원가입</Text>
              <View style={styles.content}>
                {showPasswordView ? (
                  <>
                    <View style={{marginTop: 10}}>
                      <CustomInput
                        label="비밀번호"
                        placeholder="비밀번호"
                        errorText="알파벳/숫자/특수문자가 포함된 8~20자로 입력해주세요."
                        secure={true}
                        onChangeText={setPassword}
                        value={password}
                        clearText={() => {
                          setPassword('');
                        }}
                        checkStatus={checkStatus.password}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <CustomInput
                        label="비밀번호 확인"
                        placeholder="비밀번호 확인"
                        errorText="비밀번호가 일치하지 않습니다."
                        secure={true}
                        onChangeText={setCheckPassword}
                        value={checkPassword}
                        clearText={() => {
                          setCheckPassword('');
                        }}
                        checkStatus={checkStatus.checkPassword}
                      />
                    </View>
                  </>
                ) : null}
                <View style={styles.inputWrap}>
                  <CustomInput
                    label="이메일"
                    placeholder="이메일"
                    errorText={
                      isEmailDuplicated
                        ? '중복된 이메일입니다.'
                        : '이메일 주소를 확인해주세요.'
                    }
                    type="email-address"
                    onChangeText={setEmail}
                    value={email}
                    clearText={() => {
                      setEmail('');
                    }}
                    checkStatus={checkStatus.email}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {(step === 1 && email !== '') ||
        (step === 2 &&
          email !== '' &&
          password !== '' &&
          checkPassword !== '') ? (
          <View>
            <CustomButton
              backgroundColor={color.mint_05}
              text="다음"
              onPress={onPressNext}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  progressBarWrap: {
    marginTop: 24,
  },
  progressBarOuter: {
    width: 76,
    height: 4,
    backgroundColor: color.blueGray_00,
  },
  progressBarInner: {
    width: 19,
    height: 4,
    backgroundColor: color.blueGray_05,
  },
  contentWrap: {
    marginTop: 37,
    flex: 1,
  },
  stepText: {
    fontSize: 28,
    fontWeight: '600',
  },
  content: {
    marginTop: 50,
  },
  inputWrap: {marginTop: 36},
});
export default SignupScreen01;
