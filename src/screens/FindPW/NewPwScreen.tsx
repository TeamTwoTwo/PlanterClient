import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import FindHeader from '../../components/common/FindHeader';
import {color} from '../../utils/color';

const NewPwScreen = () => {
  return (
    <SafeAreaView style={styles.block}>
      <View>
        <FindHeader />
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>새 비밀번호 등록</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 24,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: color.gray_04,
  },
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
  },
  titleWrap: {
    paddingHorizontal: 24,
    paddingTop: 30,
    // borderWidth: 1,
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: color.gray_07,
  },
});

export default NewPwScreen;
