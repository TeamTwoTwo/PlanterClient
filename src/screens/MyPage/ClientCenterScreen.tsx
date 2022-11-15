import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import ListItem from '../../components/MyPage/ListItem';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';

const ClientCenterScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 20}}>
        <MatchingHeader title="고객센터" />
      </View>
      <View style={{marginTop: 20}}>
        <ListItem
          title="1:1 문의하기"
          onPress={() => {
            navigation.navigate('InquiryWriteScreen');
          }}
        />
        <ListItem
          title="문의내역"
          onPress={() => {
            navigation.navigate('InquiryHistoryScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
});

export default ClientCenterScreen;
