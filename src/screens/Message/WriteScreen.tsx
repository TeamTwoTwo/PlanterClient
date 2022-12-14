import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  FlatList,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';
import {color, screen, Typography, url} from '../../utils/utils';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import Gallery from '../../assets/icon/ic-gallery.svg';
import Delete from '../../assets/icon/ic-img-delete.svg';
import Toast from '../../components/common/Toast';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

interface ButtonRefProps {
  isLoadingSend: boolean;
}

const WriteScreen = ({route}: any) => {
  const [message, setMessage] = useState<string>('');
  const [isFull, setIsFull] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<IImage[]>([]);
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const navigation = useNavigation<MainTabNavigationProp>();
  const {plantManagerId, type, matchingId} = route?.params;
  const onGoBack = () => {
    navigation.pop();
  };
  const buttonRef = useRef<ButtonRefProps>({
    isLoadingSend: false,
  });

  console.log(plantManagerId, type);

  useEffect(() => {
    if (message.length === 0) {
      setIsFull(false);
    } else {
      setIsFull(true);
    }
  }, [message]);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => {
        setToastStatus(false);
        if (type === 'Matching') {
          navigation.popToTop();
          navigation.navigate('MessageScreen', {type: 'Matching'});
        } else if (type === 'ExpertDetail') {
          navigation.popToTop();
          navigation.navigate('ExpertDetailScreen', {
            plantManagerId,
          });
          navigation.navigate('MessageScreen', {type: 'ExpertDetail'});
        } else if (type === 'MatchingHistory') {
          navigation.popToTop();
          navigation.navigate('MessageScreen', {type: 'MatchingHistory'});
        } else if (type === 'MatchingHistoryDetail') {
          navigation.popToTop();
          navigation.navigate('MatchingHistoryDetailScreen', {
            matchingId,
          });
          navigation.navigate('MessageScreen', {type: 'MatchingHistoryDetail'});
        }
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastStatus]);

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 76,
      height: 76,
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true, //ios live photo??? jpg??? ?????????
      compressImageQuality: 1, //????????? ?????? 0~1
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: 0,
    })
      .then(res => {
        console.log('???????????? ???????????????');
        console.log(res);
        if (res.length > 10) {
          Alert.alert('????????? ?????? 10????????? ????????? ??? ????????????.');
          let list = res.slice(0, 10);
          setImageFiles(list);
        } else {
          setImageFiles(res);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const onDelete = (uri: string): void => {
    setImageFiles(imageFiles?.filter(img => img.path !== uri));
  };

  const onSend = (): void => {
    if (buttonRef.current.isLoadingSend) {
      return;
    }

    buttonRef.current.isLoadingSend = true;

    const formData = new FormData();
    formData.append('plantManagerId', plantManagerId);
    formData.append('contents', message);
    imageFiles.forEach(e => {
      formData.append('images', {
        name: 'name',
        type: 'image/jpeg',
        uri: e.path,
      });
    });
    console.log(formData);

    getData('auth')
      .then(auth => {
        axios
          .post(url.dev + 'messages', formData, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary="boundary"',
              Authorization: `Bearer ${auth.token}`,
            },
            transformRequest: (data, headers) => {
              return data;
            },
          })
          .then(res => {
            console.log('????????????');
            console.log(res.data);
            if (res.data.isSuccess) {
              Keyboard.dismiss();
              if (!toastStatus) {
                setToastStatus(true);
              }
            }
          })
          .finally(() => {
            buttonRef.current.isLoadingSend = false;
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    console.log(imageFiles);
  }, [imageFiles]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
            <Back />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>?????? ??????</Text>
          </View>
          <Pressable onPress={onSend} disabled={isFull ? false : true}>
            <Text style={textStyles(isFull).send}>??????</Text>
          </Pressable>
        </View>
        <ScrollView
          style={styles.textWrap}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {imageFiles && imageFiles.length > 0 && (
            <View style={styles.imgWrap}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                horizontal
                data={imageFiles.slice(0, 10)}
                renderItem={({item}) => (
                  <View style={styles.img}>
                    <Pressable
                      style={styles.delete}
                      onPress={() => onDelete(item.path)}>
                      <Delete />
                    </Pressable>
                    <Image style={styles.img} source={{uri: item.path}} />
                  </View>
                )}
                keyExtractor={(item, idx) => `img ${idx.toString()}`}
                listKey="message-img-list"
              />
            </View>
          )}
          <View style={{minHeight: screen.height - 96}}>
            <TextInput
              style={[Typography.body1, {paddingHorizontal: 24, flex: 1}]}
              placeholder="?????? ????????? ??????????????????."
              multiline
              textAlignVertical="top"
              placeholderTextColor={color.blueGray_01}
              value={message}
              onChangeText={setMessage}
              selectionColor={color.mint_05}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
            />
          </View>
        </ScrollView>
        <View style={styles.galleryWrap}>
          <Pressable style={{padding: 8}} onPress={onSelectImage}>
            <Gallery />
          </Pressable>
          <View style={styles.numberWrap}>
            <Text style={[Typography.body2, {color: color.blueGray_06}]}>
              {imageFiles ? imageFiles.length : 0}
            </Text>
            <Text style={[Typography.body2, {color: color.blueGray_06}]}>
              /10
            </Text>
          </View>
        </View>
        {toastStatus && (
          <View style={{paddingHorizontal: 24}}>
            <Toast text="????????? ?????????????????????." />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
  side: {
    width: 20,
    height: 20,
  },
  galleryWrap: {
    borderTopWidth: 1,
    borderColor: color.blueGray_00,
    width: '100%',
    height: 48,
    backgroundColor: color.gray_00,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  keyboard: {
    flex: 1,
  },
  textWrap: {
    flex: 1,
  },
  numberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 76,
    height: 76,
    borderRadius: 4,
    marginRight: 7,
  },
  imgWrap: {
    marginBottom: 24,
    marginTop: 18,
    // borderWidth: 1,
    paddingHorizontal: 24,
  },
  delete: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    top: 5,
  },
});

export default WriteScreen;
