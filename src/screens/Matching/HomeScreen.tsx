import React, {useState, useEffect, useCallback} from 'react';
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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
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
  const [checkList, setCheckList] = useState<number[]>([]);
  const [photoCheck, setPhotoCheck] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<number>(0);
  const [userData, setUserData] = useState<UserData[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [simpleAddress, setSimpleAddress] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const onAddList = (id: number): void => {
    setCheckList([...checkList, id]);

    if (checkList.includes(id)) {
      setCheckList(checkList.filter(check => check !== id));
    }
  };

  const dummy: Dummy[] = [
    {id: 0, text: '식물 집사'},
    {id: 1, text: '꽃집'},
    {id: 2, text: '식물 전문가'},
    {id: 3, text: '식물케어 서비스'},
  ];

  const onChecked = (): void => {
    setPhotoCheck(!photoCheck);
  };

  const getMatchingList = (): void => {
    setRefreshing(true);
    getData('auth').then(auth => {
      axios
        .get(
          url.dev +
            `plant-managers?category=${checkList}&sort=${checkedFilter}&isPhoto=${photoCheck}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          if (res.data.isSuccess) {
            console.log(res.data.result);
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
      setSimpleAddress(info.simpleAddress);
      setLocationAddress(info.address);
    });
    getData('auth').then(info => {
      setUserId(info.userId);
      console.log(info.userId);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo(); // 화면이 포커스 됐을 때
      return () => {
        console.log('나가욥'); // 화면 포커스 아웃 됐을 때
      };
    }, []),
  );

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(
          url.dev +
            `plant-managers?category=${checkList}&sort=${checkedFilter}&isPhoto=${photoCheck}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          if (res.data.isSuccess) {
            setUserData(res.data.result);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, [checkList, checkedFilter, photoCheck]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.head}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('LocationScreen', {
              simpleAddress,
              locationAddress,
              userId,
            });
          }}>
          <View style={styles.navigation}>
            <Place />
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              {simpleAddress}
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
      <View style={styles.filter}>
        <FlatList
          scrollEnabled={false}
          horizontal
          data={dummy}
          renderItem={({item}: {item: Dummy}) => (
            <MatchingFilter
              text={item.text}
              id={item.id}
              onAddList={() => onAddList(item.id)}
              checkList={checkList}
            />
          )}
          keyExtractor={(item: Dummy) => item.id.toString()}
          listKey="matching-home-filter"
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
              {checkedFilter === 0 ? '가까운순' : '별점순'}
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
              setCheckedFilter(0);
              setModalVisible(!modalVisible);
            }}>
            <Text
              style={[
                Typography.subtitle3,
                {
                  color:
                    checkedFilter === 0 ? color.blueGray_06 : color.gray_04,
                },
              ]}>
              가까운순
            </Text>
            {checkedFilter === 0 && <ChekedFilter style={{marginLeft: 5}} />}
          </Pressable>
          <View style={styles.line} />
          <Pressable
            style={styles.filterLine}
            onPress={() => {
              setCheckedFilter(1);
              setModalVisible(!modalVisible);
            }}>
            <Text
              style={[
                Typography.subtitle3,
                {
                  color:
                    checkedFilter === 1 ? color.blueGray_06 : color.gray_04,
                },
              ]}>
              별점순
            </Text>
            {checkedFilter === 1 && <ChekedFilter style={{marginLeft: 5}} />}
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
                });
              }}
            />
          )}
          keyExtractor={(item: UserData) => item.id.toString()}
          ListFooterComponent={() => <View style={styles.last} />}
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
  contentWrap: {},
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
    height: 170,
  },
});

export default HomeScreen;
