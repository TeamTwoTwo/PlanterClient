import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Star from '../../assets/icon/ic-star.svg';
import CustomButton from '../../components/common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';

const starList: number[] = [1, 2, 3, 4, 5];

const ReviewStarScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [rating, setRating] = useState<number>(0);

  const onPressStar = (num: number) => {
    setRating(num);
  };

  const onPressNext = () => {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
          리뷰 쓰기
        </Text>
        <TouchableOpacity
          style={styles.laterBtn}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('MatchingHistory');
          }}>
          <Text style={[Typography.body1, {color: color.blueGray_01}]}>
            다음에 하기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Image
          source={require('../../assets/img/img-expert-profile.png')}
          style={styles.profileImg}
        />
        <View style={styles.textWrap}>
          <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
            김보경님의 케어는 어떠셨나요?
          </Text>
        </View>
        <View style={styles.starWrap}>
          {starList.map((data, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.star}
              activeOpacity={1}
              onPress={() => {
                onPressStar(data);
              }}>
              <Star
                width={48}
                height={48}
                fill={rating >= data ? '#FFC42C' : color.gray_02}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.btnWrap}>
        <CustomButton
          text="다음"
          backgroundColor={color.mint_05}
          onPress={onPressNext}
          width="100%"
          borderRadius={6}
          disabled={rating > 0 ? false : true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  laterBtn: {
    position: 'absolute',
    right: 20,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textWrap: {
    marginTop: 12,
  },
  starWrap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
  btnWrap: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
export default ReviewStarScreen;
