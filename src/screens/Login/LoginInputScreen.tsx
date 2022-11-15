import React, {useState, useReducer, useEffect, useRef} from 'react';
import {color, url, Typography} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FindHeader from '../../components/common/FindHeader';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import axios from 'axios';
import {setData} from '../../utils/AsyncStorage';
import {useSetRecoilState} from 'recoil';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';

interface CheckStatusProps {
  email: boolean;
}

interface Action {
  type: string;
  status: boolean;
}

const initialState: CheckStatusProps = {
  email: true,
};

const reducer = (state: CheckStatusProps, action: Action) => {
  switch (action.type) {
    case 'email':
      return {...state, email: action.status};
    default:
      throw new Error('error');
  }
};

interface ButtonRefProps {
  isLoading: boolean;
}

const LoginInputScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력
  const [showPasswordView, setShowPasswordView] = useState<boolean>(false);
  const [checkStatus, dispatch] = useReducer(reducer, initialState);
  const setLoginStatus = useSetRecoilState(LoginStatusState);

  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });

  const setCheckStatus = (type: string, status: boolean) =>
    dispatch({type, status});

  useEffect(() => {
    emailCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const emailCheckFunc = (): void => {
    if (email.length > 0) {
      axios
        .get(url.dev + `auth/check-duplication?email=${email}`)
        .then(res => {
          if (!res.data.isSuccess) {
            //중복인 경우 === 이메일이 존재함
            setCheckStatus('email', true);
            return;
          } else {
            setCheckStatus('email', false);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  const onPressNext = (): void => {
    if (step === 1 && !showPasswordView && checkStatus.email) {
      setShowPasswordView(true);
      setStep(2);
    } else if (step === 2 && email !== '' && password !== '') {
      if (buttonRef.current.isLoading) {
        return;
      }

      buttonRef.current.isLoading = true;

      axios
        .post(url.dev + 'auth/login', {email, password})
        .then(res => {
          console.log(res);
          console.log(res.data.result);
          if (res.data.isSuccess) {
            const {
              name,
              nickname,
              birth,
              phone,
              address,
              detailAddress,
              simpleAddress,
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
              simpleAddress,
            };
            const authInfo = {token, userId};

            setData('userInfo', signupInfo);
            setData('auth', authInfo);
            setLoginStatus({isLogined: true});
          } else {
            Alert.alert(res.data.message);
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
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{paddingHorizontal: 24, flex: 1}}>
          <FindHeader />
          <View style={{marginTop: 47}}>
            <Text style={styles.headerText}>로그인</Text>
          </View>
          <View style={{marginTop: 60}}>
            {showPasswordView && (
              <>
                <View style={{marginBottom: 36}}>
                  <CustomInput
                    label="비밀번호"
                    placeholder="비밀번호"
                    secure={true}
                    onChangeText={setPassword}
                    value={password}
                    clearText={() => {
                      setPassword('');
                    }}
                  />
                </View>
              </>
            )}
            <CustomInput
              label="이메일"
              placeholder="이메일"
              type="email-address"
              onChangeText={setEmail}
              value={email}
              errorText="이메일 주소를 확인해주세요."
              clearText={() => {
                setEmail('');
              }}
              checkStatus={checkStatus.email}
            />
          </View>
        </View>
        {(step === 1 && email !== '') ||
        (step === 2 && email !== '' && password !== '') ? (
          <View>
            <CustomButton
              backgroundColor={color.mint_05}
              text={step === 1 ? '다음' : '로그인 하기'}
              onPress={onPressNext}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    color: color.gray_07,
  },
});

export default LoginInputScreen;
