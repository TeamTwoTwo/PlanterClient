import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, Typography, url} from '../../utils/utils';
import MatchingHeader from '../../components/matching/MatchingHeader';
import Answer from '../../assets/icon/ic-answer.svg';

const InquiryDetailScreen = () => {
  const [isAnswered, setIsAnswered] = useState<boolean>(true);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 20}}>
        <MatchingHeader title="문의내역" />
      </View>
      <View style={styles.titleWrap}>
        <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
          매칭 서비스 오류 문의
        </Text>
        <Text style={[Typography.body2, {color: color.blueGray_02}]}>
          2022.11.07
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={[Typography.body1, {color: color.blueGray_06}]}>
          매칭 요청시 안내 팝업이 안뜨는데 어디서 확인하나요?
        </Text>
      </View>

      {isAnswered ? (
        <View style={styles.answer}>
          <View style={{marginRight: 4}}>
            <Answer fill="#2CD0BC" />
          </View>
          <View>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              안녕하세요. Planter입니다.
            </Text>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              안녕하세요. Planter입니다.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.answer}>
          <View style={{marginRight: 4}}>
            <Answer fill="#D9D9D9" />
          </View>
          <Text style={[Typography.body1, {color: color.blueGray_06}]}>
            답변 대기 중
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
  },
  question: {
    borderBottomWidth: 1,
    borderColor: color.blueGray_00,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titleWrap: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  answer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
});

export default InquiryDetailScreen;
