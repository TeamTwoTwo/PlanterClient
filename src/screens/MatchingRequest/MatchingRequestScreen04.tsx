import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import CustomButton from '../../components/common/CustomButton';
import Modal from '../../components/common/Modal';
import MatchingHeader from '../../components/matching/MatchingHeader';
import {MatchingRequestInfoState} from '../../recoil/atoms/matchingRequest';
import {getData} from '../../utils/AsyncStorage';
import {color, screen, Typography, url} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import {OptionListType} from './MatchingRequestScreen01';

interface ButtonRefProps {
  isLoading: boolean;
}

const MatchingRequestScreen04 = () => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });
  const navigation = useNavigation<MainTabNavigationProp>();
  const matchingRequestInfo = useRecoilValue(MatchingRequestInfoState);
  console.log(matchingRequestInfo);
  const startDate = new Date(matchingRequestInfo.startDate);
  const endDate = new Date(matchingRequestInfo.endDate);
  const diff = Math.abs(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const [optionList, setOptionList] = useState<OptionListType[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  useEffect(() => {
    getData('auth')
      .then(auth => {
        axios
          .get(
            url.dev +
              `plant-managers/${matchingRequestInfo.plantManagerId}/option`,
            {
              headers: {Authorization: `Bearer ${auth.token}`},
            },
          )
          .then(res => {
            console.log(res.data.result);
            if (res.data.isSuccess) {
              setOptionList(res.data.result);
            }
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(optionList);
    let total = 0;
    matchingRequestInfo.service?.forEach(service => {
      service.optionId.forEach(optionId => {
        if (optionId) {
          optionList?.forEach(data => {
            if (data.optionId === optionId) {
              total += data.price;
            }
          });
        }
      });
    });
    setTotalPrice(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionList]);

  const onPressRequest = () => {
    setIsModalShown(true);
  };

  const onSubmit = () => {
    if (buttonRef.current.isLoading) {
      return;
    }

    buttonRef.current.isLoading = true;

    getData('auth')
      .then(auth => {
        axios
          .post(url.dev + 'matchings', matchingRequestInfo, {
            headers: {Authorization: `Bearer ${auth.token}`},
          })
          .then(res => {
            console.log(res);
            if (res.data.isSuccess) {
              navigation.navigate('MatchingHistory');
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

  const getPrice = (arr: (number | null)[]): number => {
    let price = 0;
    arr.forEach(optionId => {
      if (optionId) {
        optionList?.forEach(data => {
          if (data.optionId === optionId) {
            price += data.price;
          }
        });
      }
    });
    return price;
  };

  const getOptions = (arr: (number | null)[]): string => {
    let str = '';
    arr.forEach(optionId => {
      if (optionId) {
        optionList?.forEach(data => {
          if (data.optionId === optionId) {
            str += data.name + ', ';
          }
        });
      }
    });
    return str.slice(0, -2);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <MatchingHeader title="???????????? ??????" />
      </View>
      <View style={styles.main}>
        <View style={styles.content}>
          <View style={styles.serviceTypeWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              ????????? ??????
            </Text>
            <View style={styles.serviceTypeListWrap}>
              <FlatList
                scrollEnabled={false}
                data={matchingRequestInfo.service}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.serviceTypeItem}>
                      <Text
                        style={[Typography.body1, {color: color.blueGray_06}]}>
                        {item.plantName}
                      </Text>
                      <Text
                        style={[Typography.body1, {color: color.blueGray_06}]}>
                        {getPrice(item.optionId).toLocaleString()}???
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={(Typography.body2, {color: color.blueGray_02})}>
                        {getOptions(item.optionId)}
                      </Text>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                listKey="service-type-list"
              />
            </View>
          </View>
          <View style={[styles.mainItemWrap, styles.borderBottom]}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              ??? ??????
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {totalPrice.toLocaleString()}???
            </Text>
          </View>
          <View style={[styles.mainItemWrap, styles.borderBottom]}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              ?????? ??????
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {matchingRequestInfo.startDate?.slice(5, 7)}.&nbsp;
              {matchingRequestInfo.startDate?.slice(8, 10)}&nbsp;~&nbsp;
              {matchingRequestInfo.endDate?.slice(5, 7)}.&nbsp;
              {matchingRequestInfo.endDate?.slice(8, 10)} ??? {diff + 1}???
            </Text>
          </View>
          <View style={styles.mainItemWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_04}]}>
              ?????? ??????
            </Text>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {matchingRequestInfo.pickUpType
                ? '?????? ????????? ??? ????????? ????????????'
                : '?????? ?????? ????????? ????????? ?????????'}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.padding, {marginBottom: 10}]}>
        <CustomButton
          text="????????????"
          onPress={onPressRequest}
          backgroundColor={color.mint_05}
          borderRadius={6}
        />
      </View>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Text
            style={[
              Typography.subtitle2,
              {color: color.blueGray_06, marginTop: 40},
            ]}>
            ????????????
          </Text>
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_05, marginTop: 8},
            ]}>
            ????????? ?????????????????????????
          </Text>
          <View style={styles.modalBtnWrap}>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={1}
              onPress={() => {
                setIsModalShown(false);
              }}>
              <Text style={[Typography.subtitle3, {color: color.blueGray_05}]}>
                ??????
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={1}
              onPress={onSubmit}>
              <Text style={[Typography.subtitle3, {color: color.mint_05}]}>
                ??????
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  padding: {
    paddingHorizontal: 20,
  },
  progressBarWrap: {
    width: screen.width,
  },
  progressBarOuter: {
    height: 2,
    backgroundColor: color.blueGray_00,
  },
  progressBarInner: {
    width: '100%',
    height: 2,
    backgroundColor: color.blueGray_06,
  },
  main: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 20,
  },
  content: {
    backgroundColor: '#FAFAFC',
    borderRadius: 8,
    padding: 20,
    paddingBottom: 0,
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
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E7EF',
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
});
export default MatchingRequestScreen04;
