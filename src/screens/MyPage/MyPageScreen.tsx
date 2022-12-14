import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, screen, Typography, url} from '../../utils/utils';
import Bulter from '../../assets/icon/ic-butler-badge.svg';
import ListItem from '../../components/MyPage/ListItem';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Expert from '../../assets/icon/ic-expert-badge.svg';
import Flower from '../../assets/icon/ic-flower-badge.svg';
import Care from '../../assets/icon/ic-care-badge.svg';
import Setting from '../../assets/icon/ic-setting.svg';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

interface userData {
  userId: number;
  name: string;
  nickname: string;
  profileImg: string;
  email: string;
  category: number;
  address: string;
  detailAddress: string;
  phone: string;
  isMatchingActive: boolean;
}

const MyPageScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [userInfo, setUserInfo] = useState<userData>();

  const onGoProfile = (): void => {
    navigation.navigate('ProfileScreen');
  };

  const onPressMyMatchingPage = () => {
    userInfo &&
      navigation.navigate('MyMatchingPageScreen', {
        category: userInfo?.category,
      });
  };

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
          ???????????????
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('SettingScreen');
          }}>
          <Setting />
        </Pressable>
      </View>
      <View style={styles.profileArea}>
        <View style={styles.rowArea}>
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
          <View>
            <View style={styles.rowArea}>
              <Text
                style={[
                  Typography.subtitle3,
                  {color: color.blueGray_06, marginRight: 5},
                ]}>
                {userInfo && userInfo.nickname}
              </Text>
              {userInfo && userInfo.category === 0 && (
                <>
                  <Bulter />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    ?????? ??????
                  </Text>
                </>
              )}
              {userInfo && userInfo.category === 1 && (
                <>
                  <Flower />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    ??????
                  </Text>
                </>
              )}
              {userInfo && userInfo.category === 2 && (
                <>
                  <Expert />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    ?????? ?????????
                  </Text>
                </>
              )}
              {userInfo && userInfo.category === 3 && (
                <>
                  <Care />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    ???????????? ?????????
                  </Text>
                </>
              )}
            </View>
            <View>
              <Text style={[Typography.body2, {color: color.blueGray_02}]}>
                {userInfo && userInfo.email}
              </Text>
            </View>
          </View>
        </View>
        <Pressable onPress={onGoProfile}>
          <Text style={[Typography.caption2, {color: color.blueGray_02}]}>
            ????????? ??????
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderColor: color.blueGray_00,
          marginBottom: 10,
        }}>
        <Pressable onPress={onPressMyMatchingPage}>
          <View style={styles.matchingBtnWrap}>
            <Text style={(Typography.body1, {color: color.blueGray_06})}>
              ??? ??????????????? ??????
            </Text>
            {userInfo?.isMatchingActive ? (
              <Text style={[Typography.subtitle3, {color: color.mint_05}]}>
                ON
              </Text>
            ) : (
              <Text style={[Typography.subtitle3, {color: color.blueGray_01}]}>
                OFF
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      <View>
        {/* <ListItem
          title="????????????"
          onPress={() => {
            navigation.navigate('AlarmScreen');
          }}
        /> */}
        <ListItem
          title="????????????"
          onPress={() => {
            navigation.navigate('NoticeScreen');
          }}
        />
        <ListItem
          title="????????????"
          onPress={() => {
            navigation.navigate('TOSDetail', {number: 1});
          }}
        />
        {/* <ListItem
          title="????????????"
          onPress={() => {
            navigation.navigate('ClientCenterScreen');
          }}
        /> */}
        <ListItem
          title="????????????"
          onPress={() => {
            navigation.navigate('EnterStoreScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const modalStyles = (modalWidth: number, modalHeight: number) =>
  StyleSheet.create({
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      backgroundColor: 'white',
      transform: [
        {translateX: -modalWidth * 0.5},
        {translateY: -modalHeight * 0.5},
      ],
      borderRadius: 8,
      width: screen.width - 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  header: {
    marginTop: 12,
    marginBottom: 35,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  rowArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchingBtnWrap: {
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFC',
    height: 52,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
});

export default MyPageScreen;
