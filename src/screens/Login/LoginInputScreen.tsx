import React, {useState} from 'react';
import {color, url, Typography} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FindHeader from '../../components/common/FindHeader';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';

const LoginInputScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력
  const [showPasswordView, setShowPasswordView] = useState<boolean>(false);

  const onPressNext = (): void => {
    if (!showPasswordView) {
      setShowPasswordView(true);
      setStep(2);
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView style={{flex: 1}}>
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
              clearText={() => {
                setEmail('');
              }}
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
