import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilState} from 'recoil';
import CustomButton from '../../components/common/CustomButton';
import MatchingHeader from '../../components/matching/MatchingHeader';
import {MatchingRequestInfoState} from '../../recoil/atoms/matchingRequest';
import {color, screen, Typography} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import NoGo from '../../assets/illust/illust-no-go.svg';
import Go from '../../assets/illust/illust-go.svg';
import NoCome from '../../assets/illust/illust-no-come.svg';
import Come from '../../assets/illust/illust-come.svg';

const MatchingRequestScreen03 = () => {
  const [MatchingRequestInfo, setMatchingRequestInfo] = useRecoilState(
    MatchingRequestInfoState,
  );
  const navigation = useNavigation<MainTabNavigationProp>();
  const [go, setGo] = useState<boolean>(false);
  const [come, setCome] = useState<boolean>(false);

  const onNavigate = () => {
    setMatchingRequestInfo({...MatchingRequestInfo, pickUpType: go ? 0 : 1});
    navigation.navigate('MatchingRequestScreen04');
  };

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
      <View style={styles.main}>
        <TouchableOpacity
          style={dstyles(go).item}
          activeOpacity={1}
          onPress={() => {
            setGo(true);
            setCome(false);
          }}>
          {go ? (
            <>
              <Go />
            </>
          ) : (
            <>
              <NoGo />
            </>
          )}
          <Text
            style={[
              Typography.subtitle3,
              {
                color: go ? color.blueGray_06 : color.blueGray_02,
                textAlign: 'center',
              },
            ]}>
            제가 매칭 상대의
          </Text>
          <Text
            style={[
              Typography.subtitle3,
              {
                color: go ? color.blueGray_06 : color.blueGray_02,
                textAlign: 'center',
              },
            ]}>
            주소로 갈게요
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={dstyles(come).item}
          activeOpacity={1}
          onPress={() => {
            setGo(false);
            setCome(true);
          }}>
          {come ? (
            <>
              <Come />
            </>
          ) : (
            <>
              <NoCome />
            </>
          )}
          <Text
            style={[
              Typography.subtitle3,
              {
                color: come ? color.blueGray_06 : color.blueGray_02,
                textAlign: 'center',
              },
            ]}>
            매칭 상대가
          </Text>
          <Text
            style={[
              Typography.subtitle3,
              {
                color: come ? color.blueGray_06 : color.blueGray_02,
                textAlign: 'center',
              },
            ]}>
            제 주소로 와주세요
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <CustomButton
          text="다음"
          onPress={onNavigate}
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
      borderWidth: type ? 2 : 1,
      borderColor: type ? color.mint_05 : color.blueGray_00,
      height: 244,
      paddingHorizontal: 24,
      width: screen.width / 2 - 26,
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
    marginTop: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
export default MatchingRequestScreen03;
