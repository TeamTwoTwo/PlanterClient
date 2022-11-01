import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils.ts';
import DetailHeader from '../../components/Message/DetailHeader';
import Plus from '../../assets/icon/ic-plus.svg';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';

const MessageDetailScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();

  return (
    <SafeAreaView style={styles.safe}>
      <DetailHeader title="김보경" />
      <View style={styles.wrap}>
        <Pressable
          style={[styles.writeBtn, styles.shadow]}
          onPress={() => {
            navigation.navigate('WriteScreen');
          }}>
          <Plus />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
    paddingHorizontal: 24,
  },
  writeBtn: {
    width: 56,
    height: 56,
    backgroundColor: color.mint_05,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  wrap: {
    position: 'absolute',
    right: 24,
    bottom: 60,
  },
});

export default MessageDetailScreen;
