import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';
import {removeData} from '../../utils/AsyncStorage';
import {useRecoilState} from 'recoil';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';

const DropOutScreen = () => {
  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusState);
  const onDropOut = (): void => {
    getData('auth').then(auth => {
      axios
        .patch(
          url.dev + `users/${auth.userId}/withdrawal`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          if (res.data.isSuccess) {
            console.log(res.data.result);
            removeData('auth');
            setLoginStatus({isLogined: false});
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };
  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="탈퇴하기" />
      <View style={{marginTop: 40}}>
        <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
          정말 탈퇴하시겠습니까?
        </Text>
        <Text
          style={[Typography.body1, {color: color.blueGray_05, marginTop: 4}]}>
          탈퇴한 계정은 복구가 불가능합니다.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btnWrap}
        activeOpacity={0.5}
        onPress={onDropOut}>
        <Text style={[Typography.subtitle3, {color: color.blueGray_03}]}>
          네, 탈퇴하겠습니다.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
    paddingHorizontal: 20,
  },
  btnWrap: {
    borderWidth: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 5,
    borderColor: color.blueGray_00,
    backgroundColor: color.gray_00,
  },
});

export default DropOutScreen;
