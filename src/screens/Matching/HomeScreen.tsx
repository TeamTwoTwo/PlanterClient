import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import Place from '../../assets/icon/ic-place.svg';
import Message from '../../assets/icon/ic-message.svg';
import NoneCheck from '../../assets/icon/ic-nonecheck.svg';
import Filter from '../../assets/icon/ic-filter.svg';
import Cheked from '../../assets/icon/ic-cheked.svg';
import ChekedFilter from '../../assets/icon/ic-checked-filter.svg';
import MatchingFilter from '../../components/matching/MatchingFilter';
import MatchingItem from '../../components/matching/MatchingItem';
import {MainTabNavigationProp} from '../MainTab';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

interface Dummy {
  id: number;
  text: string;
}

interface UserData {
  id: number;
  name: string;
  category: number;
  profileImg: string;
  distance: number;
  isPhoto: boolean;
  rate: number;
  description: string;
  minPrice: number;
}

const HomeScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [checkList, setCheckList] = useState<string[]>([]);
  const [photoCheck, setPhotoCheck] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<string>('가까운순');
  const [userData, setUserData] = useState<UserData[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  const onAddList = (text: string): void => {
    setCheckList([...checkList, text]);

    if (checkList.includes(text)) {
      setCheckList(checkList.filter(check => check !== text));
    }
  };

  const onChecked = (): void => {
    setPhotoCheck(!photoCheck);
  };

  const getMatchingList = () => {
    setRefreshing(true);
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'plant-managers', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          console.log(res.data.result);
          if (res.data.isSuccess) {
            setUserData(res.data.result);
            setRefreshing(false);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  const getUserInfo = () => {
    getData('userInfo').then(info => {
      setAddress(info.simpleAddress);
    });
  };

  useEffect(() => {
    getMatchingList();
    getUserInfo();
  }, []);

  const dummy: Dummy[] = [
    {id: 1, text: '식물 집사'},
    {id: 2, text: '꽃집'},
    {id: 3, text: '식물 전문가'},
    {id: 4, text: '식물케어 서비스'},
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.head}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.navigation}>
            <Place />
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {address}
            </Text>
          </View>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate('MessageScreen', {type: 'Matching'});
          }}>
          <Message stroke={'black'} />
        </Pressable>
      </View>
      {/* <View style={styles.filter}>
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
          listKey='matching-home-filter'
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
      </View> */}

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getMatchingList}
            />
          }
          showsVerticalScrollIndicator={false}
          data={userData}
          renderItem={({item}: {item: UserData}) => (
            <MatchingItem
              id={item.id}
              name={item.name}
              category={item.category}
              distance={item.distance}
              profileImg={item.profileImg}
              isPhoto={item.isPhoto}
              rate={item.rate}
              description={item.description}
              minPrice={item.minPrice}
              onPress={() => {
                navigation.navigate('ExpertDetailScreen', {
                  plantManagerId: item.id,
                  type: 'ExpertDetailScreen',
                });
              }}
            />
          )}
          keyExtractor={(item: UserData) => item.id.toString()}
          ListFooterComponent={<View style={styles.last} />}
          listKey="matching-card-list"
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
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.gray_02,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
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
  last: {
    marginTop: 70,
  },
});

export default HomeScreen;
