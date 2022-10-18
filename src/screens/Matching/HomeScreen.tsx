import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils';
import Place from '../../assets/icon/ic-place';
import Message from '../../assets/icon/ic-message';
import NoneCheck from '../../assets/icon/ic-nonecheck';
import Filter from '../../assets/icon/ic-filter';
import MatchingFilter from '../../components/matching/MatchingFilter';
import MatchingItem from '../../components/matching/MatchingItem';

interface Dummy {
  id: number;
  text: string;
}

interface UserData {
  id: number;
  name: string;
  job: string;
  distance: string;
  info: string;
  grade: string;
  bodyText: string;
  money: string;
  day: string;
}

const HomeScreen = () => {
  const [checkList, setCheckList] = useState<string[]>(['식물 집사']);

  const onAddList = (text: string) => {
    setCheckList([...checkList, text]);

    if (checkList.includes(text)) {
      setCheckList(checkList.filter(check => check !== text));
    }
  };

  console.log(checkList);

  const dummy: Dummy[] = [
    {id: 1, text: '식물 집사'},
    {id: 2, text: '꽃집'},
    {id: 3, text: '식물 전문가'},
    {id: 4, text: '식물 케어 서비스'},
  ];

  const userData: UserData[] = [
    {
      id: 1,
      name: '김보경',
      job: '식물집사',
      distance: '335km',
      info: '사진 제공',
      grade: '4.8',
      bodyText:
        '식물을 사랑한 지 12년차 된 식물집사입니다. 내 식물이라고 생각하고',
      money: '5000원',
      day: '1일',
    },
    {
      id: 2,
      name: '김보경',
      job: '식물집사',
      distance: '335km',
      info: '사진 제공',
      grade: '4.8',
      bodyText:
        '식물을 사랑한 지 12년차 된 식물집사입니다. 내 식물이라고 생각하고',
      money: '5000원',
      day: '1일',
    },
    {
      id: 3,
      name: '김보경',
      job: '식물집사',
      distance: '335km',
      info: '사진 제공',
      grade: '4.8',
      bodyText:
        '식물을 사랑한 지 12년차 된 식물집사입니다. 내 식물이라고 생각하고',
      money: '5000원',
      day: '1일',
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.head}>
        <View style={styles.navigation}>
          <Place size={20} />
          <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
            서울 서대문구 연희동
          </Text>
        </View>
        <View>
          <Message size={24} />
        </View>
      </View>
      <View style={styles.filter}>
        <FlatList
          horizontal
          data={dummy}
          renderItem={({item}: Dummy) => (
            <MatchingFilter
              text={item.text}
              onAddList={() => onAddList(item.text)}
              checkList={checkList}
            />
          )}
          keyExtractor={(item: Dummy) => item.id}
        />
      </View>
      <View style={styles.secondfilter}>
        <View style={styles.filterWrap}>
          <NoneCheck size={20} />
          <Text style={[Typography.caption2, styles.filterText]}>
            사진 제공
          </Text>
        </View>
        <View style={styles.filterWrap}>
          <Filter size={16} />
          <Text style={[Typography.caption2, styles.filterText]}>가까운순</Text>
        </View>
      </View>
      <View style={styles.contentWrap}>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={userData}
          renderItem={({item}: UserData) => (
            <MatchingItem
              name={item.name}
              job={item.job}
              distance={item.distance}
              info={item.info}
              grade={item.grade}
              bodyText={item.bodyText}
              money={item.money}
              day={item.day}
            />
          )}
          keyExtractor={(item: UserData) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  head: {
    // borderWidth: 1,
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 12,
    flexDirection: 'row',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    // borderWidth: 1,
    height: 48,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondfilter: {
    borderBottomWidth: 1,
    borderColor: color.gray_02,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {
    marginLeft: 4,
    color: color.blueGray_06,
  },
  contentWrap: {
    flex: 1,
  },
});

export default HomeScreen;
