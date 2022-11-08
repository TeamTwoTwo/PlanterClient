import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/common/CustomButton';
import MatchingHeader from '../../components/matching/MatchingHeader';
import {color, screen, Typography} from '../../utils/utils';

const MatchingRequestScreen03 = () => {
  const [go, setGo] = useState<boolean>(false);
  const [come, setCome] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <MatchingHeader title="픽업 형태" />
      </View>
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarOuter}>
          <View style={styles.progressBarInner} />
        </View>
      </View>
      <View style={[styles.main, styles.padding]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setGo(true);
            setCome(false);
          }}>
          <View style={dstyles(go).item}>
            <View style={styles.illust} />
            <View style={styles.textWrap}>
              <Text style={[Typography.subtitle3, {color: color.blueGray_02}]}>
                제가 매칭 상대의 주소에 갈게요
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{marginTop: 20}}
          onPress={() => {
            setGo(false);
            setCome(true);
          }}>
          <View style={dstyles(come).item}>
            <View style={styles.illust} />
            <View style={styles.textWrap}>
              <Text style={[Typography.subtitle3, {color: color.blueGray_02}]}>
                매칭 상대가 제 주소로 와주세요
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <CustomButton
          text="다음"
          onPress={() => {}}
          backgroundColor={color.mint_05}
          style={{width: screen.width}}
          disabled={!go && !come ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

const dstyles = (type: boolean) =>
  StyleSheet.create({
    item: {
      borderRadius: 6,
      borderWidth: 2,
      borderColor: type ? color.mint_05 : color.blueGray_00,
      paddingTop: 30,
      paddingBottom: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  padding: {
    paddingHorizontal: 20,
  },
  progressBarWrap: {
    width: screen.width,
  },
  progressBarOuter: {
    height: 2,
    backgroundColor: color.blueGray_00,
  },
  progressBarInner: {
    width: '75%',
    height: 2,
    backgroundColor: color.blueGray_06,
  },
  main: {
    marginTop: 32,
    flex: 1,
  },
  illust: {
    width: 240,
    height: 140,
    backgroundColor: '#D9D9D9',
  },
  textWrap: {
    marginTop: 12,
  },
});
export default MatchingRequestScreen03;
