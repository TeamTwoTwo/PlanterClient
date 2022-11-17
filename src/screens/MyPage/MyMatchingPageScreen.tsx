import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import {color, screen} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';
import MyMatchingServiceList from '../../components/MyPage/MyMatchingPage/MyMatchingServiceList';

export interface ServiceType {
  name: string;
  price: number | string;
  number: number | string;
}

const MyMatchingPageScreen = ({route}: any) => {
  const {category} = route?.params;
  const navigation = useNavigation<MainTabNavigationProp>();
  const [introOK, setIntroOK] = useState<boolean>(false);
  const [serviceOK, setServiceOK] = useState<boolean>(false);
  const [canComplete, setCanComplete] = useState<boolean>(false);

  const [isMatchingAllowed, setIsMatchingAllowed] = useState<boolean>(true);
  const [imageFiles, setImageFiles] = useState<IImage[]>([]);
  const [introduceText, setIntroduceText] = useState<string>('');
  const [serviceList, setServiceList] = useState<ServiceType[]>([
    {
      name: category === 0 ? '식물관리' : '',
      price: '',
      number: '',
    },
  ]);
  const [isPhoto, setIsPhoto] = useState<boolean>(false);

  const onGoBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    console.log(serviceList);
    let cnt = 0;
    serviceList?.forEach((data, idx) => {
      if (data.name !== '' && data.number !== '' && data.price !== '') {
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

  const onPressComplete = () => {};

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
          introduceText={introduceText}
          setIntroduceText={setIntroduceText}
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
