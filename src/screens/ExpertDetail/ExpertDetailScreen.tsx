import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {color, screen, Typography, url} from '../../utils/utils';
import LinearGradient from 'react-native-linear-gradient';
import Back from '../../assets/icon/ic-back-arrow.svg';
import BackBlack from '../../assets/icon/ic-back-arrow-black.svg';
import Meatball from '../../assets/icon/ic-meatball.svg';
import PlantBadge from '../../assets/icon/ic-plant-badge.svg';
import Camera from '../../assets/icon/ic-camera.svg';
import Badge from '../../assets/icon/ic-badge.svg';
import Cost from '../../assets/icon/ic-cost.svg';
import ChatBubble from '../../assets/icon/ic-chat-bubble.svg';
import Star from '../../assets/icon/ic-star.svg';
import Message from '../../assets/icon/ic-message.svg';
import NaverMapView from 'react-native-nmap';
import Review from '../../components/ExpertDetail/Review';
import CustomButton from '../../components/common/CustomButton';
import ImageDetail from '../../components/common/ImageDetail';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

let mock = [1, 2, 3];

interface InfoTypes {
  id: number;
  name: string;
  category: number;
  profileImg: string;
  distance: number;
  isPhoto: boolean;
  rate: number;
  description: string;
  caringPrice: number;
  pruningPrice: number;
  images: string[];
  introduction: string;
  address: string;
  latitude: number;
  longitude: number;
  review: object[];
  numOfReview: number;
}

interface CoordType {
  latitude: number;
  longitude: number;
}

const ExpertDetailScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isHeaderWhite, setIsHeaderWhite] = useState<boolean>(false);
  const [isExpertImageVisible, setIsExpertImageVisible] =
    useState<boolean>(false);
  const [isReviewImageVisible, setIsReviewImageVisible] =
    useState<boolean>(false);

  const [markerWidth, setMarkerWidth] = useState<number>(0);
  const [markerHeight, setMarkerHeight] = useState<number>(0);
  const [info, setInfo] = useState<InfoTypes>();
  const [coord, setCoords] = useState<CoordType>({latitude: 0, longitude: 0});

  // 리뷰 별로 이미지가 다르니까 리뷰 이미지를 클릭할 때마다 이 값 바꿔줌(review imageDetail에 props로 이 값 사용)
  const [reviewImgs, setReviewImgs] = useState<string[] | undefined>(
    info?.images,
  );

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'plant-managers/2', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          console.log(res);
          if (res.data.isSuccess) {
            setInfo(res.data.result);
            const {latitude, longitude} = res.data.result;
            setCoords({latitude, longitude});
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, []);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 55) {
      if (!isHeaderWhite) {
        setIsHeaderWhite(true);
      }
    } else {
      if (isHeaderWhite) {
        setIsHeaderWhite(false);
      }
    }
  };

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setMarkerWidth(width);
    setMarkerHeight(height);
  };

  const onPressReviewDetail = () => {
    navigation.navigate('ReviewDetailScreen');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle={isHeaderWhite ? 'dark-content' : 'light-content'} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.pop();
          }}>
          {isHeaderWhite ? <BackBlack /> : <Back />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.meatballBtn} activeOpacity={1}>
          <Meatball fill={isHeaderWhite ? color.gray_08 : 'white'} />
        </TouchableOpacity>
      </View>
      {isHeaderWhite && <View style={styles.headerWhite} />}
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}>
        <View style={styles.expertImgWrap}>
          {!isHeaderWhite && (
            <LinearGradient
              colors={['rgba(16,16,16,0.8)', 'rgba(16,16,16,0)']}
              style={styles.gradation}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            />
          )}
          <View style={styles.expertImgView}>
            <FlatList
              data={info?.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setIsExpertImageVisible(true);
                  }}>
                  <View>
                    <Image
                      style={styles.expertImg}
                      source={{uri: item}}
                      resizeMode="cover"
                    />
                    <View style={styles.numOfImgs}>
                      <Text style={[Typography.caption1, styles.numOfImgsText]}>
                        {index + 1}
                        <Text
                          style={[
                            Typography.caption2,
                            styles.numOfImgsTextSub,
                          ]}>
                          &nbsp;/&nbsp;{info?.images.length}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, idx) => `img ${item} ${idx}`}
            />
          </View>
        </View>
        <View style={mainStyles(isHeaderWhite).main}>
          <View>
            <Image style={styles.profileImg} source={{uri: info?.profileImg}} />
            <View style={styles.nameView}>
              <Text style={[Typography.subtitle2, styles.name]}>
                {info?.name}
              </Text>
              <PlantBadge />
              <Text style={[Typography.body2, styles.type]}>
                {info?.category === 0
                  ? '식물 집사'
                  : info?.category === 1
                  ? '꽃집'
                  : info?.category === 2
                  ? '식물 전문가'
                  : '식물 케어 서비스'}
              </Text>
              <Text style={[Typography.caption1, styles.distance]}>
                {info?.distance}km
              </Text>
            </View>
            <View style={[styles.profileOptionView, {marginRight: 6}]}>
              {info?.isPhoto && (
                <View style={styles.profileOption}>
                  <Camera />
                  <Text style={[Typography.caption1, styles.profileOptionText]}>
                    사진 제공
                  </Text>
                </View>
              )}
              <View style={styles.profileOption}>
                <Badge />
                <Text style={[Typography.caption1, styles.profileOptionText]}>
                  약용식물관리사자격증 소유
                </Text>
              </View>
            </View>
            <View style={styles.introduceView}>
              <Text style={[Typography.body2, styles.introduceText]}>
                {info?.description}
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <View style={styles.contentHeaderView}>
              <Cost />
              <Text style={[Typography.subtitle2, styles.contentHeaderText]}>
                관리 비용
              </Text>
            </View>
            <View style={styles.costContentView}>
              <Text style={[Typography.body2, {color: color.blueGray_04}]}>
                관리 1일
              </Text>
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                1개당{' '}
                <Text style={[Typography.subtitle4]}>
                  {info?.caringPrice.toLocaleString()}원
                </Text>
              </Text>
            </View>
            <View style={styles.costContentView}>
              <Text style={[Typography.body2, {color: color.blueGray_04}]}>
                가지치기
              </Text>
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                1개당{' '}
                <Text style={[Typography.subtitle4]}>
                  {info?.pruningPrice.toLocaleString()}원
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <View style={styles.contentHeaderView}>
              <ChatBubble />
              <Text style={[Typography.subtitle2, styles.contentHeaderText]}>
                소개글
              </Text>
            </View>
            <View style={styles.contentFooterView}>
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                {info?.introduction}
              </Text>
            </View>
          </View>
          <View style={[styles.contentView, {padding: 0}]}>
            <View style={(styles.contentHeaderView, {padding: 20})}>
              <Text style={[Typography.subtitle4, {color: color.blueGray_05}]}>
                {info?.address}
              </Text>
            </View>
            <View style={styles.mapWrap}>
              <NaverMapView
                style={styles.mapView}
                center={{...coord, zoom: 16}}
                scrollGesturesEnabled={false}
              />
              <View style={dstyles(markerWidth, markerHeight).marker}>
                <Image
                  onLayout={onLayout}
                  source={require('../../assets/img/img-map-marker.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.contentView}>
            <View
              style={[
                styles.contentHeaderView,
                {justifyContent: 'space-between'},
              ]}>
              <View style={styles.reviewHeader}>
                <ChatBubble />
                <Text style={[Typography.subtitle2, styles.contentHeaderText]}>
                  후기 {info?.numOfReview.toLocaleString()}건
                </Text>
              </View>
              <View style={styles.reviewHeader}>
                <Star fill="#FFC42C" />
                <Text
                  style={[
                    Typography.body2,
                    {color: color.blueGray_05, marginLeft: 2},
                  ]}>
                  평균 {info?.rate}
                </Text>
              </View>
            </View>
            <View style={styles.contentFooterView}>
              <FlatList
                data={mock}
                renderItem={({item}) => (
                  <Review
                    onPress={() => {
                      setIsReviewImageVisible(true);
                    }}
                  />
                )}
                keyExtractor={item => `img ${item}`}
                ItemSeparatorComponent={() => <View style={{height: 40}} />}
              />
            </View>
          </View>
          <View style={styles.moreReviewBtnView}>
            <TouchableOpacity
              style={styles.moreReviewBtn}
              activeOpacity={1}
              onPress={onPressReviewDetail}>
              <Text style={[Typography.body2, {color: color.blueGray_03}]}>
                리뷰 전체보기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerWrap}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.footerGradation}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.msgBtn} activeOpacity={1}>
            <Message stroke={color.mint_06} />
          </TouchableOpacity>
          <View style={{width: (screen.width * 275) / 375}}>
            <CustomButton
              backgroundColor={color.mint_05}
              text="매칭 요청"
              onPress={() => {}}
              borderRadius={6}
              style={{flex: 1}}
            />
          </View>
        </View>
      </View>
      <ImageDetail
        visible={isExpertImageVisible}
        setVisible={setIsExpertImageVisible}
        images={info?.images}
      />
      <ImageDetail
        visible={isReviewImageVisible}
        setVisible={setIsReviewImageVisible}
        images={info?.images}
      />
    </SafeAreaView>
  );
};

