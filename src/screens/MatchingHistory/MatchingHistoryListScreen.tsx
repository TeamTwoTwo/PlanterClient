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
import NoMatchingHistory from '../../components/matchingHistory/NoMatchingHistory';

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
  const [reqLastList, setReqLastList] = useState<ReqType[] | undefined>();
  const [reqIngList, setReqIngList] = useState<ReqType[] | undefined>();
  const [rcvList, setRcvList] = useState<ReqType[] | undefined>();
  const [rcvLastList, setRcvLastList] = useState<ReqType[] | undefined>();
  const [rcvIngList, setRcvIngList] = useState<ReqType[] | undefined>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [noMatchingViewWidth, setNoMatchingViewWidth] = useState<number>(0);
  const [noMatchingViewHeight, setNoMatchingViewHeight] = useState<number>(0);
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [viewHeight, setViewHeight] = useState<number>(0);

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
    let last: ReqType[] = [];
    let ing: ReqType[] = [];
    reqList?.forEach(data => {
      if (data.status === 'complete' || data.status === 'cancel') {
        last.push(data);
      } else {
        ing.push(data);
      }
    });
    setReqLastList(last);
    setReqIngList(ing);
  }, [reqList]);

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setViewWidth(width);
    setViewHeight(height);
  };

  const onLayoutNoView = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setNoMatchingViewWidth(width);
    setNoMatchingViewHeight(height);
  };

  return (
    <SafeAreaView style={styles.safe} onLayout={onLayout}>
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
          {isSelectedReq ? (
            reqList ? (
              <>
                <View>
                  <View style={styles.textWrap}>
                    <Text
                      style={[
                        Typography.subtitle1,
                        {color: color.blueGray_06},
                      ]}>
                      진행중인 매칭
                    </Text>
                  </View>
                  <FlatList
                    data={reqIngList}
                    renderItem={({item}) => (
                      <MatchingHistoryItem
                        info={item}
                        onPress={() => {
                          navigation.navigate('MatchingHistoryDetailScreen', {
                            matchingId: item.matchingId,
                          });
                        }}
                      />
                    )}
                    keyExtractor={(item, idx) => item.matchingId.toString()}
                  />
                </View>
                {reqIngList && reqLastList ? (
                  <View style={styles.separator} />
                ) : null}

                <View style={styles.textWrap}>
                  <Text
                    style={[Typography.subtitle1, {color: color.blueGray_06}]}>
                    지난 매칭
                  </Text>
                </View>
                <FlatList
                  data={reqLastList}
                  renderItem={({item}) => (
                    <MatchingHistoryItem
                      info={item}
                      onPress={() => {
                        navigation.navigate('MatchingHistoryDetailScreen', {
                          matchingId: item.matchingId,
                        });
                      }}
                    />
                  )}
                  keyExtractor={(item, idx) => item.matchingId.toString()}
                />
              </>
            ) : (
              <View
                onLayout={onLayoutNoView}
                style={
                  dstyles(
                    viewWidth,
                    viewHeight,
                    noMatchingViewWidth,
                    noMatchingViewHeight,
                  ).noMatchingView
                }>
                <NoMatchingHistory type="요청한" />
              </View>
            )
          ) : rcvList ? (
            <>
              <View style={styles.textWrap}>
                <Text
                  style={[Typography.subtitle1, {color: color.blueGray_06}]}>
                  진행중인 매칭
                </Text>
              </View>
              <FlatList
                data={rcvList}
                renderItem={({item}) => (
                  <MatchingHistoryItem
                    info={item}
                    onPress={() => {
                      navigation.navigate('MatchingHistoryDetailScreen', {
                        matchingId: item.matchingId,
                      });
                    }}
                  />
                )}
                keyExtractor={item => `img ${item}`}
              />
              {rcvIngList && rcvLastList ? (
                <View style={styles.separator} />
              ) : null}
              <View style={styles.textWrap}>
                <Text
                  style={[Typography.subtitle1, {color: color.blueGray_06}]}>
                  지난 매칭
                </Text>
              </View>
              <FlatList
                data={rcvList}
                renderItem={({item}) => (
                  <MatchingHistoryItem
                    info={item}
                    onPress={() => {
                      navigation.navigate('MatchingHistoryDetailScreen', {
                        matchingId: item.matchingId,
                      });
                    }}
                  />
                )}
                keyExtractor={item => `img ${item}`}
              />
            </>
          ) : (
            <View
              onLayout={onLayoutNoView}
              style={
                dstyles(
                  viewWidth,
                  viewHeight,
                  noMatchingViewWidth,
                  noMatchingViewHeight,
                ).noMatchingView
              }>
              <NoMatchingHistory type="받은" />
            </View>
          )}
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

const dstyles = (
  viewWidth: number,
  viewHeight: number,
  noMatchingViewWidth: number,
  noMatchingViewHeight: number,
) =>
  StyleSheet.create({
    noMatchingView: {
      position: 'absolute',
      top: viewHeight / 2,
      left: viewWidth / 2,
      transform: [
        {translateX: -noMatchingViewWidth * 0.5},
        {translateY: -noMatchingViewHeight},
      ],
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
  textWrap: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  upperListWrap: {
    paddingBottom: 20,
  },
  lowerListWrap: {
    marginTop: 32,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: color.blueGray_00,
    marginTop: 20,
    marginBottom: 32,
  },
});

export default MatchingHistoryListScreen;
