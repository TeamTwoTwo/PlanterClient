import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url, screen} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';
import Edit from '../../assets/icon/ic-edit.svg';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/common/CustomInput';
import Camera from '../../assets/icon/ic-profile-camera.svg';
import Modal from '../../components/common/Modal';

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

const ProfileEditScreen = ({route}: any) => {
  const {nickname} = route?.params;
  const [userInfo, setUserInfo] = useState<userData>();
  const [nick, setNick] = useState<string>(nickname);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const navigation = useNavigation<MainTabNavigationProp>();

  const onGoBack = () => {
    navigation.pop();
  };

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
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

  useEffect(() => {
    if (nick.length === 0) {
      setIsFull(false);
    } else {
      setIsFull(true);
    }
  }, [nick]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
            <Back />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>프로필 수정</Text>
          </View>
          <Pressable>
            <Text style={textStyles(isFull).send}>완료</Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
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
              style={styles.camera}
              onPress={() => {
                setIsModalShown(true);
              }}>
              <Camera />
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <CustomInput
            label="닉네임"
            placeholder="닉네임"
            onChangeText={setNick}
            value={nick}
            errorText="이미 존재하는 닉네임입니다."
            clearText={() => {
              setNick('');
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay cancel>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Pressable style={styles.firstSelecBox}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_04}]}>
              앨범에서 선택
            </Text>
          </Pressable>
          <Pressable style={styles.secondSelecBox}>
            <Text style={[Typography.subtitle3, {color: color.red_02}]}>
              프로필 사진 삭제
            </Text>
          </Pressable>
          <Pressable
            style={styles.cancleBox}
            onPress={() => {
              setIsModalShown(false);
            }}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              취소
            </Text>
          </Pressable>
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

const textStyles = (isFull: boolean) =>
  StyleSheet.create({
    send: {
      color: isFull ? color.mint_05 : color.gray_04,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  profileArea: {
    width: 120,
    marginTop: 20,
    marginBottom: 40,
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 80,
  },
  header: {
    backgroundColor: color.gray_00,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: color.blueGray_06,
    lineHeight: 24,
  },
  camera: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  firstSelecBox: {
    paddingTop: 22,
    // borderWidth: 1,
  },
  secondSelecBox: {
    paddingTop: 28,
    // borderWidth: 1,
  },
  cancleBox: {
    // borderWidth: 1,
    marginTop: 32,
    paddingBottom: 22,
  },
});

export default ProfileEditScreen;
