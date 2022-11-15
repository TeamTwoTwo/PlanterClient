import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url, screen} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Modal from '../../components/common/Modal';
import ListItem from '../../components/MyPage/ListItem';
import {removeData} from '../../utils/AsyncStorage';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';
import {useRecoilState} from 'recoil';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusState);
  const navigation = useNavigation<MainTabNavigationProp>();
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 20}}>
        <MatchingHeader title="설정" />
        <Pressable style={styles.btnWrap} onPress={onLogoutModal}>
          <Text style={styles.btnText}>로그아웃</Text>
        </Pressable>
        <Pressable
          style={styles.btnWrap}
          onPress={() => {
            navigation.navigate('DropOutScreen');
          }}>
          <Text style={styles.btnText}>탈퇴하기</Text>
        </Pressable>
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
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    flex: 1,
    // borderWidth: 1,
  },
  buttonArea: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    // borderWidth: 1,
  },
  title: {
    marginTop: 40,
    marginBottom: 8,
    color: color.blueGray_06,
  },
  btnText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: color.blueGray_06,
  },
  btnWrap: {
    paddingVertical: 17,
  },
});

export default SettingScreen;
