import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {color, screen, Typography} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Badge from '../../assets/icon/ic-plant-badge.svg';
import Message from '../../assets/icon/ic-message.svg';
import {ScrollView} from 'react-native-virtualized-view';
import CustomButton from '../../components/common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';
import Modal from '../../components/common/Modal';

const mock = [
  {name: '스파티필름', num: 1, price: 5000, type: '식물관리'},
  {name: '몬스테라', num: 2, price: 10000, type: '가지치기'},
];

const MatchingHistoryDetailScreen = ({route}: any) => {
  const {type} = route?.params;
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [btnType, setBtnType] = useState<string>();

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

  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader
        title={
          type === 'request' || type === 'care' || type === 'new'
            ? '진행중인 매칭'
            : '완료된 매칭'
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileWrap}>
          <View style={styles.imgWrap}>
            <Image
              source={require('../../assets/img/img-expert-profile.png')}
              style={styles.profileImg}
            />
            <TouchableOpacity style={styles.msgBtn} activeOpacity={0.5}>
              <Message stroke={'black'} width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileTextWrap}>
            <Text style={[Typography.subtitle4, dstyles(type).text]}>
              {type === 'care'
                ? '케어 진행중'
                : type === 'request'
                ? '매칭 요청중'
                : type === 'complete'
                ? '케어 완료'
                : type === 'cancel'
                ? '매칭 취소'
                : '새 매칭 요청'}
            </Text>
            <View style={styles.nameWrap}>
              <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
                김보경
              </Text>
              <View style={styles.badgeWrap}>{<Badge />}</View>
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                식물 집사
              </Text>
            </View>
            <Text style={[Typography.body2, {color: color.blueGray_02}]}>
              요정일시 2022.10.24
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
                data={mock}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.serviceTypeItem}>
                      <Text
                        style={[Typography.body1, {color: color.blueGray_06}]}>
                        {item.name}&nbsp;x&nbsp;{item.num}개
                      </Text>
                      <Text
                        style={[Typography.body1, {color: color.blueGray_06}]}>
                        {(item.price * item.num).toLocaleString()}원
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={(Typography.body2, {color: color.blueGray_02})}>
                        {item.type}
                      </Text>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <View style={styles.mainItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              총 금액
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              25,000원
            </Text>
          </View>
          <View style={styles.mainItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              매칭 날짜
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              10.12 ~ 10.14 총 3일
            </Text>
          </View>
          <View style={styles.mainItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              픽업 형태
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              제가 매칭 상대의 주소에 갈게요
            </Text>
          </View>
        </View>
        <View style={styles.btnView}>
          {type === 'care' ? (
            <CustomButton
              text="케어 완료하기"
              borderRadius={5}
              onPress={() => {
                onPressComplete('complete');
              }}
              backgroundColor={color.mint_05}
              style={{flex: 1}}
            />
          ) : type === 'request' ? (
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
          ) : type === 'complete' ? (
            <CustomButton
              text="남긴 리뷰 보기"
              borderRadius={5}
              backgroundColor={color.gray_00}
              style={styles.completeBtnStyle}
              textStyle={{color: color.mint_06}}
              onPress={() => {}}
            />
          ) : type === 'new' ? (
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
                    navigation.navigate('ReviewStarScreen');
                    break;
                  case 'accept':
                    break;
                  case 'refuse':
                    break;
                  case 'cancel':
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

const dstyles = (type: string) =>
  StyleSheet.create({
    text: {
      color:
        type === 'care' || type === 'new'
          ? color.mint_05
          : type === 'request'
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
    padding: 20,
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
