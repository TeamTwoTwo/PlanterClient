import React from 'react';
import {color} from '../../utils/utils';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const IdNoneScreen = () => {
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.nextBlock}>
        <TouchableOpacity>
          <Text style={styles.nextText}>다음에 하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>아이디가</Text>
        <Text style={styles.title}>존재하지 않습니다.</Text>
        <View style={styles.textWrap}>
          <Text style={styles.text}>지금 회원가입하고 플랜터의 ~를</Text>
          <Text style={styles.text}>경험해보세요.</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.nextBtn}>
            <Text style={styles.btnText}>회원가입 하기</Text>
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
  nextBlock: {
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  nextText: {
    fontSize: 14,
    color: color.gray_05,
    textDecorationLine: 'underline',
  },
  titleWrap: {
    paddingHorizontal: 33,
    marginTop: 72,
    // borderWidth: 1,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
    color: color.gray_07,
  },
  textWrap: {
    marginTop: 11,
  },
  text: {
    fontSize: 16,
    color: color.gray_05,
    marginBottom: 2,
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

export default IdNoneScreen;
