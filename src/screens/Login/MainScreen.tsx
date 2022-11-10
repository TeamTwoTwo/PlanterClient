import React from 'react';
import {color, url, Typography} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleLogo from '../../assets/icon/ic-title-logo.svg';
import FlowerPot from '../../assets/icon/ic-flowerpot.svg';

const MainScreen = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  const onSignupPress = (): void => {
    navigation.navigate('TermsOfService');
  };

  const onLoginPress = (): void => {
    navigation.navigate('LoginInputScreen');
  };

  const onIdPress = (): void => {
    navigation.navigate('FirstScreen');
  };

  const onPwPress = (): void => {
    navigation.navigate('FirstPwScreen');
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView>
        <View style={styles.titleWrap}>
          <Text style={[Typography.h1, {color: color.blueGray_06}]}>
            함께 키우는
          </Text>
          <Text style={[Typography.h1, {color: color.blueGray_06}]}>
            반려식물
          </Text>
          <View style={{marginTop: 10}}>
            <TitleLogo />
          </View>
        </View>
        <View style={styles.flowerpotWrap}>
          <FlowerPot />
        </View>
        <View style={styles.loginBtnWrap}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.loginBtn}
            onPress={onLoginPress}>
            <Text style={[Typography.subtitle3, {color: color.gray_00}]}>
              로그인 하기
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpBtnWrap}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.signUpBtn}
            onPress={onSignupPress}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_03}]}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.underWrap}>
          <Pressable onPress={onIdPress}>
            <Text style={[Typography.body2, {color: color.gray_05}]}>
              아이디 찾기
            </Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable onPress={onPwPress}>
            <Text style={[Typography.body2, {color: color.gray_05}]}>
              비밀번호 찾기
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
    paddingHorizontal: 30,
  },
  titleWrap: {
    marginTop: 124,
  },
  flowerpotWrap: {
    // borderWidth: 1,
    marginTop: 76,
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  loginBtn: {
    height: 52,
    backgroundColor: color.mint_05,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpBtnWrap: {
    marginTop: 12,
  },
  signUpBtn: {
    height: 52,
    backgroundColor: color.gray_00,
    borderColor: color.blueGray_00,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  underWrap: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 13,
    borderRightWidth: 1,
    borderColor: color.gray_03,
    marginLeft: 21,
    marginRight: 17,
  },
});

export default MainScreen;
