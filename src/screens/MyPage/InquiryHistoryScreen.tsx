import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import InquiryItem from '../../components/MyPage/InquiryItem';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import NoInquiry from '../../assets/illust/illust-no-inquiry.svg';

const InquiryHistoryScreen = () => {
  const [isHistory, setIsHistory] = useState<boolean>(false);
  const navigation = useNavigation<MainTabNavigationProp>();
  return (
    <SafeAreaView style={styles.safe}>
      <MatchingHeader title="문의내역" />
      {isHistory ? (
        <View style={{marginTop: 34}}>
          <InquiryItem
            title="매칭 서비스 오류 문의"
            day="2022.11.07"
            isAnswered={true}
            onPress={() => {
              navigation.navigate('InquiryDetailScreen');
            }}
          />
          <InquiryItem
            title="매칭 서비스 오류 문의 매칭서비스 오류가 있는데 어쩔티비 저쩔티비"
            day="2022.11.07"
            isAnswered={false}
            onPress={() => {
              navigation.navigate('InquiryDetailScreen');
            }}
          />
        </View>
      ) : (
        <View style={styles.noHistory}>
          <View style={styles.illust}>
            <NoInquiry />
          </View>
          <Text style={[Typography.body1, {color: color.blueGray_06}]}>
            문의 내역이 없습니다.
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
    paddingHorizontal: 20,
  },
  noHistory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    marginBottom: 20,
  },
});

export default InquiryHistoryScreen;
