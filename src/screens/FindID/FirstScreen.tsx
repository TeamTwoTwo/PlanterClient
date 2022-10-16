import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import FindHeader from '../../components/common/FindHeader';
import {color} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import Clean from '../../assets/icon/ic-clean.svg';
import CustomInput from '../../components/common/CustomInput';
import Toast from '../../components/common/Toast';
import Timer from '../../components/common/Timer';

const FirstScreen = () => {
  const [name, setName] = useState<string>('');
  const [isBtnShow, setIsBtnShow] = useState<boolean>(false);

  const [phoneNum, setPhoneNum] = useState<string>('');
  const [isPhoneShow, setIsPhoneShow] = useState<boolean>(false);

  const [certifyNum, setCertifyNum] = useState<string>('');
  const [isMessageShow, setIsMessageShow] = useState<boolean>(false);

  const [stage, setStage] = useState<number>(1);
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [certifyNumCheckStatus, setCertifyNumCheckStatus] =
    useState<boolean>(true);

  const navigation = useNavigation<LoginStackNavigationProp>();

  const onPress = (): void => {
    Keyboard.dismiss();
    setIsPhoneShow(true);
    setIsBtnShow(false);
    setStage(2);
  };

  const onSend = () => {
    Keyboard.dismiss();
    setIsMessageShow(true);
    setToastStatus(true);
  };

  const onConfirm = (): void => {
    navigation.navigate('IdDoneScreen');
  };

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  useEffect(() => {
    if (name.length === 0) {
      setIsBtnShow(false);
    } else {
      setIsBtnShow(true);
    }
  }, [name]);

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
              <Text style={styles.title}>아이디 찾기</Text>
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
                  />
                </View>
                <View style={styles.messageWrap}>
                  <TouchableOpacity activeOpacity={1} onPress={onSend}>
                    <View
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
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {isMessageShow && (
              <View style={styles.phoneInputWrap}>
                <View style={styles.phoneInput}>
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
                  <View style={styles.timerView}>
                    <Text style={styles.timerText}>
                      남은시간 {<Timer mm={3} />}
                    </Text>
                  </View>
                </View>
                <View style={styles.certifyNumWrap}>
                  <TouchableOpacity activeOpacity={1} onPress={onConfirm}>
                    <View
                      style={[
                        styles.messageBtn,
                        {
                          backgroundColor:
                            certifyNum === '' ? 'white' : color.mint_00,
                          borderColor:
                            certifyNum === '' ? color.gray_03 : color.mint_04,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.messageBtnText,
                          {
                            color:
                              certifyNum === '' ? color.gray_05 : color.mint_05,
                          },
                        ]}>
                        인증번호 확인
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={styles.nameInputWrap}>
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
          </ScrollView>
        </View>
        {isBtnShow && stage === 1 && (
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View style={styles.nextBtn}>
              <Text style={styles.btnText}>다음</Text>
            </View>
          </TouchableOpacity>
        )}
        {toastStatus && <Toast />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  label: {
    paddingHorizontal: 24,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: color.gray_04,
  },
  block: {
    paddingHorizontal: 24,
    flex: 1,
  },
  titleWrap: {
    paddingTop: 30,
    // borderWidth: 1,
    marginBottom: 60,
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
    width: 250,
  },
  phoneInputWrap: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  messageBtn: {
    height: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.gray_03,
    borderRadius: 6,
  },
  messageBtnText: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontSize: 12,
  },
  messageWrap: {
    width: 95,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  certifyNumWrap: {
    width: 95,
    justifyContent: 'flex-end',
    paddingBottom: 35,
  },
  timerView: {
    marginTop: 5,
  },
  timerText: {
    color: color.red_02,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default FirstScreen;
