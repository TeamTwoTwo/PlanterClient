import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MatchingHeader from '../../components/matching/MatchingHeader';
import {getData} from '../../utils/AsyncStorage';
import {color, Typography, url} from '../../utils/utils';
import Check from '../../assets/icon/ic-report-checked.svg';
import CustomButton from '../../components/common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';
import Toast from '../../components/common/Toast';

const text = [
  '결제 후 연락 두절',
  '식물 관리 미흡',
  '부적절한 쪽지(광고, 비방성)',
  '기타',
];

const ReportScreen = ({route}: any) => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const {plantManagerId, name} = route?.params;
  const [clickedItemNum, setClickedItemNum] = useState<number | undefined>();
  const [toastStatus, setToastStatus] = useState<boolean>(false);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => {
        setToastStatus(false);
        navigation.popToTop();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastStatus]);

  const onPressReport = () => {
    getData('auth').then(auth => {
      axios
        .post(
          url.dev + 'reports',
          {plantManagerId},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          console.log(res.data.result);
          if (res.data.isSuccess) {
            setToastStatus(true);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <MatchingHeader title="신고하기" />
      </View>
      <View style={[styles.main, styles.padding]}>
        <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
          '{name}'님을{'\n'}신고하시는 이유를 선택해주세요.
        </Text>
        <View style={styles.btnWrap}>
          <FlatList
            data={text}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={1}
                style={dstyles(index, clickedItemNum).btn}
                onPress={() => {
                  setClickedItemNum(index);
                }}>
                <View style={styles.btnContent}>
                  <Text
                    style={[
                      Typography.subtitle3,
                      dstyles(index, clickedItemNum).btnText,
                    ]}>
                    {item}
                  </Text>
                  {index === clickedItemNum && <Check />}
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
      <View>
        <CustomButton
          text="신고하기"
          backgroundColor={color.mint_05}
          onPress={onPressReport}
          disabled={clickedItemNum === undefined ? true : false}
        />
      </View>
      {toastStatus && (
        <View style={[styles.toast, styles.padding]}>
          <Toast text="신고가 접수되었습니다." />
        </View>
      )}
    </SafeAreaView>
  );
};

const dstyles = (idx: number, clicked: number | undefined) =>
  StyleSheet.create({
    btn: {
      borderWidth: idx === clicked ? 2 : 1,
      borderColor: idx === clicked ? color.mint_05 : color.blueGray_00,
      borderRadius: 6,
      padding: idx === clicked ? 13 : 14,
    },
    btnText: {
      color: idx === clicked ? color.blueGray_06 : color.blueGray_02,
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
  main: {
    marginTop: 20,
    flex: 1,
  },
  btnWrap: {
    marginTop: 39,
  },
  btnContent: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 12,
  },
  toast: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
  },
});
export default ReportScreen;
