import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MessageItem from '../../components/Message/MessageItem';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';
import MatchingHeader from '../../components/matching/MatchingHeader';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

interface messageData {
  plantManagereId: number;
  profileImg: string;
  name: string;
  category: number;
  contents: string;
  sentAt: string;
  isUnread: boolean;
}

const MessageScreen = () => {
  const [messageList, setMessageList] = useState<messageData[]>();
  const navigation = useNavigation<MainTabNavigationProp>();

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'messages', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          console.log(res.data);
          setMessageList(res.data.result);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="쪽지함" />
      {messageList ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messageList}
          renderItem={({item}: {item: messageData}) => (
            <MessageItem
              onPress={() => {
                navigation.navigate('MessageDetailScreen');
              }}
              name={item.name}
              contents={item.contents}
              profileImg={item.profileImg}
              sentAt={item.sentAt}
              isUnread={item.isUnread}
              category={item.category}
            />
          )}
          keyExtractor={(item: messageData) => item.plantManagereId}
        />
      ) : (
        <View style={styles.contentWrap}>
          <View style={styles.img} />
          <Text stylee={[Typography.body1, {color: color.blueGray_06}]}>
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
