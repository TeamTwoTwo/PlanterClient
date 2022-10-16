import React, {useState, useEffect, useReducer} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import FindHeader from '../../components/common/FindHeader';
import {color} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import CustomInput from '../../components/common/CustomInput';

interface CheckStatusProps {
  password: boolean;
  checkPassword: boolean;
}

interface Action {
  type: string;
  status: boolean;
}

const initialState: CheckStatusProps = {
  password: true,
  checkPassword: true,
};

const reducer = (state: CheckStatusProps, action: Action) => {
  switch (action.type) {
    case 'password':
      return {...state, password: action.status};
    case 'checkPassword':
      return {...state, checkPassword: action.status};
    default:
      throw new Error('error');
  }
};

const NewPwScreen = () => {
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

  const [isBtnShow, setIsBtnShow] = useState<boolean>(false);
  const [checkStatus, dispatch] = useReducer(reducer, initialState);

  const setCheckStatus = (type: string, status: boolean) =>
    dispatch({type, status});

  const navigation = useNavigation<LoginStackNavigationProp>();

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

  // 영문, 숫자, 특수 문자 중 2개 이상이 들어간 8자 이상 20자 이하 비밀번호 정규식
  const passwordRegExp = (str: string) => {
    var regExp =
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;
    return regExp.test(str);
  };

  // 비밀번호 형식 체크 함수
  const passwordCheckFunc = () => {
    if (passwordRegExp(password) || password.length === 0) {
      setCheckStatus('password', true);
    } else {
      setCheckStatus('password', false);
    }
  };

  const onPress = (): void => {
    if (password === checkPassword) {
      navigation.navigate('PwDoneScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.block}>
          <View>
            <FindHeader />
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>새 비밀번호 등록</Text>
          </View>
          <View style={styles.pwInputWrap}>
            <CustomInput
              label="비밀번호"
              placeholder="비밀번호"
              errorText="영문/숫자/특수문자 중 2개 이상을 포함하여 8~20자로 입력해주세요."
              secure={true}
              onChangeText={setPassword}
              value={password}
              clearText={() => {
                setPassword('');
              }}
              checkStatus={checkStatus.password}
            />
          </View>
          <View style={styles.pwInputWrap}>
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
        </View>
        {password !== '' && checkPassword !== '' ? (
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View style={styles.nextBtn}>
              <Text style={styles.btnText}>다음</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  block: {
    paddingHorizontal: 24,
    flex: 1,
  },
  titleWrap: {
    paddingTop: 30,
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: color.gray_07,
  },
  pwInputWrap: {
    marginBottom: 15,
  },
  nextBtn: {
    height: 52,
    backgroundColor: color.mint_05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: color.gray_00,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewPwScreen;
