import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import CustomInput from '../../components/common/CustomInput';
import {color, url} from '../../utils/utils';
import {LoginStackNavigationProp} from '../LoginStack';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/common/CustomButton';
import Toast from '../../components/common/Toast';
import Timer from '../../components/common/Timer';
import axios from 'axios';
import {signupState} from '../../recoil/atoms/signup';
import {useSetRecoilState} from 'recoil';
import FindHeader from '../../components/common/FindHeader';

interface ButtonRefProps {
  isLoadingSend: boolean;
  isLoadingVerify: boolean;
}

interface TimerProps {
  reset: boolean;
}

const SignupScreen02 = () => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoadingSend: false,
    isLoadingVerify: false,
  });
  const set = useSetRecoilState(signupState);
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [showBirthView, setShowBirthView] = useState<boolean>(false);
  const [showPhoneView, setShowPhoneView] = useState<boolean>(false);
  const [showCertifyNumView, setShowCertifyNumView] = useState<boolean>(false);
  const [sendCertifyNumText, setSendCertifyNumText] =
    useState<string>('인증번호 전송');
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<string>('');
  const [certifyNum, setCertifyNum] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력 단계
  const [birthCheckStatus, setBirthCheckStatus] = useState<boolean>(true);
  const [certifyNumCheckStatus, setCertifyNumCheckStatus] =
    useState<boolean>(true);
  const [phoneNumCheckStatus, setPhoneNumCheckStatus] = useState<boolean>(true);
  const [phoneNumErrorMsg, setPhoneNumErrorMsg] =
    useState<string>('휴대폰번호 형식을 확인해주세요.');

  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const resetTimer = useRef<TimerProps>({reset: false});

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    autoAddDot();
    birthCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birth]);

  useEffect(() => {
    phoneNumCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNum]);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  const clear = () => {
    set(prevState => ({
      ...prevState,
      name,
      birth: birth.replace(/[^0-9]/g, ''),
      phone: phoneNum,
    }));
    Keyboard.dismiss();
    setShowBirthView(false);
    setShowPhoneView(false);
    setShowCertifyNumView(false);
    setName('');
    setBirth('');
    setPhoneNum('');
    setCertifyNum('');
    setBirthCheckStatus(true);
    setPhoneNumCheckStatus(true);
    setCertifyNumCheckStatus(true);
    setShowTimer(false);
  };

  const autoAddDot = () => {
    // 생년월일 사이 점 자동 추가 함수
    let str: string = birth.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 3) {
      tmp = str;
    } else if (str.length < 6) {
      tmp += str.substring(0, 2);
      tmp += '.';
      tmp += str.substring(2);
    } else {
      tmp += str.substring(0, 2);
      tmp += '.';
      tmp += str.substring(2, 4);
      tmp += '.';
      tmp += str.substring(4);
    }
    setBirth(tmp);
  };

  const onPressNext = () => {
    if (!showBirthView) {
      setShowBirthView(true);
      setStep(2);
    } else if (!showPhoneView && birthCheckStatus) {
      setShowPhoneView(true);
      setStep(3);
    }
  };

  const onPressSendCertifyNum = () => {
    if (buttonRef.current.isLoadingSend) {
      return;
    }

    buttonRef.current.isLoadingSend = true;
    resetTimer.current.reset = true;

    axios
      .post(url.dev + 'auth/send-code', {phone: phoneNum})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setShowCertifyNumView(true);
          setSendCertifyNumText('인증번호 재전송');
          setShowTimer(true);
          if (!toastStatus) {
            setToastStatus(true);
          }
        }
      })
      .finally(() => {
        buttonRef.current.isLoadingSend = false;
        resetTimer.current.reset = false;
      })
      .catch(e => {
        console.error(e);
      });
  };

  const onPressCheckCertifyNum = () => {
    if (buttonRef.current.isLoadingVerify) {
      return;
    }

    buttonRef.current.isLoadingVerify = true;

    axios
      .post(url.dev + 'auth/verify-code', {phone: phoneNum, code: certifyNum})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if (birthCheckStatus && name !== '') {
            clear();
            navigation.navigate('Signup03', {address: ''});
          }
        }
      })
      .finally(() => {
        buttonRef.current.isLoadingSend = false;
      })
      .catch(e => {
        setCertifyNumCheckStatus(false);
      });
  };

  const phoneNumRegExp = (str: string) => {
    var regExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    return regExp.test(str) ? true : false;
  };

  const phoneNumCheckFunc = () => {
    if (phoneNumRegExp(phoneNum) || phoneNum.length === 0) {
      setPhoneNumCheckStatus(true);
    } else if (!phoneNumRegExp(phoneNum)) {
      setPhoneNumCheckStatus(false);
    }
  };

  const birthRegExp = (e: string) => {
    let str: string = e.replace(/[^0-9]/g, '');
    if (str.length > 6) {
      return false;
    }
    var regExp = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/g;
    return regExp.test(str) ? true : false;
  };

  const birthCheckFunc = () => {
    if (birthRegExp(birth) || birth.length === 0) {
      setBirthCheckStatus(true);
    } else if (!birthRegExp(birth)) {
      setBirthCheckStatus(false);
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
              <Text style={styles.stepText}>본인인증</Text>
              <View style={styles.content}>
                {showPhoneView && (
                  <View style={styles.phoneView}>
                    <View style={styles.phoneNum}>
                      <CustomInput
                        label="휴대폰 번호"
                        placeholder="휴대폰 번호"
                        type="numeric"
                        onChangeText={setPhoneNum}
                        value={phoneNum}
                        clearText={() => {
                          setPhoneNum('');
                        }}
                        errorText={phoneNumErrorMsg}
                        checkStatus={phoneNumCheckStatus}
                      />
                    </View>
                    <View style={buttonStyles(phoneNumCheckStatus).btnView}>
                      <TouchableOpacity
                        disabled={
                          phoneNum === '' || !phoneNumCheckStatus ? true : false
                        }
                        style={[
                          styles.certifyNumBtn,
                          {
                            backgroundColor:
                              phoneNum === '' || !phoneNumCheckStatus
                                ? 'white'
                                : color.mint_00,
                            borderColor:
                              phoneNum === '' || !phoneNumCheckStatus
                                ? color.gray_05
                                : color.mint_04,
                          },
                        ]}
                        activeOpacity={1}
                        onPress={onPressSendCertifyNum}>
                        <Text
                          style={[
                            styles.certifyNumText,
                            {
                              color:
                                phoneNum === '' || !phoneNumCheckStatus
                                  ? color.gray_05
                                  : color.mint_05,
                            },
                          ]}>
                          {sendCertifyNumText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {showCertifyNumView && (
                  <View style={[styles.phoneView, {marginTop: 36}]}>
                    <View style={styles.codeNum}>
                      <CustomInput
                        label="인증번호 입력"
                        placeholder="인증번호 입력"
                        type="numeric"
                        onChangeText={setCertifyNum}
                        value={certifyNum}
                        clearText={() => {
                          setCertifyNum('');
                        }}
                        checkStatus={certifyNumCheckStatus}
                        errorText="잘못된 인증번호입니다."
                      />
                    </View>
                    {showTimer && (
                      <View
                        style={buttonStyles(certifyNumCheckStatus).timerView}>
                        <Text style={styles.timerText}>
                          {<Timer mm={3} reset={resetTimer.current.reset} />}
                        </Text>
                      </View>
                    )}
                    <View style={buttonStyles(certifyNumCheckStatus).btnView}>
                      <TouchableOpacity
                        disabled={certifyNum === '' ? true : false}
                        style={[
                          styles.certifyNumBtn,
                          {
                            backgroundColor:
                              certifyNum === '' ? 'white' : color.mint_00,
                            borderColor:
                              certifyNum === '' ? color.gray_05 : color.mint_04,
                          },
                        ]}
                        activeOpacity={1}
                        onPress={onPressCheckCertifyNum}>
                        <Text
                          style={[
                            styles.certifyNumText,
                            {
                              color:
                                certifyNum === ''
                                  ? color.gray_05
                                  : color.mint_05,
                            },
                          ]}>
                          인증번호 확인
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {showBirthView && (
                  <View style={styles.inputWrap}>
                    <CustomInput
                      label="생년월일 6자리"
                      placeholder="생년월일 6자리"
                      type="numeric"
                      onChangeText={setBirth}
                      value={birth}
                      errorText="올바른 생년월일을 입력해주세요."
                      clearText={() => {
                        setBirth('');
                      }}
                      checkStatus={birthCheckStatus}
                    />
                  </View>
                )}
                <View style={styles.inputWrap}>
                  <CustomInput
                    label="이름"
                    placeholder="이름"
                    onChangeText={setName}
                    value={name}
                    clearText={() => {
                      setName('');
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          {toastStatus && <Toast />}
        </View>
        {(step === 1 && name !== '') ||
        (step === 2 && name !== '' && birth !== '') ? (
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

const buttonStyles = (checkStatus: boolean) =>
  StyleSheet.create({
    btnView: {marginTop: checkStatus ? 24 : 0},
    timerView: {
      flex: 1,
      marginTop: checkStatus ? 24 : 0,
      marginLeft: 8,
    },
  });

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
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
    width: 38,
    height: 4,
    backgroundColor: color.blueGray_05,
  },
  contentWrap: {
    marginTop: 37,
  },
  stepText: {
    fontSize: 28,
    fontWeight: '600',
  },
  content: {
    marginTop: 50,
  },
  phoneView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  phoneNum: {width: '65%'},
  codeNum: {width: '55%'},
  timerText: {
    color: color.gray_04,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  certifyNumBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.mint_00,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color.mint_04,
  },
  certifyNumText: {
    color: color.mint_04,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  inputWrap: {marginTop: 36},
});
export default SignupScreen02;
