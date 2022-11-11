import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

interface userData {
  userId: number;
  name: string;
  profileImg: string;
  email: string;
  category: number;
  address: string;
  detailAddress: string;
  phone: string;
}

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState<userData>();

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + `users/${auth.userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          console.log(res.data.result);
          setUserInfo(res.data.result);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 20}}>
        <MatchingHeader title="프로필 보기" />
      </View>
      <View style={styles.profileArea}>
        {userInfo && (
          <Image
            style={styles.profile}
            source={
              userInfo.profileImg
                ? {uri: userInfo.profileImg}
                : require('../../assets/img/img-profile-default.png')
            }
          />
        )}
        <Text
          style={[
            Typography.subtitle2,
            {color: color.blueGray_06, marginTop: 12},
          ]}>
          {userInfo && userInfo.name}
        </Text>
      </View>
      <View style={styles.block} />
      <View style={styles.infoArea}>
        <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
          기본정보
        </Text>
        <View style={{marginTop: 32}}>
          <View style={styles.infoLine}>
            <Text
              style={[
                Typography.body1,
                {color: color.blueGray_04, width: '28%'},
              ]}>
              휴대폰번호
            </Text>
            <Text
              style={[
                Typography.body1,
                {color: color.blueGray_06, width: '72%'},
              ]}>
              {userInfo && userInfo.phone}
            </Text>
          </View>
          <View style={styles.infoLine}>
            <Text
              style={[
                Typography.body1,
                {
                  flexShrink: 1,
                  color: color.blueGray_04,
                  width: '28%',
                },
              ]}>
              주소지
            </Text>
            <Text
              style={[
                Typography.body1,
                {
                  color: color.blueGray_06,
                  flexShrink: 1,
                  width: '72%',
                },
              ]}>
              {userInfo && `${userInfo.address} ${userInfo.detailAddress}`}
            </Text>
          </View>
          <View style={styles.infoLine}>
            <Text
              style={[
                Typography.body1,
                {color: color.blueGray_04, width: '28%'},
              ]}>
              이메일주소
            </Text>
            <Text
              style={[
                Typography.body1,
                {color: color.blueGray_06, width: '72%'},
              ]}>
              {userInfo && userInfo.email}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  profileArea: {
    marginTop: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  block: {
    backgroundColor: '#FAFAFC',
    height: 12,
  },
  infoArea: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  infoLine: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
});

export default ProfileScreen;
