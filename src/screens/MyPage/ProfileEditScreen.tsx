import React, {useState, useEffect, useCallback, useRef} from 'react';
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
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';

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

interface ButtonRefProps {
  isLoading: boolean;
}

const ProfileEditScreen = ({route}: any) => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });
  const {nickname} = route?.params;
  const [userInfo, setUserInfo] = useState<userData>();
  const [nick, setNick] = useState<string>(nickname);
  const [canComplete, setCanComplete] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const navigation = useNavigation<MainTabNavigationProp>();
  const [nicknameCheckStatus, setNicknameCheckStatus] = useState<boolean>(true);
  const [isNicknameDuplicated, setIsNicknameDuplicated] =
    useState<boolean>(false);
  const [profileImgUrl, setProfileImgUrl] = useState<string | undefined>();
  const [profileImg, setProfileImg] = useState<IImage | null>();

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
          setProfileImgUrl(res.data.result.profileImg);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, []);

  useEffect(() => {
    nicknameCheckFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nick]);

  useEffect(() => {
    setProfileImgUrl(profileImg?.path);
  }, [profileImg]);

  const nicknameCheckFunc = () => {
    var nicknameLen = 0;
    var numCheck = /[0-9]/;
    var specialCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

    //한글은 2, 영문은 1로 치환
    for (var i = 0; i < nick.length; i++) {
      var n = nick.charAt(i);

      if (encodeURIComponent(n).length > 4) {
        nicknameLen += 2;
      } else {
        nicknameLen += 1;
      }
    }

    if (
      specialCheck.test(nick) ||
      nick.search(/\s/) !== -1 ||
      numCheck.test(nick) ||
      nicknameLen > 20 ||
      nicknameLen === 0
    ) {
      setCanComplete(false);
      setNicknameCheckStatus(false);
      setIsNicknameDuplicated(false);
    } else {
      axios
        .get(url.dev + `auth/check-duplication?nickname=${nick}`)
        .then(res => {
          if (!res.data.isSuccess) {
            if (nickname !== nick) {
              setCanComplete(false);
              setNicknameCheckStatus(false);
              setIsNicknameDuplicated(true);
            } else {
              setCanComplete(true);
              setNicknameCheckStatus(true);
            }
          } else {
            setCanComplete(true);
            setNicknameCheckStatus(true);
            setIsNicknameDuplicated(false);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 76,
      height: 76,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true, //ios live photo를 jpg로 바꿔줌
      compressImageQuality: 1, //이미지 압축 0~1
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: 0,
    })
      .then(res => {
        console.log(res);
        setProfileImg(res);
        setIsModalShown(false);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const deleteImage = () => {
    setProfileImgUrl(undefined);
    setIsModalShown(false);
    setProfileImg(null);
  };
  const onPressComplete = () => {
    if (buttonRef.current.isLoading) {
      return;
    }

    buttonRef.current.isLoading = true;

    const formData = new FormData();

    if (profileImg) {
      formData.append('profileImg', {
        name: 'name',
        type: 'image/jpeg',
        uri: profileImg.path,
      });
    }

    if (profileImgUrl) {
      formData.append('profileImgUrl', userInfo?.profileImg);
    }

    formData.append('nickname', nick);

    console.log(formData);

    getData('auth').then(auth => {
      axios
        .patch(url.dev + `users/${auth.userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary="boundary"',
            Authorization: `Bearer ${auth.token}`,
          },
          transformRequest: (data, headers) => {
            return data;
          },
        })
        .then(res => {
          console.log(res);
          if (res.data.isSuccess) {
            navigation.popToTop();
            navigation.navigate('ProfileScreen');
          }
        })
        .finally(() => {
          buttonRef.current.isLoading = false;
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

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
          <Pressable
            onPress={onPressComplete}
            disabled={canComplete ? false : true}>
            <Text style={textStyles(canComplete).send}>완료</Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.profileArea}>
            {userInfo && (
              <Image
                style={styles.profile}
                source={
                  profileImgUrl
                    ? {uri: profileImgUrl}
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
            errorText={
              isNicknameDuplicated
                ? '이미 존재하는 닉네임입니다.'
                : '한글 최대 10자, 영어 최대 20자로 입력해주세요.'
            }
            clearText={() => {
              setNick('');
            }}
            checkStatus={nicknameCheckStatus}
          />
        </View>
      </KeyboardAvoidingView>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay cancel>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Pressable style={styles.firstSelecBox} onPress={onSelectImage}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_04}]}>
              앨범에서 선택
            </Text>
          </Pressable>
          <Pressable style={styles.secondSelecBox} onPress={deleteImage}>
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

const textStyles = (canComplete: boolean) =>
  StyleSheet.create({
    send: {
      color: canComplete ? color.mint_05 : color.gray_04,
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
    padding: 6,
    borderWidth: 1,
    borderColor: color.blueGray_00,
    borderRadius: 50,
    backgroundColor: 'white',
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
