import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {color, screen, Typography, url} from '../../utils/utils';
import Message from '../../assets/icon/ic-message.svg';
import MatchingHistoryItem from '../../components/matchingHistory/MatchingHistoryItem';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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

const tmp: any = [1];

const MatchingHistoryListScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isSelectedReq, setIsSelectedReq] = useState<boolean>(true);
  const [isSelectedRcv, setIsSelectedRcv] = useState<boolean>(false);
  const [reqList, setReqList] = useState<ReqType[]>([]);
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

  const getRcvList = () => {
    setRefreshing(true);
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'matchings?type=1', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          if (res.data.isSuccess) {
            console.log(res);
            setRcvList(res.data.result);
            setRefreshing(false);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  useFocusEffect(
    useCallback(() => {
      getReqList();
      getRcvList();
    }, []),
  );

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

  useEffect(() => {
    console.log(rcvList);
    let last: ReqType[] = [];
    let ing: ReqType[] = [];
    rcvList?.forEach(data => {
      if (data.status === 'complete' || data.status === 'cancel') {
        last.push(data);
      } else {
        ing.push(data);
      }
    });
    setRcvLastList(last);
    setRcvIngList(ing);
  }, [rcvList]);

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

  const onPressMessage = () => {
    navigation.navigate('MessageScreen', {type: 'MatchingHistory'});
  };

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
              ?????????
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
              ??????
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.msgBtn}
          activeOpacity={0.5}
          onPress={onPressMessage}>
          <Message stroke={'black'} />
        </TouchableOpacity>
      </View>
      {(isSelectedReq && (reqList?.length === 0 || !reqList)) ||
      (isSelectedRcv && (rcvList?.length === 0 || !rcvList)) ? (
        <View
          onLayout={onLayout}
          style={{
            height: '100%',
          }}>
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
            <NoMatchingHistory type={isSelectedReq ? '?????????' : '??????'} />
          </View>
        </View>
      ) : (
        <View style={styles.mainWrap}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={isSelectedReq ? getReqList : getRcvList}
              />
            }
            data={tmp}
            renderItem={() => (
              <View style={styles.main} onLayout={onLayout}>
                {/* '?????????' ??? */}
                {isSelectedReq ? (
                  // ????????? ????????? ????????????
                  reqList ? (
                    <>
                      {/* ????????? ?????? ??? ???????????? ????????? ????????? ?????? */}
                      {reqIngList?.length !== 0 ? (
                        <View>
                          <View style={styles.textWrap}>
                            <Text
                              style={[
                                Typography.subtitle1,
                                {color: color.blueGray_06},
                              ]}>
                              ???????????? ??????
                            </Text>
                          </View>
                          <FlatList
                            data={reqIngList}
                            renderItem={({item}) => (
                              <MatchingHistoryItem
                                info={item}
                                onPress={() => {
                                  navigation.navigate(
                                    'MatchingHistoryDetailScreen',
                                    {
                                      matchingId: item.matchingId,
                                    },
                                  );
                                }}
                              />
                            )}
                            keyExtractor={(item, idx) =>
                              `reqIngList ${item.matchingId.toString()}`
                            }
                            listKey="reqIngList"
                            ListFooterComponent={() => (
                              <View style={{height: reqLastList ? 32 : 70}} />
                            )}
                          />
                        </View>
                      ) : //  ????????? ?????? ??? ???????????? ????????? ?????? ??????
                      null}
                      {reqIngList?.length !== 0 && reqLastList?.length !== 0 ? (
                        <View style={styles.separator} />
                      ) : null}
                      {/* ????????? ?????? ??? ?????? ????????? ????????? ?????? */}
                      {reqLastList?.length !== 0 ? (
                        <View>
                          <View style={styles.textWrap}>
                            <Text
                              style={[
                                Typography.subtitle1,
                                {color: color.blueGray_06},
                              ]}>
                              ?????? ??????
                            </Text>
                          </View>
                          <FlatList
                            data={reqLastList}
                            renderItem={({item}) => (
                              <MatchingHistoryItem
                                info={item}
                                onPress={() => {
                                  navigation.navigate(
                                    'MatchingHistoryDetailScreen',
                                    {
                                      matchingId: item.matchingId,
                                    },
                                  );
                                }}
                              />
                            )}
                            keyExtractor={(item, idx) =>
                              `reqLastList ${item.matchingId.toString()}`
                            }
                            listKey="reqLastList"
                            ListFooterComponent={() => (
                              <View style={{height: 70}} />
                            )}
                          />
                        </View>
                      ) : //????????? ?????? ??? ?????? ????????? ?????? ??????
                      null}
                    </>
                  ) : // ????????? ?????? ????????? noMatchingView
                  null
                ) : // '??????' ???
                // ?????? ????????? ????????????
                rcvList ? (
                  <>
                    {/* ?????? ?????? ??? ???????????? ????????? ????????? ?????? */}
                    {rcvIngList?.length !== 0 ? (
                      <View>
                        <View style={styles.textWrap}>
                          <Text
                            style={[
                              Typography.subtitle1,
                              {color: color.blueGray_06},
                            ]}>
                            ???????????? ??????
                          </Text>
                        </View>
                        <FlatList
                          data={rcvIngList}
                          renderItem={({item}) => (
                            <MatchingHistoryItem
                              type={1}
                              info={item}
                              onPress={() => {
                                navigation.navigate(
                                  'MatchingHistoryDetailScreen',
                                  {
                                    matchingId: item.matchingId,
                                    type: 1,
                                  },
                                );
                              }}
                            />
                          )}
                          keyExtractor={(item, idx) =>
                            `rcvIngList ${item.matchingId.toString()}`
                          }
                          listKey="rcvIngList"
                          ListFooterComponent={() => (
                            <View style={{height: rcvLastList ? 32 : 70}} />
                          )}
                        />
                      </View>
                    ) : // ?????? ?????? ??? ???????????? ????????? ?????? ??????
                    null}

                    {rcvIngList?.length !== 0 && rcvLastList?.length !== 0 ? (
                      <View style={styles.separator} />
                    ) : null}

                    {/* ?????? ?????? ??? ?????? ????????? ????????? ?????? */}
                    {rcvLastList?.length !== 0 ? (
                      <View>
                        <View style={styles.textWrap}>
                          <Text
                            style={[
                              Typography.subtitle1,
                              {color: color.blueGray_06},
                            ]}>
                            ?????? ??????
                          </Text>
                        </View>
                        <FlatList
                          data={rcvLastList}
                          renderItem={({item}) => (
                            <MatchingHistoryItem
                              type={1}
                              info={item}
                              onPress={() => {
                                navigation.navigate(
                                  'MatchingHistoryDetailScreen',
                                  {
                                    matchingId: item.matchingId,
                                    type: 1,
                                  },
                                );
                              }}
                            />
                          )}
                          keyExtractor={(item, idx) =>
                            `rcvLastList ${item.matchingId.toString()}`
                          }
                          listKey="rcvLastList"
                          ListFooterComponent={() => (
                            <View style={{height: 70}} />
                          )}
                        />
                      </View>
                    ) : // ?????? ?????? ??? ?????? ????????? ?????? ??????
                    null}
                  </>
                ) : // ?????? ?????? ????????? noMatchingView
                null}
              </View>
            )}
            keyExtractor={(item, idx) => `list ${idx}`}
          />
        </View>
      )}
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
        {
          translateY: -noMatchingViewHeight * 0.5,
        },
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
    height: 48,
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
  mainWrap: {
    marginTop: 24,
    height: '100%',
  },
  main: {
    minHeight: '100%',
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
    marginBottom: 32,
  },
});

export default MatchingHistoryListScreen;
