import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../RootStack';
import Place from '../../assets/icon/ic-place.svg';
import Message from '../../assets/icon/ic-message.svg';
import NoneCheck from '../../assets/icon/ic-nonecheck.svg';
import Filter from '../../assets/icon/ic-filter.svg';
import Cheked from '../../assets/icon/ic-cheked.svg';
import ChekedFilter from '../../assets/icon/ic-checked-filter.svg';
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
  const [photoCheck, setPhotoCheck] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<string>('가까운순');

  const navigation = useNavigation<RootStackNavigationProp>();

  const onAddList = (text: string): void => {
    setCheckList([...checkList, text]);

    if (checkList.includes(text)) {
      setCheckList(checkList.filter(check => check !== text));
    }
  };

  const onChecked = (): void => {
    setPhotoCheck(!photoCheck);
  };

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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('LocationScreen');
          }}>
          <View style={styles.navigation}>
            <Place />
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              서울 서대문구 연희동
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Message />
        </View>
      </View>
      <View style={styles.filter}>
        <FlatList
          horizontal
          data={dummy}
          renderItem={({item}: {item: Dummy}) => (
            <MatchingFilter
              text={item.text}
              onAddList={() => onAddList(item.text)}
              checkList={checkList}
            />
          )}
          keyExtractor={(item: Dummy) => item.id.toString()}
        />
      </View>
      <View style={styles.secondfilter}>
        <View style={styles.filterWrap}>
          <TouchableOpacity activeOpacity={1} onPress={onChecked}>
            {photoCheck ? <Cheked /> : <NoneCheck />}
          </TouchableOpacity>
          <Text style={[Typography.caption2, styles.filterText]}>
            사진 제공
          </Text>
        </View>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.filterWrap}>
            <Filter />
            <Text style={[Typography.caption2, styles.filterText]}>
              {checkedFilter}
            </Text>
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        <View style={styles.modalView}>
          <Pressable
            style={styles.filterLine}
            onPress={() => {
              setCheckedFilter('가까운순');
              setModalVisible(!modalVisible);
            }}>
            <Text
              style={[
                Typography.subtitle3,
                {
                  color:
                    checkedFilter === '가까운순'
                      ? color.blueGray_06
                      : color.gray_04,
                },
              ]}>
              가까운순
            </Text>
            {checkedFilter === '가까운순' && (
              <ChekedFilter style={{marginLeft: 5}} />
            )}
          </Pressable>
          <View style={styles.line} />
          <Pressable
            style={styles.filterLine}
            onPress={() => {
              setCheckedFilter('별점순');
              setModalVisible(!modalVisible);
            }}>
            <Text
              style={[
                Typography.subtitle3,
                {
                  color:
                    checkedFilter === '별점순'
                      ? color.blueGray_06
                      : color.gray_04,
                },
              ]}>
              별점순
            </Text>
            {checkedFilter === '별점순' && (
              <ChekedFilter style={{marginLeft: 5}} />
            )}
          </Pressable>
        </View>
      </Modal>

      <View style={styles.contentWrap}>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={userData}
          renderItem={({item}: {item: UserData}) => (
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
          keyExtractor={(item: UserData) => item.id.toString()}
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
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 203,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 40,
    paddingHorizontal: 32,
  },
  line: {
    borderTopWidth: 1,
    marginVertical: 20,
    borderColor: color.gray_02,
  },
  filterLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
