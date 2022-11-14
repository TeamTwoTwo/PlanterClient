import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Enter from '../../assets/icon/ic-enter-illust.svg';

const EnterStoreScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="입점신청" />
      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Enter />
      </View>
      <View style={{marginTop: 20}}>
        <Text style={[Typography.body1, {color: color.blueGray_05}]}>
          식물 전문가, 꽃집, 식물케어 서비스
        </Text>
        <Text style={[Typography.body1, {color: color.blueGray_05}]}>
          입정 신청을 원한다면?
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[Typography.subtitle3, {color: color.blueGray_05}]}>
            example@planter.kr
          </Text>
          <Text style={[Typography.body1, {color: color.blueGray_05}]}>
            으로
          </Text>
        </View>
        <Text style={[Typography.body1, {color: color.blueGray_05}]}>
          식물 전문가임을 증명할 수 있는 자격증/신분증 사본과 권한이 부여될 계정
          아이디를 보내주세요.
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={[Typography.body1, {color: color.blueGray_05}]}>
          (신분증의 주민등록번호는 가려서 보내주세요.)
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
    paddingHorizontal: 20,
  },
});

export default EnterStoreScreen;
