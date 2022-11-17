import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import {color, screen, url} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';
import MyMatchingServiceList from '../../components/MyPage/MyMatchingPage/MyMatchingServiceList';
import {getData} from '../../utils/AsyncStorage';
import axios from 'axios';

export interface ServiceType {
  optionId?: number;
  name: string;
  price: number | string;
  //   number: number | string;
}

interface ButtonRefProps {
  isLoading: boolean;
}

const MyMatchingPageScreen = ({route}: any) => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });
  const {category} = route?.params;
  const navigation = useNavigation<MainTabNavigationProp>();
  const [introOK, setIntroOK] = useState<boolean>(false);
  const [serviceOK, setServiceOK] = useState<boolean>(false);
  const [canComplete, setCanComplete] = useState<boolean>(false);

  const [isMatchingAllowed, setIsMatchingAllowed] = useState<boolean>(true);
  const [imageFiles, setImageFiles] = useState<IImage[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]); //기존 이미지 URL
  const [introduceText, setIntroduceText] = useState<string>('');
  const [onelineText, setOnelineText] = useState<string>('');
  const [serviceList, setServiceList] = useState<ServiceType[]>([
    {
      name: category === 0 ? '식물관리' : '',
      price: '',
      //   number: '',
    },
  ]);
  const [isPhoto, setIsPhoto] = useState<boolean>(false);

  useEffect(() => {
    getData('auth')
      .then(auth => {
        axios
          .get(url.dev + `users/${auth.userId}/plant-manager`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then(res => {
            // console.log(res);
            const {result} = res.data;
            console.log(result);
            if (res.data.isSuccess) {
              setIsMatchingAllowed(result.isActive);
              setImageUrl(result.imageUrl);
              setOnelineText(result.introduction);
              setIntroduceText(result.description);
              setServiceList(result.careOption);
              setIsPhoto(result.isPhoto);
            }
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    console.log(serviceList);
    let cnt = 0;
    serviceList?.forEach((data, idx) => {
      if (data.name !== '' && data.price !== '') {
        cnt++;
      }
    });

    if (cnt === serviceList.length) {
      setServiceOK(true);
    } else {
      setServiceOK(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceList]);

  useEffect(() => {
    console.log(introduceText);
    if (introduceText.length > 0) {
      if (introduceText.length > 300) {
        setIntroduceText(introduceText.slice(0, 300));
      }
      setIntroOK(true);
    } else {
      setIntroOK(false);
    }
  }, [introduceText]);

  useEffect(() => {
    if (introOK && serviceOK) {
      setCanComplete(true);
    } else {
      setCanComplete(false);
    }
  }, [introOK, serviceOK]);

  const onGoBack = () => {
    navigation.pop();
  };

  const onPressComplete = () => {
    if (buttonRef.current.isLoading) {
      return;
    }

    buttonRef.current.isLoading = true;

    const formData = new FormData();
    formData.append('isActive', isMatchingAllowed);
    imageFiles.forEach(e => {
      formData.append('images', {
        name: e.filename,
        type: 'image/jpeg',
        uri: e.path,
      });
    });
    formData.append('imageUrl', imageUrl);
    formData.append('introduction', onelineText);
    formData.append('description', introduceText);
    formData.append('price', serviceList[0].price);
    formData.append('isPhoto', isPhoto);

    console.log(formData);

    getData('auth')
      .then(auth => {
        axios
          .post(url.dev + 'plant-managers', formData, {
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
              Keyboard.dismiss();
              navigation.popToTop();
            }
          })
          .finally(() => {
            buttonRef.current.isLoading = false;
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
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
            <Text style={styles.title}>내 매칭페이지 관리</Text>
          </View>
          <Pressable
            onPress={onPressComplete}
            disabled={canComplete ? false : true}>
            <Text style={textStyles(canComplete).send}>완료</Text>
          </Pressable>
        </View>
        <MyMatchingServiceList
          category={category}
          serviceList={serviceList}
          setServiceList={setServiceList}
          isMatchingAllowed={isMatchingAllowed}
          setIsMatchingAllowed={setIsMatchingAllowed}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          introduceText={introduceText}
          setIntroduceText={setIntroduceText}
          onelineText={onelineText}
          setOnelineText={setOnelineText}
          isPhoto={isPhoto}
          setIsPhoto={setIsPhoto}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    backgroundColor: 'white',
  },
  padding: {
    paddingHorizontal: 20,
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
  introduceWrap: {
    marginTop: 20,
  },
  introduce: {
    backgroundColor: '#FAFAFC',
    height: 124,
    overflow: 'scroll',
    padding: 14,
    paddingTop: 14,
    color: color.blueGray_06,
  },
  toggleWrap: {
    marginTop: 20,
  },
  separator: {
    marginTop: 32,
    height: 12,
    backgroundColor: '#FAFAFC',
  },
  blockWrap: {
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: color.blueGray_00,
  },
  imgListWrap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.blueGray_00,
    borderRadius: 4,
    width: screen.width / 4 - 16,
    height: screen.width / 4 - 16,
    marginRight: 8,
  },
  img: {
    width: screen.width / 4 - 16,
    height: screen.width / 4 - 16,
    borderRadius: 4,
  },
  delete: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    top: 5,
  },
});
export default MyMatchingPageScreen;
