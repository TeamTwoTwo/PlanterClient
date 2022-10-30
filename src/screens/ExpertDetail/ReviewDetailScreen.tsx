import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import {color, screen, Typography} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import {useNavigation} from '@react-navigation/native';
import BackBlack from '../../assets/icon/ic-back-arrow-black.svg';
import Meatball from '../../assets/icon/ic-meatball.svg';
import Review from '../../components/ExpertDetail/Review';
import ImageDetail from '../../components/common/ImageDetail';

let mock: number[] = [];
for (let i = 0; i < 10; i++) {
  mock.push(i);
}

const ReviewDetailScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isReviewImageVisible, setIsReviewImageVisible] =
    useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.pop();
          }}>
          <BackBlack />
        </TouchableOpacity>
        <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
          리뷰 전체보기
        </Text>
        <TouchableOpacity style={styles.meatballBtn} activeOpacity={1}>
          <Meatball fill={color.gray_08} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <FlatList
          data={mock}
          renderItem={({item}) => (
            <Review
              onPress={() => {
                setIsReviewImageVisible(true);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `img ${item}`}
          ItemSeparatorComponent={() => <View style={{height: 40}} />}
          ListFooterComponent={() => <View style={{marginBottom: 90}} />}
        />
      </View>
      <ImageDetail
        visible={isReviewImageVisible}
        setVisible={setIsReviewImageVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: screen.width,
    height: 48,
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    marginLeft: 6,
    padding: 14,
  },
  meatballBtn: {
    marginRight: 6,
    padding: 14,
  },
  main: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
});

export default ReviewDetailScreen;
