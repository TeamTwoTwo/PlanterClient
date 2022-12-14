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
import NoMessage from '../../assets/illust/illust-message.svg';

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
      <MatchingHeader title="쪽지함" />
      {messageList && messageList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messageList}
          renderItem={({item}: {item: messageData}) => (
            <MessageItem
              onPress={() => {
                if (type === 'Matching') {
                  navigation.navigate('MessageDetailScreen', {
                    plantManagerId: item.plantManagerId,
                    name: item.name,
                    type: 'Matching',
                  });
                } else if (type === 'ExpertDetail') {
                  navigation.navigate('MessageDetailScreen', {
                    plantManagerId: item.plantManagerId,
                    name: item.name,
                    type: 'ExpertDetail',
                  });
                } else if (type === 'MatchingHistory') {
                  navigation.navigate('MessageDetailScreen', {
                    plantManagerId: item.plantManagerId,
                    name: item.name,
                    type: 'MatchingHistory',
                  });
                } else if (type === 'MatchingHistoryDetail') {
                  navigation.navigate('MessageDetailScreen', {
                    plantManagerId: item.plantManagerId,
                    name: item.name,
                    type: 'MatchingHistoryDetail',
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
          listKey="message-list"
        />
      ) : (
        <View style={styles.contentWrap}>
          <NoMessage />
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_06, marginTop: 20},
            ]}>
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
});

export default MessageScreen;
