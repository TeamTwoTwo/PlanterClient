import React, {useState, useEffect} from 'react';
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
import {color, Typography, url} from '../../utils/utils';
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
import {MainTabNavigationProp} from '../MainTab';
import {removeData} from '../../utils/AsyncStorage';
import {useRecoilState} from 'recoil';
import {LoginStatusState} from '../../recoil/atoms/loginStatus';
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

  const onAddList = (text: string): void => {
    setCheckList([...checkList, text]);

    if (checkList.includes(text)) {
      setCheckList(checkList.filter(check => check !== text));
    }
  };

  const onChecked = (): void => {
    setPhotoCheck(!photoCheck);
  };

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'plant-managers', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          console.log(res.data.result);
          setUserData(res.data.result);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, []);

  const dummy: Dummy[] = [
    {id: 1, text: '식물 집사'},
    {id: 2, text: '꽃집'},
    {id: 3, text: '식물 전문가'},
    {id: 4, text: '식물케어 서비스'},
  ];

  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusState);
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
        <TouchableOpacity
          onPress={() => {
            removeData('auth');
            setLoginStatus({isLogined: false});
          }}>
          <Text>logout</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate('MessageScreen');
          }}>
          <Message stroke={'black'} />
        </Pressable>
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
              category={item.category}
              distance={item.distance}
              profileImg={item.profileImg}
              isPhoto={item.isPhoto}
              rate={item.rate}
              description={item.description}
              minPrice={item.minPrice}
              onPress={() => {
                navigation.navigate('ExpertDetailScreen', {plantManagerId: 2});
              }}
            />
          )}
          keyExtractor={(item: UserData) => item.id.toString()}
          ListFooterComponent={<View style={styles.last} />}
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
  last: {
    marginTop: 70,
  },
});

export default HomeScreen;
