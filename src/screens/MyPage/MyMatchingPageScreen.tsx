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
  Alert,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import {color, screen, Typography} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-virtualized-view';
import MyMatchingServiceList from '../../components/MyPage/MyMatchingPage/MyMatchingServiceList';
import MyMatchingIntroduce from '../../components/MyPage/MyMatchingPage/MyMatchingIntroduce';
import MyMatchingServiceItem from '../../components/MyPage/MyMatchingPage/MyMatchingServiceItem';
import Toggle from '../../components/MyPage/Toggle';
import Camera from '../../assets/icon/ic-profile-camera.svg';
import Delete from '../../assets/icon/ic-img-delete.svg';
import MyPageToggleView from '../../components/MyPage/MyMatchingPage/MyPageToggleView';

export interface ServiceType {
  name: string;
  price: number;
  number: number;
}

const MyMatchingPageScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [canComplete, setCanComplete] = useState<boolean>(false);
  const [isMatchingAllowed, setIsMatchingAllowed] = useState<boolean>(true);
  const [imageFiles, setImageFiles] = useState<IImage[]>([]);
  const [introduceText, setIntroduceText] = useState<string>('');
  const [serviceList, setServiceList] = useState<ServiceType[]>([
    {
      name: '',
      price: 0,
      number: 1,
    },
  ]);

  useEffect(() => {
    console.log(introduceText);
  }, [introduceText]);

  const onGoBack = () => {
    navigation.pop();
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
          // onPress={onPressComplete}
          // disabled={canComplete ? false : true}
          >
            <Text style={textStyles(canComplete).send}>완료</Text>
          </Pressable>
        </View>

        <MyMatchingServiceList
          serviceList={serviceList}
          setServiceList={setServiceList}
          isMatchingAllowed={isMatchingAllowed}
          setIsMatchingAllowed={setIsMatchingAllowed}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          introduceText={introduceText}
          setIntroduceText={setIntroduceText}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const dstyles = (isMatchingAllowed: boolean) =>
  StyleSheet.create({
    main: {
      display: isMatchingAllowed ? 'flex' : 'none',
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
