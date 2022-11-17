import React from 'react';
import {color, url, Typography, screen} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleLogo from '../../assets/icon/ic-title-logo.svg';
import FlowerPot from '../../assets/icon/ic-flowerpot.svg';
import CustomButton from '../../components/common/CustomButton';
import {getBottomSpace} from 'react-native-iphone-x-helper';

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

  console.log(screen.height);

  return (
    <SafeAreaView style={styles.block}>
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
      <View style={styles.btnWrap}>
        <CustomButton
          backgroundColor={color.mint_05}
          text="로그인 하기"
          onPress={onLoginPress}
          borderRadius={6}
        />
        <CustomButton
          text="회원가입"
          borderRadius={6}
          backgroundColor={color.gray_00}
          style={styles.cancelBtnStyle}
          textStyle={{color: color.blueGray_03}}
          onPress={onSignupPress}
        />
        {/* <View style={styles.underWrap}>
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
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
  },
  titleWrap: {
    paddingHorizontal: 30,
    width: screen.width,
    marginTop: 124,
  },
  flowerpotWrap: {
    paddingHorizontal: 30,
    alignItems: 'flex-end',
    width: screen.width,
    position: 'absolute',
    bottom: getBottomSpace() + 248,
  },
  underWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {
    height: 13,
    borderRightWidth: 1,
    borderColor: color.gray_03,
    marginLeft: 21,
    marginRight: 17,
  },
  cancelBtnStyle: {
    borderWidth: 1,
    borderColor: color.blueGray_00,
    marginTop: 12,
  },
  btnWrap: {
    paddingHorizontal: 30,
    width: screen.width,
    position: 'absolute',
    bottom: getBottomSpace() + 40,
  },
});

export default MainScreen;
