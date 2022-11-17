import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {color, screen, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Butler from '../../assets/icon/ic-butler-badge.svg';
import Expert from '../../assets/icon/ic-expert-badge.svg';
import Flower from '../../assets/icon/ic-flower-badge.svg';
import Care from '../../assets/icon/ic-care-badge.svg';
import Message from '../../assets/icon/ic-message.svg';
import {ScrollView} from 'react-native-virtualized-view';
import CustomButton from '../../components/common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';
import Modal from '../../components/common/Modal';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

const category = ['식물 집사', '꽃집', '식물 전문가', '식물 케어 서비스'];
const pickupType = [
  '제가 매칭 상대의 주소에 갈게요',
  '매칭 상대가 제 주소로 와주세요',
];

interface ButtonRefProps {
  isLoading: boolean;
}

interface ServiceDetailType {
  plantName: string;
  plantCount: number;
  price: number;
  careName: string;
}

interface MatchingInfoType {
  matchingId: number;
  plantManagerId: number;
  profileImg: string;
  name: string;
  category: number;
  requestAt: string;
  status: string;
  service: ServiceDetailType[];
  totalPrice: number;
  startDate: string;
  endDate: string;
  totalDate: string;
  pickupType: number;
  reviewId: number;
}

const MatchingHistoryDetailScreen = ({route}: any) => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });
  const {matchingId, type} = route?.params;
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [btnType, setBtnType] = useState<string>();
  const [matchingInfo, setMatchingInfo] = useState<MatchingInfoType>();
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + `matchings/${matchingId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          if (res.data.isSuccess) {
            console.log(res);
            setMatchingInfo(res.data.result);
            setStatus(res.data.result.status);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, [matchingId]);

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  const onPressComplete = (btype: string) => {
    setIsModalShown(true);
    setBtnType(btype);
  };

  const changeStatus = (stat: string) => {
    if (matchingInfo !== undefined) {
      if (buttonRef.current.isLoading) {
        return;
      }

      buttonRef.current.isLoading = true;

      getData('auth').then(auth => {
        axios
          .patch(
            url.dev + `matchings/${matchingId}`,
            {status: stat},
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            },
          )
          .then(res => {
            if (res.data.isSuccess) {
              console.log(res);
              if (stat === 'complete' && type !== 1) {
                navigation.navigate('ReviewStarScreen', {
                  matchingId,
                  name: matchingInfo?.name,
                  profileImg: matchingInfo?.profileImg,
                });
              } else {
                navigation.navigate('MatchingHistory');
              }
            }
          })
          .finally(() => {
            buttonRef.current.isLoading = false;
          })
          .catch(e => {
            console.error(e);
          });
      });
    }
  };

  const onPressShowReview = () => {
    navigation.navigate('Matching');
    matchingInfo &&
      navigation.navigate('ExpertDetailScreen', {
        plantManagerId: matchingInfo?.plantManagerId,
      });
    matchingInfo &&
      navigation.navigate('ReviewDetailScreen', {
        plantManagerId: matchingInfo?.plantManagerId,
      });
  };

  const onPressWriteReview = () => {
    matchingInfo &&
      navigation.navigate('ReviewStarScreen', {
        matchingId,
        name: matchingInfo?.name,
        profileImg: matchingInfo?.profileImg,
      });
  };

  const onPressMessage = () => {
    matchingInfo &&
      navigation.navigate('MessageDetailScreen', {
        matchingId,
        plantManagerId: matchingInfo?.plantManagerId,
        name: matchingInfo?.name,
        type: 'MatchingHistoryDetail',
      });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader
        title={
          status === 'request' ||
          status === 'care' ||
          (status === 'request' && type === 1)
            ? '진행중인 매칭'
            : '완료된 매칭'
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileWrap}>
          <View style={styles.imgWrap}>
            <Image
              source={
                matchingInfo?.profileImg
                  ? {uri: matchingInfo?.profileImg}
                  : require('../../assets/img/img-profile-default.png')
              }
              style={styles.profileImg}
            />
            <TouchableOpacity
              style={styles.msgBtn}
              activeOpacity={1}
              onPress={onPressMessage}>
              <Message stroke={'black'} width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileTextWrap}>
            <Text style={[Typography.subtitle4, dstyles(status, type).text]}>
              {status === 'care'
                ? '케어 진행중'
                : status === 'request'
                ? type === 1
                  ? '새 매칭 요청'
                  : '매칭 요청중'
                : status === 'complete'
                ? '케어 완료'
                : status === 'cancel'
                ? '매칭 취소'
                : null}
            </Text>
            <View style={styles.nameWrap}>
              <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
                {matchingInfo?.name}
              </Text>
              <View style={styles.badgeWrap}>
                {matchingInfo?.category === 0 ? (
                  <Butler />
                ) : matchingInfo?.category === 1 ? (
                  <Flower />
                ) : matchingInfo?.category === 2 ? (
                  <Expert />
                ) : (
                  <Care />
                )}
              </View>
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                {matchingInfo && category[matchingInfo.category]}
              </Text>
            </View>
            <Text style={[Typography.body2, {color: color.blueGray_02}]}>
              요청일시 {matchingInfo?.requestAt}
            </Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.serviceTypeWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              서비스 종류
            </Text>
            <View style={styles.serviceTypeListWrap}>
              <FlatList
                scrollEnabled={false}
                data={matchingInfo?.service}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.serviceTypeItem}>
                      <Text
                        style={[Typography.body1, {color: color.blueGray_06}]}>
                        {item.plantName}&nbsp;x&nbsp;{item.plantCount}개
                      </Text>
                      <Text
                        style={[Typography.body1, {color: color.blueGray_06}]}>
                        {(item.price * item.plantCount).toLocaleString()}원
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={(Typography.body2, {color: color.blueGray_02})}>
                        {item.careName}
                      </Text>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                listKey="service-list"
              />
            </View>
          </View>
          <View style={styles.mainItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              총 금액
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {matchingInfo?.totalPrice.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.mainItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              매칭 날짜
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {matchingInfo?.startDate} ~ {matchingInfo?.endDate} 총&nbsp;
              {matchingInfo && matchingInfo?.totalDate}일
            </Text>
          </View>
          <View style={styles.pickUpItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              픽업 형태
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {matchingInfo && pickupType[matchingInfo?.pickupType]}
            </Text>
          </View>
        </View>
        <View style={styles.btnView}>
          {status === 'care' ? (
            <CustomButton
              text="케어 완료하기"
              borderRadius={5}
              onPress={() => {
                onPressComplete('complete');
              }}
              backgroundColor={color.mint_05}
              style={{flex: 1}}
            />
          ) : status === 'request' ? (
            type === 1 ? (
              <View style={styles.newBtnWrap}>
                <CustomButton
                  text="매칭거절"
                  borderRadius={5}
                  backgroundColor={color.gray_00}
                  style={styles.refuseBtn}
                  textStyle={{color: color.blueGray_03}}
                  onPress={() => {
                    onPressComplete('refuse');
                  }}
                />
                <View style={{width: 8}} />
                <CustomButton
                  text="매칭수락"
                  borderRadius={5}
                  onPress={() => {
                    onPressComplete('accept');
                  }}
                  backgroundColor={color.mint_05}
                  style={styles.refuseBtn}
                />
              </View>
            ) : (
              <CustomButton
                text="매칭취소"
                borderRadius={5}
                backgroundColor={color.gray_00}
                style={styles.cancelBtnStyle}
                textStyle={{color: color.blueGray_03}}
                onPress={() => {
                  onPressComplete('cancel');
                }}
              />
            )
          ) : status === 'complete' ? (
            <CustomButton
              text={matchingInfo?.reviewId ? '남긴 리뷰 보기' : '리뷰 쓰기'}
              borderRadius={5}
              backgroundColor={color.gray_00}
              style={styles.completeBtnStyle}
              textStyle={{color: color.mint_06}}
              onPress={
                matchingInfo?.reviewId ? onPressShowReview : onPressWriteReview
              }
            />
          ) : null}
        </View>
      </ScrollView>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Text
            style={[
              Typography.subtitle2,
              {color: color.blueGray_06, marginTop: 40},
            ]}>
            {btnType === 'complete'
              ? '케어 완료'
              : btnType === 'accept'
              ? '매칭수락'
              : btnType === 'refuse'
              ? '매칭거절'
              : '매칭취소'}
          </Text>
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_05, marginTop: 8},
            ]}>
            {btnType === 'complete'
              ? '케어를 완료하시겠습니까?'
              : btnType === 'accept'
              ? '매칭을 수락하시겠습니까?'
              : btnType === 'refuse'
              ? '매칭을 거절하시겠습니까?'
              : '매칭을 취소하시겠습니까?'}
          </Text>
          <View style={styles.modalBtnWrap}>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={1}
              onPress={() => {
                setIsModalShown(false);
              }}>
              <Text style={[Typography.subtitle3, {color: color.blueGray_05}]}>
                {btnType === 'cancel' ? '닫기' : '취소'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={1}
              onPress={() => {
                switch (btnType) {
                  case 'complete':
                    changeStatus('complete');
                    break;
                  case 'accept':
                    changeStatus('care');
                    break;
                  case 'refuse':
                    changeStatus('cancel');
                    break;
                  case 'cancel':
                    changeStatus('cancel');
                    break;
                  default:
                    break;
                }
                setIsModalShown(false);
              }}>
              <Text
                style={[
                  Typography.subtitle3,
                  {
                    color:
                      btnType === 'complete' || btnType === 'accept'
                        ? color.mint_05
                        : color.red_02,
                  },
                ]}>
                {btnType === 'complete'
                  ? '완료'
                  : btnType === 'accept'
                  ? '수락'
                  : btnType === 'refuse'
                  ? '거절'
                  : '취소'}
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

const dstyles = (status: string, type?: number) =>
  StyleSheet.create({
    text: {
      color:
        status === 'care' || (status === 'request' && type === 1)
          ? color.mint_05
          : status === 'request'
          ? color.blueGray_06
          : color.blueGray_01,
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileWrap: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgWrap: {
    position: 'relative',
  },
  msgBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.blueGray_00,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileTextWrap: {
    marginLeft: 12,
  },
  badgeWrap: {
    marginLeft: 4,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    marginTop: 20,
    backgroundColor: '#FAFAFC',
    borderRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  serviceTypeWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E7EF',
  },
  serviceTypeListWrap: {
    marginTop: 19,
    marginBottom: 24,
  },
  serviceTypeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {height: 24},
  mainItemWrap: {
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E7EF',
  },
  pickUpItemWrap: {
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnView: {
    marginTop: 20,
  },
  cancelBtnStyle: {
    borderWidth: 1,
    borderColor: color.blueGray_00,
    flex: 1,
  },
  completeBtnStyle: {
    borderWidth: 1,
    borderColor: color.mint_02,
    flex: 1,
  },
  modalBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    flex: 1,
  },
  newBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refuseBtn: {
    borderWidth: 1,
    borderColor: color.blueGray_00,
    flex: 1,
  },
});
export default MatchingHistoryDetailScreen;
