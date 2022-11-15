import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Toggle from '../../components/MyPage/Toggle';

const AlarmScreen = () => {
  const [isMessageEnabled, setIsMessageEnabled] = useState<boolean>(false);
  const [isMatchingEnabled, setIsMatchingEnabled] = useState<boolean>(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState<boolean>(false);
  const onMessagePress = () => {
    setIsMessageEnabled(previousState => !previousState);
  };
  const onMatchingPress = () => {
    setIsMatchingEnabled(previousState => !previousState);
  };
  const onCommentPress = () => {
    setIsCommentEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="알림설정" />
      <View style={{marginTop: 20}}>
        <Toggle
          text="쪽지 알림"
          isEnabled={isMessageEnabled}
          onPress={onMessagePress}
        />
        <Toggle
          text="매칭 알림"
          isEnabled={isMatchingEnabled}
          onPress={onMatchingPress}
        />
        <Toggle
          text="댓글 알림"
          isEnabled={isCommentEnabled}
          onPress={onCommentPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
    paddingHorizontal: 20,
  },
});

export default AlarmScreen;
