import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Answer from '../../assets/icon/ic-answer.svg';

const NoticeDetailScreen = () => {
  const [isAnswered, setIsAnswered] = useState<boolean>(true);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 20}}>
        <MatchingHeader title="공지사항" />
      </View>
      <View style={styles.titleWrap}>
        <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
          앱 1.0.2 업데이트 안내
        </Text>
        <Text style={[Typography.body2, {color: color.blueGray_02}]}>
          2022.11.07
        </Text>
      </View>
      <View style={styles.contents}>
        <Text style={[Typography.body1, {color: color.blueGray_06}]}>
          안녕하세요, Planter 이용자 여러분
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
  },
  contents: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleWrap: {
    borderBottomWidth: 1,
    borderColor: color.blueGray_00,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  answer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
});

export default NoticeDetailScreen;
