import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils';
import Place from '../../assets/icon/ic-place';
import MatchingHeader from '../../components/matching/MatchingHeader';

const LocationScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MatchingHeader title="위치 설정" />
      <View style={styles.location}>
        <Text style={styles.title}>현재 위치</Text>
        <View style={styles.address}>
          <Place size={20} />
          <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
            서울 서대문구 연희동
          </Text>
        </View>
        <Text style={[styles.subAddress, Typography.body2]}>연희로12길 34</Text>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity activeOpacity={1} style={styles.btn}>
          <View style={styles.textWrap}>
            <Text style={[Typography.subtitle3, {color: color.mint_05}]}>
              주소 변경
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.gray_00,
    paddingHorizontal: 24,
  },
  location: {
    // borderWidth: 1,
    paddingVertical: 20,
  },
  title: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: color.blueGray_03,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  subAddress: {
    marginLeft: 20,
    color: color.blueGray_04,
  },
  btn: {
    borderWidth: 1,
    borderColor: color.mint_05,
    borderRadius: 6,
  },
  btnWrap: {
    marginTop: 20,
  },
  textWrap: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationScreen;
