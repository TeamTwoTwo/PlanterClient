import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Back from '../../assets/icon/ic-back.svg';
import CalendarPicker from 'react-native-calendar-picker';

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

const Calendar = () => {
  const [today, setToday] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [date, setDate] = useState<number>(today.getDate());
  const [monthLastDate, setMonthLastDate] = useState<number>(
    new Date(year, month, 0).getDate(),
  );
  const [monthStartDay, setMonthStartDay] = useState<number>(
    new Date(year, month - 1, 1).getDay(),
  );
  const [weekCnt, setWeekCnt] = useState<number>(
    Math.ceil((monthStartDay + monthLastDate) / 7),
  );

  const [viewWidth, setViewWidth] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<number[]>([]);

  const initCal = (): JSX.Element[][] => {
    let parList = [];
    let list = [];
    let day = 0;
    let position = 0;
    const tmpToday = new Date();
    const tmpYear = tmpToday.getFullYear();
    const tmpMonth = tmpToday.getMonth() + 1;
    const tmpDate = tmpToday.getDate();
    const tmpMonthLastDate = new Date(tmpYear, tmpMonth, 0).getDate();
    const tmpMonthStartDay = new Date(tmpYear, tmpMonth - 1, 1).getDay();
    const tmpWeekCnt = Math.ceil((tmpMonthStartDay + tmpMonthLastDate) / 7);

    for (let i = 0; i < tmpWeekCnt; i++) {
      for (let j = 0; j < 7; j++) {
        if (tmpMonthStartDay <= position && day < tmpMonthLastDate) {
          day++;
          list.push(
            <TouchableOpacity
              style={dstyles(viewWidth).dayStyle}
              disabled={day < tmpDate ? true : false}>
              <Text
                style={[
                  Typography.body2,
                  {
                    color:
                      day < tmpDate ? color.blueGray_01 : color.blueGray_06,
                  },
                ]}>
                {day}
              </Text>
            </TouchableOpacity>,
          );
        } else {
          list.push(<View style={dstyles(viewWidth).empty} />);
        }
        position++;
      }
      parList.push(list);
      list = [];
    }
    console.log(parList);
    return parList;
  };

  const [calList, setCalList] = useState<JSX.Element[][]>(initCal);
  useEffect(() => {
    console.log(calList);
    // moveToNextMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(today);
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());
  }, [today]);

  useEffect(() => {
    setMonthLastDate(new Date(year, month, 0).getDate());
    setMonthStartDay(new Date(year, month - 1, 1).getDay());
  }, [year, month]);

  useEffect(() => {
    setWeekCnt(Math.ceil((monthStartDay + monthLastDate) / 7));
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthLastDate, monthStartDay, weekCnt]);

  const moveToPrevMonth = () => {
    setToday(
      new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
    );
  };

  const moveToNextMonth = () => {
    setToday(
      new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
    );
  };

  const onLayout = (e: {nativeEvent: {layout: {width: number}}}) => {
    const {width} = e.nativeEvent.layout;
    setViewWidth(width);
  };

  const onPressDate = (day: any) => {
    console.log(day);
    // let list = [...selectedDate];
    // if (list.length === 2) {
    //   list = [];
    // }
    // list.push(day);
    // setSelectedDate(list);
  };

  useEffect(() => {
    console.log('selectedDate :>> ', selectedDate);
  }, [selectedDate]);

  const draw = () => {
    console.log('monthStartDay :>> ', monthStartDay);
    console.log('monthLastDate :>> ', monthLastDate);
    console.log('weekCnt :>> ', weekCnt);
    let parList: JSX.Element[][] = [];
    let list = [];
    let day = 0;
    let position = 0;
    for (let i = 0; i < weekCnt; i++) {
      for (let j = 0; j < 7; j++) {
        if (monthStartDay <= position && day < monthLastDate) {
          day++;
          const todayDate = new Date();
          list.push(
            <View style={styles.dayItemWrap}>
              <TouchableOpacity
                onPress={() => {
                  onPressDate(
                    new Date(year, month - 1, day).toLocaleString('ko-KR', {
                      timeZone: 'UTC',
                    }),
                  );
                }}
                style={dstyles(viewWidth).dayStyle}
                disabled={
                  year < todayDate.getFullYear() ||
                  (year === todayDate.getFullYear() &&
                    month < todayDate.getMonth() + 1) ||
                  (year === todayDate.getFullYear() &&
                    month === todayDate.getMonth() + 1 &&
                    day < date)
                    ? true
                    : false
                }>
                <Text
                  style={[
                    Typography.body2,
                    {
                      color:
                        year < todayDate.getFullYear() ||
                        (year === todayDate.getFullYear() &&
                          month < todayDate.getMonth() + 1) ||
                        (year === todayDate.getFullYear() &&
                          month === todayDate.getMonth() + 1 &&
                          day < date)
                          ? color.blueGray_01
                          : color.blueGray_06,
                    },
                  ]}>
                  {day}
                </Text>
              </TouchableOpacity>
              <View style={dstyles(viewWidth).selectedDay} />
            </View>,
          );
        } else {
          list.push(<View style={dstyles(viewWidth).empty} />);
        }
        position++;
      }
      parList.push(list);
      list = [];
    }
    setCalList(parList);
    // dispatch(parList);
  };

  return (
    <View style={styles.wrap} onLayout={onLayout}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={moveToPrevMonth}>
          <Back stroke={color.blueGray_01} />
        </TouchableOpacity>
        <Text style={[Typography.subtitle1, styles.headerText]}>
          {year}년&nbsp;{month}월
        </Text>
        <TouchableOpacity style={styles.arrow} onPress={moveToNextMonth}>
          <View style={{transform: [{scaleX: -1}]}}>
            <Back stroke={color.blueGray_01} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dayWrap}>
        {arr.map((item, idx) => (
          <View style={dstyles(viewWidth).dayItemWrap} key={idx}>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.main}>
        <FlatList
          data={calList}
          renderItem={({item}) => <View style={styles.datesWrap}>{item}</View>}
          keyExtractor={(item, idx) => `calendar ${idx}`}
        />
      </View>
    </View>
  );
};

const dstyles = (width: number) =>
  StyleSheet.create({
    empty: {
      width: width / 7,
      height: width / 7,
    },
    dayStyle: {
      width: width / 7,
      height: width / 7,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    dayItemWrap: {
      width: width / 7,
      alignItems: 'center',
    },
    selectedDay: {
      width: width / 7,
      height: width / 7,
      backgroundColor: color.mint_01,
      position: 'absolute',
      top: 0,
    },
    circle: {
      borderRadius: width / 14,
    },
    leftCircle: {
      borderTopLeftRadius: width / 14,
      borderBottomLeftRadius: width / 14,
    },
    rightCircle: {
      borderTopRightRadius: width / 14,
      borderBottomRighttRadius: width / 14,
    },
  });

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: color.blueGray_06,
    marginHorizontal: 12,
  },
  arrow: {
    padding: 8,
  },
  dayWrap: {
    marginTop: 31,
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    marginTop: 10,
  },
  datesWrap: {
    flexDirection: 'row',
  },
  dayItemWrap: {
    position: 'relative',
  },
});

export default Calendar;
