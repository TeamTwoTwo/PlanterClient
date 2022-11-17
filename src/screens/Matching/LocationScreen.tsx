import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import Place from '../../assets/icon/ic-place.svg';
import MatchingHeader from '../../components/matching/MatchingHeader';
import {MainTabNavigationProp} from '../MainTab';
import {useNavigation} from '@react-navigation/native';
import {getData, setData} from '../../utils/AsyncStorage';
import {useRecoilState} from 'recoil';
import {signupState} from '../../recoil/atoms/signup';
import axios from 'axios';

const LocationScreen = ({route}: any) => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const {simpleAddress, locationAddress, userId} = route?.params;
  const [signupInfo, setSignupState] = useRecoilState(signupState);

  console.log(simpleAddress, locationAddress, userId);

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .patch(
          url.dev + `users/${userId}/location`,
          {
            address: locationAddress,
            detailAddress: '',
            simpleAddress: simpleAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          console.log('수정하겟습니다.');
          console.log(res.data.result);
          let signupInfoTmp = {...signupInfo};
          signupInfoTmp.address = res.data.result.address;
          signupInfoTmp.detailAddress = res.data.result.detailAddress;
          signupInfoTmp.simpleAddress = res.data.result.simpleAddress;
          setData('userInfo', signupInfoTmp);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, [locationAddress, signupInfo, simpleAddress, userId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MatchingHeader title="위치 설정" />
      <View style={styles.location}>
        <Text style={styles.title}>현재 위치</Text>
        <View style={styles.address}>
          <Place />
          <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
            {simpleAddress}
          </Text>
        </View>
        <Text style={[styles.subAddress, Typography.body2]}>
          {locationAddress}
        </Text>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.btn}
          onPress={() => {
            navigation.navigate('AddressScreen');
          }}>
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
