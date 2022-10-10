import React from 'react';
import {color} from '../../utils/color';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PwDoneScreen = () => {
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>비밀번호 재설정이</Text>
        <Text style={styles.title}>완료되었습니다.</Text>
      </View>
      <View>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.nextBtn}>
            <Text style={styles.btnText}>로그인으로 돌아가기</Text>
          </View>
        </TouchableOpacity>
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
    paddingHorizontal: 33,
    marginTop: 120,
    // borderWidth: 1,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
    color: color.gray_07,
  },
  email: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
    color: color.blueGray_04,
  },
  nextBtn: {
    height: 90,
    backgroundColor: color.mint_05,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  btnText: {
    color: color.gray_00,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 14,
  },
});

export default PwDoneScreen;
