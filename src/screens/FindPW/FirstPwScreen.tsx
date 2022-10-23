import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import FindHeader from '../../components/common/FindHeader';
import {color, url} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import Clean from '../../assets/icon/ic-clean.svg';
import CustomInput from '../../components/common/CustomInput';
import Toast from '../../components/common/Toast';
import Timer from '../../components/common/Timer';
import axios from 'axios';

interface ButtonRefProps {
  isLoading: boolean;
}

interface TimerProps {
  reset: boolean;
}

const FirstPwScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [isBtnShow, setIsBtnShow] = useState<boolean>(false);

  const [phoneNum, setPhoneNum] = useState<string>('');
  const [isPhoneShow, setIsPhoneShow] = useState<boolean>(false);

  const [certifyNum, setCertifyNum] = useState<string>('');
  const [isMessageShow, setIsMessageShow] = useState<boolean>(false);

  const [stage, setStage] = useState<number>(1);
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [certifyNumCheckStatus, setCertifyNumCheckStatus] =
    useState<boolean>(true);
  const [emailCheckStatus, setEmailCheckStatus] = useState<boolean>(true);
  const [phoneNumCheckStatus, setPhoneNumCheckStatus] = useState<boolean>(true);
  const [phoneNumErrorMsg, setPhoneNumErrorMsg] =
    useState<string>('휴대폰번호 형식을 확인해주세요.');
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const navigation = useNavigation<LoginStackNavigationProp>();
  const buttonRef = useRef<ButtonRefProps>({isLoading: false});
  const resetTimer = useRef<TimerProps>({reset: false});

  const onPress = (): void => {
    Keyboard.dismiss();
    setIsPhoneShow(true);
    setIsBtnShow(false);
    setStage(2);
  };

  const onSend = () => {
    Keyboard.dismiss();

    if (buttonRef.current.isLoading) {
      return;
    }

    buttonRef.current.isLoading = true;
    resetTimer.current.reset = true;

    axios
      .post(url.dev + 'auth/send-code', {phone: phoneNum})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setIsMessageShow(true);
          setShowTimer(true);
          if (!toastStatus) {
            setToastStatus(true);
          }
        }
      })
      .finally(() => {
        buttonRef.current.isLoading = false;
        resetTimer.current.reset = false;
      })
      .catch(e => {
        console.error(e);
      });
  };

  const onConfirm = (): void => {
    axios
      .post(url.dev + 'auth/verify-code', {phone: phoneNum, code: certifyNum})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigation.navigate('NewPwScreen');
        }
      })
      .catch(e => {
        setCertifyNumCheckStatus(false);
      });
  };

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  useEffect(() => {
    if (email.length === 0) {
      setIsBtnShow(false);
    } else {
      setIsBtnShow(true);
    }
  }, [email]);

  useEffect(() => {
    emailCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // 이메일 형식 체크 정규식
  const emailRegExp = (str: string) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(str);
  };

  // 이메일 형식 체크 함수
  const emailCheckFunc = () => {
    if (emailRegExp(email) || email.length === 0) {
      setEmailCheckStatus(true);
    } else {
      setEmailCheckStatus(false);
    }
  };

  useEffect(() => {
    phoneNumCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNum]);

  const phoneNumRegExp = (str: string) => {
    var regExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    return regExp.test(str);
  };

  const phoneNumCheckFunc = () => {
    if (phoneNumRegExp(phoneNum) || phoneNum.length === 0) {
      setPhoneNumCheckStatus(true);
    } else if (!phoneNumRegExp(phoneNum)) {
      setPhoneNumCheckStatus(false);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>비밀번호 재설정</Text>
            </View>
            {isPhoneShow && (
              <View style={styles.phoneInputWrap}>
                <View style={styles.phoneInput}>
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
                    activeOpacity={1}
                    onPress={onSend}
                    disabled={
                      phoneNum === '' || !phoneNumCheckStatus ? true : false
                    }
                    style={[
                      styles.messageBtn,
                      {
                        backgroundColor:
                          phoneNum === '' ? 'white' : color.mint_00,
                        borderColor:
                          phoneNum === '' ? color.gray_03 : color.mint_04,
                      },
                    ]}>
                    {isMessageShow ? (
                      <Text
                        style={[
                          styles.messageBtnText,
                          {
                            color:
                              phoneNum === '' ? color.gray_05 : color.mint_05,
                          },
                        ]}>
                        인증번호 재전송
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.messageBtnText,
                          {
                            color:
                              phoneNum === '' ? color.gray_05 : color.mint_05,
                          },
                        ]}>
                        인증번호 전송
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {isMessageShow && (
              <View style={[styles.phoneInputWrap, {marginTop: 36}]}>
                <View style={styles.numInput}>
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
                  <View style={buttonStyles(certifyNumCheckStatus).timerView}>
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
                    onPress={onConfirm}>
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
                </View>
              </View>
            )}
            <View style={styles.emailInputWrap}>
              <CustomInput
                label="이메일"
                placeholder="이메일"
                errorText="이메일 주소를 확인해주세요."
                type="email-address"
                onChangeText={setEmail}
                value={email}
                clearText={() => {
                  setEmail('');
                }}
                checkStatus={emailCheckStatus}
              />
            </View>
          </ScrollView>
          {toastStatus && <Toast />}
        </View>
        {isBtnShow && stage === 1 && (
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View style={styles.nextBtn}>
              <Text style={styles.btnText}>다음</Text>
            </View>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const buttonStyles = (checkStatus: boolean) =>
  StyleSheet.create({
    btnView: {
      marginTop: checkStatus ? 24 : 0,
    },
    timerView: {
      flex: 1,
      marginTop: checkStatus ? 24 : 0,
      marginLeft: 8,
    },
  });

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: color.gray_04,
  },
  block: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleWrap: {
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: color.gray_07,
  },
  nameInput: {
    fontSize: 16,
    color: color.gray_07,
    borderBottomWidth: 1,
    borderColor: color.gray_04,
    height: 48,
  },
  phoneInput: {
    width: '65%',
  },
  numInput: {
    width: '55%',
  },
  phoneInputWrap: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
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
  emailInputWrap: {
    marginTop: 50,
  },
  empty: {
    flex: 1,
  },
  messageBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.mint_00,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color.mint_04,
  },
  messageBtnText: {
    color: color.mint_04,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  messageWrap: {
    width: 95,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
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
});

export default FirstPwScreen;
