import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet, View} from 'react-native';
import {color} from '../../utils/utils';
import CustomButton from '../../components/common/CustomButton';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {signupState} from '../../recoil/atoms/signup';
import {authState} from '../../recoil/atoms/auth';
import {setData} from '../../utils/AsyncStorage';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';
import Flowerpot from '../../assets/icon/ic-flowerpot.svg';

const SignupScreen04 = () => {
  const signupInfo = useRecoilValue(signupState);
  const authInfo = useRecoilValue(authState);
  const setLoginStatus = useSetRecoilState(LoginStatusState);

  const moveToMatching = () => {
    //어싱크 스토리지에 signupInfo, authState 넣음
    setData('userInfo', signupInfo);
    setData('auth', authInfo);
    setLoginStatus({isLogined: true});
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrap}>
        <View style={styles.textView}>
          <Text style={styles.mainText}>회원가입 완료!</Text>
          <Text style={styles.subText}>
            플랜터의 식물 전문가들과 만나보세요!
          </Text>
        </View>
        <Flowerpot />
      </View>
      <CustomButton
        backgroundColor={color.mint_05}
        text="시작하기"
        onPress={moveToMatching}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    alignItems: 'center',
    marginBottom: 38,
  },
  mainText: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
  },
  subText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: color.gray_05,
  },
  illustView: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: 280,
    height: 280,
    backgroundColor: color.gray_03,
  },
});
export default SignupScreen04;
