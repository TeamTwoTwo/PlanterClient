import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, screen, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import InquiryItem from '../../components/MyPage/InquiryItem';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import NoticeItem from '../../components/MyPage/NoticeItem';

const NoticeScreen = () => {
  const [isHistory, setIsHistory] = useState<boolean>(true);
  const navigation = useNavigation<MainTabNavigationProp>();
  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="공지사항" />
      <View style={{marginTop: 34}}>
        <NoticeItem
          title="앱 1.0.2 업데이트 안내"
          day="2022.11.07"
          onPress={() => {
            navigation.navigate('NoticeDetailScreen');
          }}
        />
        <NoticeItem
          title="매칭 오류 해결방법 안내 매칭 오류 해결방법 매칭 오류해결방법 매칭 오류 해결방법 오류 해결방법 매칭 오류 해결방법"
          day="2022.11.07"
          onPress={() => {
            navigation.navigate('NoticeDetailScreen');
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
    paddingHorizontal: 20,
  },
  noHistory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: 160,
    height: 160,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
});

export default NoticeScreen;
