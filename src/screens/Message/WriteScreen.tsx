import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {color, Typography} from '../../utils/utils.ts';
import Close from '../../assets/icon/ic-close.svg';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import Gallery from '../../assets/icon/ic-gallery.svg';
import Delete from '../../assets/icon/ic-img-delete.svg';
import Toast from '../../components/common/Toast';

const WriteScreen = () => {
  const [message, setMessage] = useState<string>('');
  const [isFull, setIsFull] = useState<boolean>(false);
  const [images, setImages] = useState();
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const navigation = useNavigation<MainTabNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    if (message.length === 0) {
      setIsFull(false);
    } else {
      setIsFull(true);
    }
  }, [message]);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        // includeBase64: Platform.OS === 'android',
        selectionLimit: 10,
      },
      res => {
        if (res.didCancel) {
          // 취소했을 경우
          return;
        }
        console.log(res.assets);
        setImages(res.assets);
      },
    );
  };

  const onDelete = (uri: string): void => {
    setImages(images.filter(img => img.uri !== uri));
  };

  const onSend = (): void => {
    if (isFull) {
      Keyboard.dismiss();
      if (!toastStatus) {
        setToastStatus(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
            <Close stroke="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>쪽지 쓰기</Text>
          </View>
          <View>
            <Text style={textStyles(isFull).send} onPress={onSend}>
              전송
            </Text>
          </View>
        </View>
        <ScrollView
          style={styles.textWrap}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {images && images.length > 0 && (
            <View style={styles.imgWrap}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                horizontal
                data={images.slice(0, 10)}
                renderItem={({item}) => (
                  <View style={styles.img}>
                    <Pressable
                      style={styles.delete}
                      onPress={() => onDelete(item.uri)}>
                      <Delete />
                    </Pressable>
                    <Image style={styles.img} source={{uri: item.uri}} />
                  </View>
                )}
                keyExtractor={item => item.uri}
              />
            </View>
          )}
          <TextInput
            style={[Typography.body1, {paddingHorizontal: 24}]}
            placeholder="쪽지 내용을 작성해주세요."
            multiline
            textAlignVertical="top"
            placeholderTextColor={color.blueGray_01}
            value={message}
            onChangeText={setMessage}
          />
        </ScrollView>
        <View style={styles.galleryWrap}>
          <Pressable style={{padding: 8}} onPress={onSelectImage}>
            <Gallery />
          </Pressable>
          <View style={styles.numberWrap}>
            <Text style={([Typography.body2], {color: color.blueGray_06})}>
              {images ? images.length : 0}
            </Text>
            <Text style={([Typography.body2], {color: color.blueGray_06})}>
              /10
            </Text>
          </View>
        </View>
        {toastStatus && (
          <View style={{paddingHorizontal: 24}}>
            <Toast text="쪽지가 전송되었습니다." />
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
    paddingHorizontal: 24,
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
    position: 'absolute',
    bottom: 0,
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
    // paddingHorizontal: 24,
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