const mainStyles = (isHeaderWhite: boolean) =>
  StyleSheet.create({
    main: {
      paddingHorizontal: 20,
      transform: [{translateY: -47.5}],
      marginTop: isHeaderWhite ? 180 : 80,
    },
  });

const dstyles = (width: number, height: number) =>
  StyleSheet.create({
    marker: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{translateX: -width * 0.5}, {translateY: -height * 0.5}],
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: screen.width,
    height: 48,
    zIndex: 4,
    position: 'absolute',
    top: screen.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    marginLeft: 6,
    padding: 14,
  },
  meatballBtn: {
    marginRight: 6,
    padding: 14,
  },
  expertImgWrap: {
    position: 'relative',
  },
  headerWhite: {
    backgroundColor: 'white',
    zIndex: 3,
    width: screen.width,
    height: 48 + Number(screen.statusBarHeight),
    position: 'absolute',
    top: 0,
  },
  gradation: {
    height: 100,
    zIndex: 3,
  },
  expertImgView: {
    height: 180,
    position: 'absolute',
    top: 0,
  },
  expertImg: {
    width: screen.width,
    height: 180,
  },
  numOfImgs: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    backgroundColor: 'rgba(16,16,16,0.4)',
    width: 32,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  numOfImgsText: {
    color: color.gray_00,
  },
  numOfImgsTextSub: {
    opacity: 0.6,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameView: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: color.blueGray_06,
    marginRight: 5,
  },
  type: {
    color: color.blueGray_05,
    marginRight: 4,
  },
  distance: {
    color: color.gray_04,
  },
  profileOptionView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: color.mint_00,
    borderRadius: 8,
  },
  profileOptionText: {
    marginLeft: 2,
    color: color.mint_07,
  },
  introduceView: {
    marginTop: 12,
  },
  introduceText: {
    color: color.blueGray_05,
    marginBottom: 8,
  },
  contentView: {
    marginTop: 20,
    backgroundColor: '#FAFAFC',
    padding: 20,
    borderRadius: 8,
  },
  contentHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e7ef',
  },
  contentHeaderText: {
    color: color.blueGray_05,
    marginLeft: 6,
  },
  costContentView: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentFooterView: {
    paddingTop: 20,
  },
  mapWrap: {
    position: 'relative',
  },
  mapView: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreReviewBtnView: {
    marginTop: 32,
    marginBottom: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreReviewBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: color.blueGray_00,
    borderRadius: 49,
  },
  footerWrap: {
    paddingHorizontal: 20,
    height: (screen.width * 52) / 375 + 73,
    position: 'absolute',
    bottom: getBottomSpace(),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footerGradation: {
    height: 73,
    zIndex: 5,
  },
  msgBtn: {
    width: (screen.width * 52) / 375,
    height: (screen.width * 52) / 375,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.mint_02,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default ExpertDetailScreen;
