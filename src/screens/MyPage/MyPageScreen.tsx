import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, screen, Typography, url} from '../../utils/utils';
import Bulter from '../../assets/icon/ic-butler-badge.svg';
import ListItem from '../../components/MyPage/ListItem';
import Modal from '../../components/common/Modal';
import {removeData} from '../../utils/AsyncStorage';
import {useRecoilState} from 'recoil';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';
import Expert from '../../assets/icon/ic-expert-badge.svg';
import Flower from '../../assets/icon/ic-flower-badge.svg';
import Care from '../../assets/icon/ic-care-badge.svg';

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

const MyPageScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusState);
  const [userInfo, setUserInfo] = useState<userData>();

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  const onLogoutModal = (): void => {
    setIsModalShown(true);
  };

  const onCancel = (): void => {
    setIsModalShown(false);
  };

  const onDropOut = (): void => {
    navigation.navigate('DropOutScreen');
  };

  const onGoProfile = (): void => {
    navigation.navigate('ProfileScreen');
  };

  const onTOSDetail = (): void => {
    navigation.navigate('TOSDetail', {number: 1});
  };

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
      <View style={styles.header}>
        <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
          마이페이지
        </Text>
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
                {userInfo && userInfo.name}
              </Text>
              {userInfo && userInfo.category === 0 && (
                <>
                  <Bulter />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    식물 집사
                  </Text>
                </>
              )}
              {userInfo && userInfo.category === 1 && (
                <>
                  <Flower />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    꽃집
                  </Text>
                </>
              )}
              {userInfo && userInfo.category === 2 && (
                <>
                  <Expert />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    식물 전문가
                  </Text>
                </>
              )}
              {userInfo && userInfo.category === 3 && (
                <>
                  <Care />
                  <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                    식물케어 서비스
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
            프로필 보기
          </Text>
        </Pressable>
      </View>
      <View>
        <ListItem title="이용약관" onPress={onTOSDetail} />
        <ListItem title="로그아웃" onPress={onLogoutModal} />
        <ListItem title="탈퇴하기" onPress={onDropOut} />
      </View>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay cancel>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Text style={[styles.title, Typography.subtitle2]}>로그아웃</Text>
          <Text style={[Typography.body1, {color: color.blueGray_05}]}>
            정말 로그아웃 하시겠습니까?
          </Text>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={0.5}
              onPress={onCancel}>
              <Text style={[Typography.subtitle3, {color: color.blueGray_05}]}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={0.5}
              onPress={() => {
                removeData('auth');
                setLoginStatus({isLogined: false});
              }}>
              <Text style={[Typography.subtitle3, {color: color.mint_05}]}>
                로그아웃
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  profileArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: color.blueGray_00,
    marginBottom: 20,
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
  title: {
    marginTop: 40,
    marginBottom: 8,
    color: color.blueGray_06,
  },
  buttonArea: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    // borderWidth: 1,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    flex: 1,
    // borderWidth: 1,
  },
});

export default MyPageScreen;
