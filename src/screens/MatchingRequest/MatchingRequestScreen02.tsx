import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/common/CustomButton';
import MatchingHeader from '../../components/matching/MatchingHeader';
import {color, screen, Typography} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import CalendarPicker from 'react-native-calendar-picker';
import Back from '../../assets/icon/ic-back.svg';
import {useRecoilState} from 'recoil';
import {MatchingRequestInfoState} from '../../recoil/atoms/matchingRequest';

const arr = ['일', '월', '화', '수', '목', '금', '토'];
const monthArr = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

interface SelectedDateType {
  day: number;
  hour: number;
  month: number;
  year: number;
}

const MatchingRequestScreen02 = () => {
  const [MatchingRequestInfo, setMatchingRequestInfo] = useRecoilState(
    MatchingRequestInfoState,
  );
  const navigation = useNavigation<MainTabNavigationProp>();
  const minDate = new Date();
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [selectedStartDate, setSelectedStartDate] =
    useState<SelectedDateType>();
  const [selectedEndDate, setSelectedEndDate] = useState<SelectedDateType>();

  useEffect(() => {
    console.log('selectedStartDate :>> ', selectedStartDate);
    console.log('selectedEndDate :>> ', selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const onNavigate = () => {
    if (selectedStartDate && selectedEndDate) {
      let startDate = `${selectedStartDate?.year}-${
        selectedStartDate?.month + 1 < 10
          ? '0' + selectedStartDate?.month + 1
          : selectedStartDate?.month + 1
      }-${
        selectedStartDate?.day < 10
          ? '0' + selectedStartDate?.day
          : selectedStartDate?.day
      }`;
      let endDate = `${selectedEndDate?.year}-${
        selectedEndDate?.month + 1 < 10
          ? '0' + selectedEndDate?.month + 1
          : selectedEndDate?.month + 1
      }-${
        selectedEndDate?.day < 10
          ? '0' + selectedEndDate?.day
          : selectedEndDate?.day
      }`;

      console.log(startDate);
      console.log(endDate);
      setMatchingRequestInfo({...MatchingRequestInfo, startDate, endDate});
      navigation.navigate('MatchingRequestScreen03');
    }
  };

  const onLayout = (e: {nativeEvent: {layout: {width: number}}}) => {
    const {width} = e.nativeEvent.layout;
    setViewWidth(width);
  };

  const onDateChange = (date: any, type: any) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date?._i);
    } else {
      setSelectedStartDate(date?._i);
      setSelectedEndDate(undefined);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <MatchingHeader title="매칭날짜 선택" />
      </View>
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarOuter}>
          <View style={styles.progressBarInner} />
        </View>
      </View>
      <View style={styles.main} onLayout={onLayout}>
        <CalendarPicker
          selectMonthTitle=""
          selectYearTitle="연도"
          weekdays={arr}
          months={monthArr}
          headerWrapperStyle={{width: screen.width * 0.5}}
          dayLabelsWrapper={{borderTopWidth: 0, borderBottomWidth: 0}}
          textStyle={[Typography.body2, {color: color.blueGray_06}]}
          yearTitleStyle={[Typography.subtitle1, {color: color.blueGray_06}]}
          monthTitleStyle={[Typography.subtitle1, {color: color.blueGray_06}]}
          allowRangeSelection
          allowBackwardRangeSelect
          previousComponent={
            <View style={styles.arrow}>
              <Back stroke={color.blueGray_01} />
            </View>
          }
          nextComponent={
            <View style={[styles.arrow, {transform: [{scaleX: -1}]}]}>
              <Back stroke={color.blueGray_01} />
            </View>
          }
          minDate={minDate}
          disabledDatesTextStyle={{color: color.blueGray_01}}
          todayBackgroundColor={'white'}
          todayTextStyle={[Typography.body1, {color: color.blueGray_06}]}
          selectedDayColor={color.mint_01}
          selectedRangeStyle={{
            backgroundColor: color.mint_01,
            width: viewWidth / 7,
            height: viewWidth / 10,
          }}
          selectedDayTextStyle={[
            Typography.subtitle4,
            {color: color.blueGray_06},
          ]}
          onDateChange={onDateChange}
        />
      </View>
      <View>
        <CustomButton
          text="다음"
          onPress={onNavigate}
          backgroundColor={color.mint_05}
          style={{width: screen.width}}
          disabled={
            selectedStartDate !== undefined && selectedEndDate !== undefined
              ? false
              : true
          }
        />
      </View>
    </SafeAreaView>
  );
};

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
    width: '50%',
    height: 2,
    backgroundColor: color.blueGray_06,
  },
  main: {
    marginTop: 32,
    flex: 1,
    alignItems: 'center',
  },
  arrow: {
    padding: 8,
  },
});
export default MatchingRequestScreen02;
