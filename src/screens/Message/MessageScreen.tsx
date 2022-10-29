import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils';
import {View, StyleSheet, Text} from 'react-native';

const MessageScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <Text>쪽지함</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
});

export default MessageScreen;
