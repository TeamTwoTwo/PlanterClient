import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  NativeModules,
  Alert,
} from 'react-native';
import CustomInput from '../../components/common/CustomInput';
import {color} from '../../utils/color';
import {LoginStackNavigationProp} from '../LoginStack';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/common/CustomButton';
import Toast from '../../components/common/Toast';
import Timer from '../../components/common/Timer';

const {StatusBarManager} = NativeModules;

const SignupScreen02 = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [statusBarHeight, setStatusBarHeight] = useState<any>(); //상태바 높이 저장
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

  const [toastStatus, setToastStatus] = useState<boolean>(false);

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  useEffect(() => {
    birthCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birth]);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

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
    //추후에 조건을 "인증번호 api 요청 성공하면" 으로 변경 예정
    if (phoneNum !== '') {
      setShowCertifyNumView(true);
      setSendCertifyNumText('인증번호 재전송');
      if (!toastStatus) {
        setToastStatus(true);
      }
    }
  };

  const onPressCheckCertifyNum = () => {
    if (certifyNumCheckStatus && birthCheckStatus && name !== '') {
      navigation.navigate('Signup03', {address: ''});
    } else {
      Alert.alert('잘못된 정보가 있습니다.');
    }
  };

  const birthRegExp = (str: string) => {
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
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? statusBarHeight + 44 : 0
        }
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
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
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.certifyNumBtn,
                      {
                        backgroundColor:
                          phoneNum === '' ? 'white' : color.mint_00,
                        borderColor:
                          phoneNum === '' ? color.gray_05 : color.mint_04,
                      },
                    ]}
                    activeOpacity={1}
                    onPress={onPressSendCertifyNum}>
                    <Text
                      style={[
                        styles.certifyNumText,
                        {
                          color:
                            phoneNum === '' ? color.gray_05 : color.mint_05,
                        },
                      ]}>
                      {sendCertifyNumText}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {showCertifyNumView && (
                <View style={[styles.phoneView, {marginTop: 36}]}>
                  <View style={styles.phoneNum}>
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
                  <TouchableOpacity
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
                            certifyNum === '' ? color.gray_05 : color.mint_05,
                        },
                      ]}>
                      인증번호 확인
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.timerView}>
                    <Text style={styles.timerText}>
                      남은시간 {<Timer mm={3} />}
                    </Text>
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
        </View>
        {(step === 1 && name !== '') ||
        (step === 2 && name !== '' && birth !== '') ? (
          <View style={styles.btnWrap}>
            <CustomButton
              backgroundColor={color.mint_05}
              text="다음"
              onPress={onPressNext}
            />
          </View>
        ) : null}
        {toastStatus && <Toast />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 24,
  },
  container: {
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'relative',
  },
  phoneNum: {width: '65%'},
  timerView: {
    position: 'absolute',
    bottom: -22,
  },
  timerText: {
    color: color.red_02,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
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
  btnWrap: {
    marginLeft: -24,
  },
  inputWrap: {marginTop: 36},
});
export default SignupScreen02;
