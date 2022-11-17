import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import MyMatchingServiceItem from './MyMatchingServiceItem';
import Add from '../../../assets/icon/ic-add.svg';
import {ServiceType} from '../../../screens/MyPage/MyMatchingPageScreen';
import {color, screen, Typography} from '../../../utils/utils';
import Camera from '../../../assets/icon/ic-profile-camera.svg';
import Delete from '../../../assets/icon/ic-img-delete.svg';
import MyMatchingIntroduce from './MyMatchingIntroduce';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';
import MyPageToggleView from './MyPageToggleView';
import Check from '../../../assets/icon/ic-check.svg';

interface Props {
  type: string;
  serviceList: ServiceType[];
  setServiceList: Dispatch<SetStateAction<ServiceType[]>>;
  isMatchingAllowed: boolean;
  setIsMatchingAllowed: Dispatch<SetStateAction<boolean>>;
  imageFiles: IImage[];
  setImageFiles: Dispatch<SetStateAction<IImage[]>>;
  introduceText: string;
  setIntroduceText: Dispatch<SetStateAction<string>>;
  isPhoto: boolean;
  setIsPhoto: Dispatch<SetStateAction<boolean>>;
}

const MyMatchingServiceList = ({
  type,
  serviceList,
  setServiceList,
  isMatchingAllowed,
  setIsMatchingAllowed,
  imageFiles,
  setImageFiles,
  introduceText,
  setIntroduceText,
  isPhoto,
  setIsPhoto,
}: Props) => {
  useEffect(() => {
    console.log(serviceList);
  }, [serviceList]);

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: screen.width / 4 - 16,
      height: screen.width / 4 - 16,
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true, //ios live photo를 jpg로 바꿔줌
      compressImageQuality: 1, //이미지 압축 0~1
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: 3,
    })
      .then(res => {
        console.log(res);
        if (res.length > 3) {
          Alert.alert('사진은 최대 3장까지 첨부할 수 있습니다.');
          let list = res.slice(0, 3);
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

  let serviceItem: ServiceType = {
    name: '',
    price: 0,
    number: 1,
  };

  const addService = () => {
    console.log(serviceItem);
    let list = [...serviceList, serviceItem];
    setServiceList(list);
  };

  const removeService = (idx: number) => {
    let list = [...serviceList];
    setServiceList(list.filter((d, i) => idx !== i));
  };

  const data: any = [1];
  return (
    <View>
      <FlatList
        scrollEnabled={isMatchingAllowed}
        data={data}
        renderItem={() => (
          <>
            <MyPageToggleView
              isMatchingAllowed={isMatchingAllowed}
              setIsMatchingAllowed={setIsMatchingAllowed}
            />
            <View style={dstyles(isMatchingAllowed).main}>
              <View style={styles.separator} />
              <View style={[styles.blockWrap, styles.padding]}>
                <Text
                  style={[Typography.subtitle2, {color: color.blueGray_06}]}>
                  프로필 상단 이미지
                </Text>
                <View style={styles.imgListWrap}>
                  <Pressable style={styles.cameraBtn} onPress={onSelectImage}>
                    <View style={{alignItems: 'center'}}>
                      <Camera />
                      <View>
                        <Text
                          style={[
                            Typography.body1,
                            {color: color.blueGray_05},
                          ]}>
                          {imageFiles.length}/3
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                  <FlatList
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    horizontal
                    data={imageFiles.slice(0, 3)}
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
                    ItemSeparatorComponent={() => <View style={{width: 8}} />}
                    keyExtractor={(item, idx) => `img ${idx.toString()}`}
                    listKey="my-matching-img-list"
                  />
                </View>
              </View>
              <View style={[styles.blockWrap, styles.padding]}>
                <MyMatchingIntroduce
                  introduceText={introduceText}
                  setIntroduceText={setIntroduceText}
                />
              </View>
              <View style={[styles.blockWrap, styles.padding]}>
                <FlatList
                  data={serviceList}
                  renderItem={({item, index}) => (
                    <MyMatchingServiceItem
                      type={type}
                      idx={index}
                      serviceItem={item}
                      serviceList={serviceList}
                      setServiceList={setServiceList}
                      removeService={() => {
                        removeService(index);
                      }}
                    />
                  )}
                  keyExtractor={(_, idx) => `service-item ${idx}`}
                  ItemSeparatorComponent={() => (
                    <View style={{marginTop: 52}} />
                  )}
                  listKey="service-item-list"
                />
                {type !== 'butler' && (
                  <View style={[styles.addBtnWrap, styles.padding]}>
                    <TouchableOpacity
                      style={styles.addBtn}
                      activeOpacity={1}
                      onPress={addService}>
                      <Add />
                      <Text
                        style={[
                          Typography.subtitle3,
                          {color: color.blueGray_03, marginLeft: 4},
                        ]}>
                        서비스 추가
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={[{paddingVertical: 32}, styles.padding]}>
                <Text
                  style={[Typography.subtitle2, {color: color.blueGray_06}]}>
                  사진 제공
                </Text>
                <View style={styles.checkWrap}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.checkBtn}
                    onPress={() => {
                      setIsPhoto(!isPhoto);
                    }}>
                    {isPhoto ? (
                      <Check width={20} height={20} fill={color.mint_05} />
                    ) : (
                      <View style={styles.empty} />
                    )}
                  </TouchableOpacity>
                  <Text style={[Typography.body1, {color: color.blueGray_06}]}>
                    매칭상대가 식물 사진 요청시 사진을 제공할게요.
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        keyExtractor={(item, index) => `MyMatchingServiceList ${index}`}
        ListFooterComponent={() => <View style={{marginBottom: 90}} />}
      />
      {/* </ScrollView> */}
    </View>
  );
};

const dstyles = (isMatchingAllowed: boolean) =>
  StyleSheet.create({
    main: {
      display: isMatchingAllowed ? 'flex' : 'none',
    },
  });

const styles = StyleSheet.create({
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
  addBtnWrap: {
    marginTop: 40,
  },
  addBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.blueGray_00,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  padding: {
    paddingHorizontal: 20,
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
  checkWrap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBtn: {
    padding: 8,
  },
  empty: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.gray_03,
  },
});
export default MyMatchingServiceList;
