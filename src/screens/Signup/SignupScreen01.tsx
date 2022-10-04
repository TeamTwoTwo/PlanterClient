import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
} from 'react-native';
import CustomInput from '../../components/common/CustomInput';
import {color} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../LoginStack';
import CustomButton from '../../components/common/CustomButton';

const {StatusBarManager} = NativeModules;

const SignupScreen01 = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [statusBarHeight, setStatusBarHeight] = useState<any>(); //상태바 높이 저장
  const [showPasswordView, setShowPasswordView] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력 단계

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const onPressNext = () => {
    if (!showPasswordView) {
      setShowPasswordView(true);
      setStep(2);
    } else {
      navigation.navigate('Signup02');
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
            <Text style={styles.stepText}>회원가입</Text>
            <View style={styles.content}>
              {showPasswordView ? (
                <>
                  <View style={{marginTop: 10}}>
                    <CustomInput
                      label="비밀번호"
                      placeholder="비밀번호"
                      errorText="비밀번호를 확인해주세요."
                      secure={true}
                      onChangeText={setPassword}
                      value={password}
                      clearText={() => {
                        setPassword('');
                      }}
                    />
                  </View>
                  <View style={styles.inputWrap}>
                    <CustomInput
                      label="비밀번호 확인"
                      placeholder="비밀번호 확인"
                      errorText="비밀번호를 확인해주세요."
                      secure={true}
                      onChangeText={setCheckPassword}
                      value={checkPassword}
                      clearText={() => {
                        setCheckPassword('');
                      }}
                    />
                  </View>
                </>
              ) : null}
              <View style={styles.inputWrap}>
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
                />
              </View>
            </View>
          </View>
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
