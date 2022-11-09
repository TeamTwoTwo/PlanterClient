import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {color, Typography, url} from '../../utils/utils';
import Message from '../../assets/icon/ic-message.svg';
import MatchingHistoryItem from '../../components/matchingHistory/MatchingHistoryItem';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';
import {ScrollView} from 'react-native-virtualized-view';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

const mockReq = ['care', 'complete', 'cancel', 'request'];
const mockRcv = ['care', 'complete', 'cancel', 'new'];

export interface ReqType {
  matchingId: number;
  plantManagerId: number;
  profileImg: string;
  name: string;
  category: number;
  requestAt: string;
  status: string;
}

const MatchingHistoryListScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isSelectedReq, setIsSelectedReq] = useState<boolean>(true);
  const [isSelectedRcv, setIsSelectedRcv] = useState<boolean>(false);
  const [reqList, setReqList] = useState<ReqType[] | undefined>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getReqList = () => {
    setRefreshing(true);
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'matchings', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          if (res.data.isSuccess) {
            console.log(res);
            setReqList(res.data.result);
            setRefreshing(false);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  useEffect(() => {
    getReqList();
  }, []);

  useEffect(() => {
    console.log(reqList);
  }, [reqList]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.matchingTypeWrap}>
          <TouchableOpacity
            style={tstyles(isSelectedReq).matchingType}
            onPress={() => {
              setIsSelectedReq(true);
              setIsSelectedRcv(false);
            }}
            activeOpacity={1}>
            <Text style={[tstyles(isSelectedReq).text, Typography.subtitle4]}>
              요청한
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tstyles(isSelectedRcv).matchingType, Typography.subtitle4]}
            onPress={() => {
              setIsSelectedReq(false);
              setIsSelectedRcv(true);
            }}
            activeOpacity={1}>
            <Text style={[tstyles(isSelectedRcv).text, Typography.subtitle4]}>
              받은
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.msgBtn} activeOpacity={0.5}>
          <Message stroke={'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getReqList} />
        }>
        <View style={styles.main}>
          <View style={styles.upperListWrap}>
            <View style={styles.textWrap}>
              <Text style={[Typography.subtitle1, {color: color.blueGray_06}]}>
                진행중인 매칭
              </Text>
            </View>
            <View style={styles.matchingListWrap}>
              {
                isSelectedReq ? (
                  <FlatList
                    data={reqList}
                    renderItem={({item}) =>
                      item.status === 'care' || item.status === 'request' ? (
                        <MatchingHistoryItem
                          info={item}
                          onPress={() => {
                            navigation.navigate('MatchingHistoryDetailScreen', {
                              matchingId: item.matchingId,
                            });
                          }}
                        />
                      ) : null
                    }
                    keyExtractor={(item, idx) => item.matchingId.toString()}
                    listKey="reqList"
                  />
                ) : null
                // <FlatList
                //   data={mockRcv}
                //   renderItem={({item}) => (
                //     <MatchingHistoryItem
                //       info={item}
                //       onPress={() => {
                //         navigation.navigate('MatchingHistoryDetailScreen', {
                //           type: item,
                //         });
                //       }}
                //     />
                //   )}
                //   keyExtractor={item => `img ${item}`}
                // />
              }
            </View>
          </View>
          <View style={styles.lowerListWrap}>
            <View style={styles.textWrap}>
              <Text style={[Typography.subtitle1, {color: color.blueGray_06}]}>
                지난 매칭
              </Text>
            </View>
            <View style={styles.matchingListWrap}>
              {
                isSelectedReq ? (
                  <FlatList
                    data={reqList}
                    renderItem={({item}) =>
                      item.status === 'cancel' || item.status === 'complete' ? (
                        <MatchingHistoryItem
                          info={item}
                          onPress={() => {
                            navigation.navigate('MatchingHistoryDetailScreen', {
                              matchingId: item.matchingId,
                            });
                          }}
                        />
                      ) : null
                    }
                    keyExtractor={(item, idx) => item.matchingId.toString()}
                    listKey="reqList"
                  />
                ) : null
                // <FlatList
                //   data={mockRcv}
                //   renderItem={({item}) => (
                //     <MatchingHistoryItem
                //       info={item}
                //       onPress={() => {
                //         navigation.navigate('MatchingHistoryDetailScreen', {
                //           type: item,
                //         });
                //       }}
                //     />
                //   )}
                //   keyExtractor={item => `img ${item}`}
                // />
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const tstyles = (isSelected: boolean) =>
  StyleSheet.create({
    matchingType: {
      backgroundColor: isSelected ? color.gray_00 : color.blueGray_00,
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 8,
    },
    text: {
      color: isSelected ? color.blueGray_06 : color.blueGray_03,
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
  },
  matchingTypeWrap: {
    backgroundColor: color.blueGray_00,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgBtn: {
    padding: 8,
    marginRight: -8,
  },
  main: {
    marginTop: 24,
  },
  matchingListWrap: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  upperListWrap: {
    borderBottomWidth: 1,
    borderBottomColor: color.blueGray_00,
  },
  lowerListWrap: {
    paddingTop: 32,
  },
  textWrap: {
    paddingHorizontal: 20,
  },
});
export default MatchingHistoryListScreen;
