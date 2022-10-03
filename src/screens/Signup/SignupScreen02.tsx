import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  Alert,
} from 'react-native';
import CustomInput from '../../components/common/CustomInput';
import {color} from '../../utils/color';
import {LoginStackNavigationProp} from '../LoginStack';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/common/CustomButton';

const width = Dimensions.get('window').width;
const {StatusBarManager} = NativeModules;

const SignupScreen02 = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [statusBarHeight, setStatusBarHeight] = useState<any>(); //상태바 높이 저장
  const [showBirthView, setShowBirthView] = useState<boolean>(false);
  const [showPhoneView, setShowPhoneView] = useState<boolean>(false);
  const [showCertifyNumView, setShowCertifyNumView] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<string>('');
  const [certifyNum, setCertifyNum] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력 단계

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const handlePressNext = () => {
    if (!showBirthView) {
      setShowBirthView(true);
      setStep(2);
    } else if (!showPhoneView) {
      setShowPhoneView(true);
      setStep(3);
    }
  };

  const handlePressSendCertifyNum = () => {
    if (phoneNum !== '') {
      setShowCertifyNumView(true);
    }
  };

  const handlePressCheckCertifyNum = () => {
    if (certifyNum !== '' && birth !== '' && name !== '') {
      navigation.navigate('Signup03', {address: ''});
    } else {
      Alert.alert('잘못된 정보가 있습니다.');
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
                    onPress={handlePressSendCertifyNum}>
                    <Text
                      style={[
                        styles.certifyNumText,
                        {
                          color:
                            phoneNum === '' ? color.gray_05 : color.mint_05,
                        },
                      ]}>
                      인증번호 전송
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
                    onPress={handlePressCheckCertifyNum}>
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
              )}
              {showBirthView && (
                <View style={styles.inputWrap}>
                  <CustomInput
                    label="생년월일 6자리"
                    placeholder="생년월일 6자리"
                    type="numeric"
                    onChangeText={setBirth}
                    value={birth}
                    clearText={() => {
                      setBirth('');
                    }}
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
          <View>
            <CustomButton
              backgroundColor={color.mint_05}
              text="다음"
              onPress={handlePressNext}
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
  },
  phoneNum: {width: '65%'},
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
