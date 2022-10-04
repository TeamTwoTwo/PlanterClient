import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import CustomInput from '../../components/common/CustomInput';
import {color} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../LoginStack';
import CustomButton from '../../components/common/CustomButton';

const {StatusBarManager} = NativeModules;

const SignupScreen03 = ({route}: any) => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  const addr = route.params?.address;
  const [statusBarHeight, setStatusBarHeight] = useState<any>(); //상태바 높이 저장
  const [showAddressView, setShowAddressView] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 다음 버튼을 위한 입력 단계

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  useEffect(() => {
    setAddress(addr);
  }, [addr]);

  const onPressNext = () => {
    if (!showAddressView) {
      setShowAddressView(true);
      setStep(2);
    } else {
      navigation.navigate('Signup04');
    }
  };

  const onPressAddress = () => {
    navigation.navigate('FindAddress');
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
              {showAddressView && (
                <View style={styles.addressView}>
                  <View style={styles.address}>
                    <CustomInput
                      label="주소"
                      placeholder="주소"
                      onChangeText={setAddress}
                      value={address}
                      disabled
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.addressBtn}
                    activeOpacity={0.5}
                    onPress={onPressAddress}>
                    <Text style={styles.addressBtnText}>주소 검색</Text>
                  </TouchableOpacity>
                </View>
              )}
              {address !== '' && (
                <View style={styles.inputWrap}>
                  <CustomInput
                    label="상세 주소"
                    placeholder="상세 주소"
                    onChangeText={setAddressDetail}
                    value={addressDetail}
                    clearText={() => {
                      setAddressDetail('');
                    }}
                  />
                </View>
              )}
              <View style={styles.inputWrap}>
                <CustomInput
                  label="닉네임"
                  placeholder="닉네임"
                  errorText="이메일 주소를 확인해주세요."
                  type="email-address"
                  onChangeText={setNickname}
                  value={nickname}
                  clearText={() => {
                    setNickname('');
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        {(step === 1 && nickname !== '') ||
        (nickname !== '' && addressDetail !== '') ? (
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
    width: 57,
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
  addressView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  address: {width: '65%'},
  addressBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.mint_00,
    paddingVertical: 8,
    paddingHorizontal: 23.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color.mint_04,
  },
  addressBtnText: {
    color: color.mint_04,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  inputWrap: {marginTop: 36},
});
export default SignupScreen03;
