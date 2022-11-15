import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MessageItem from '../../components/Message/MessageItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';
import MatchingHeader from '../../components/matching/MatchingHeader';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';
import {useRecoilState} from 'recoil';
import {MatchingIdState} from '../../recoil/atoms/matchingID';

interface messageData {
  plantManagerId: number;
  profileImg: string;
  name: string;
  category: number;
  contents: string;
  sentAt: string;
  isUnread: boolean;
}

const MessageScreen = ({route}: any) => {
  const [messageList, setMessageList] = useState<messageData[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [matchingID, setMatchingID] = useRecoilState(MatchingIdState);
  const navigation = useNavigation<MainTabNavigationProp>();
  const {type} = route?.params;

  const onGetMessageList = (): void => {
    setRefreshing(true);
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'messages', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          // console.log(res.data);
          setMessageList(res.data.result);
          setRefreshing(false);
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  const onPopToTop = (): void => {
    if (type === '매칭' || type === '매칭내역') {
      console.log('뒤로가자');
      navigation.pop();
    } else if (type === '전문가상세') {
      if (messageList) {
        navigation.popToTop();
        navigation.navigate('ExpertDetailScreen', {
          plantManagerId: messageList[0].plantManagerId,
        });
      }
    } else if (type === '매칭내역상세') {
      navigation.navigate('MatchingHistoryDetailScreen', {
        matchingId: matchingID,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      onGetMessageList(); // 화면이 포커스 됐을 때
      return () => {
        console.log('나가욥'); // 화면 포커스 아웃 됐을 때
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="쪽지함" onPopToTop={onPopToTop} />
      {messageList && messageList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messageList}
          renderItem={({item}: {item: messageData}) => (
            <MessageItem
              onPress={() => {
                if (type === '매칭') {
                  navigation.navigate('MessageDetailScreen', {
                    plantManagerId: item.plantManagerId,
                    name: item.name,
                    type: '매칭',
                  });
                } else if (type === '매칭내역') {
                  navigation.navigate('MessageDetailScreen', {
                    plantManagerId: item.plantManagerId,
                    name: item.name,
                    type: '매칭내역',
                  });
                }
              }}
              name={item.name}
              contents={item.contents}
              profileImg={item.profileImg}
              sentAt={item.sentAt}
              isUnread={item.isUnread}
              category={item.category}
            />
          )}
          keyExtractor={(item: messageData) => item.plantManagerId.toString()}
          refreshing={refreshing}
          onRefresh={onGetMessageList}
        />
      ) : (
        <View style={styles.contentWrap}>
          {/* <View style={styles.img} /> */}
          <Text style={[Typography.body1, {color: color.blueGray_06}]}>
            받은 쪽지가 없습니다.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
    paddingHorizontal: 24,
  },
  contentWrap: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  img: {
    width: 160,
    height: 160,
    marginBottom: 20,
    backgroundColor: '#d9d9d9',
  },
});

export default MessageScreen;
