import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet, View} from 'react-native';
import {color} from '../../utils/color';
import CustomButton from '../../components/common/CustomButton';

const SignupScreen04 = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrap}>
        <View style={styles.textView}>
          <Text style={styles.mainText}>회원가입 완료!</Text>
          <Text style={styles.subText}>플랜터와 ~한 을 경험해보세요</Text>
        </View>
        <View style={styles.illustView}>
          <View style={styles.illust} />
        </View>
      </View>
      <CustomButton
        backgroundColor={color.mint_05}
        text="시작하기"
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  wrap: {
    flex: 1,
  },
  textView: {
    marginTop: 146,
    alignItems: 'center',
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
