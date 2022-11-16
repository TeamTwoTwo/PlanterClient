import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';
import Edit from '../../assets/icon/ic-edit.svg';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation<MainTabNavigationProp>();

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
        <MatchingHeader title="프로필 수정" />
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
        <Pressable
          onPress={() => {
            userInfo &&
              navigation.navigate('ProfileEditScreen', {
                nickname: userInfo.nickname,
              });
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
            {userInfo && userInfo.name}
          </Text>
          <Edit />
        </Pressable>
      </View>
      <View style={styles.block} />
      <View style={styles.infoArea}>
        <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
          기본정보
        </Text>
        <View style={{marginTop: 32}}>
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_04, marginBottom: 4},
            ]}>
            휴대폰번호
          </Text>
          <Text style={[Typography.body1, {color: color.blueGray_06}]}>
            {userInfo && userInfo.phone}
          </Text>
        </View>
        <View style={{marginTop: 26}}>
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_04, marginBottom: 4},
            ]}>
            주소지
          </Text>
          <View style={styles.addressBlock}>
            <Text
              style={[
                Typography.body1,
                {color: color.blueGray_06, width: '85%'},
              ]}>
              {userInfo && `${userInfo.address} ${userInfo.detailAddress}`}
            </Text>
            <Text style={[Typography.body1, {color: color.blueGray_01}]}>
              수정
            </Text>
          </View>
        </View>
        <View style={{marginTop: 32}}>
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_04, marginBottom: 4},
            ]}>
            이메일 주소
          </Text>
          <Text style={[Typography.body1, {color: color.blueGray_06}]}>
            {userInfo && userInfo.email}
          </Text>
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
  profile: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  addressBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
