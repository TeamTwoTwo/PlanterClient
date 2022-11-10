import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils';
import MessageItem from '../../components/Message/MessageItem';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';
import MatchingHeader from '../../components/matching/MatchingHeader';

const MessageScreen = () => {
  const [state, setState] = useState<number>(1);
  const navigation = useNavigation<MainTabNavigationProp>();

  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="쪽지함" />
      {state === 0 ? (
        <View style={styles.contentWrap}>
          <View style={styles.img} />
          <Text stylee={[Typography.body1, {color: color.blueGray_06}]}>
            받은 쪽지가 없습니다.
          </Text>
        </View>
      ) : (
        <View>
          <MessageItem
            onPress={() => {
              navigation.navigate('MessageDetailScreen');
            }}
          />
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
