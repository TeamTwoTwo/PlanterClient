import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import {color, screen, Typography, url} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import {useNavigation} from '@react-navigation/native';
import BackBlack from '../../assets/icon/ic-back-arrow-black.svg';
import Meatball from '../../assets/icon/ic-meatball.svg';
import Review from '../../components/ExpertDetail/Review';
import ImageDetail from '../../components/common/ImageDetail';
import {getData} from '../../utils/AsyncStorage';
import axios from 'axios';

export interface ReviewInfoTypes {
  reviewId: number;
  profileImg: string;
  name: string;
  date: string;
  rate: number;
  contents: string;
  images: string[];
}

const ReviewDetailScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isReviewImageVisible, setIsReviewImageVisible] =
    useState<boolean>(false);
  const [info, setInfo] = useState<ReviewInfoTypes[]>();
  const [reviewImgs, setReviewImgs] = useState<string[] | undefined>();

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + 'reviews', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          console.log(res);
          if (res.data.isSuccess) {
            setInfo(res.data.result);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, []);

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
          data={info}
          renderItem={({item}) => (
            <Review
              onPress={() => {
                setIsReviewImageVisible(true);
              }}
              info={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, idx) => `img ${item} ${idx}`}
          ItemSeparatorComponent={() => <View style={{height: 40}} />}
          ListFooterComponent={() => <View style={{marginBottom: 90}} />}
        />
      </View>
      <ImageDetail
        visible={isReviewImageVisible}
        setVisible={setIsReviewImageVisible}
        images={[
          'https://baris-bucket.s3.ap-northeast-2.amazonaws.com/images.jpeg',
        ]}
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
