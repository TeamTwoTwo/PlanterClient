import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, FlatList} from 'react-native';
import {url} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';
import {useNavigation} from '@react-navigation/native';
import Review from '../../components/ExpertDetail/Review';
import ImageDetail from '../../components/common/ImageDetail';
import {getData} from '../../utils/AsyncStorage';
import axios from 'axios';
import MatchingHeader from '../../components/matching/MatchingHeader';

export interface ReviewInfoTypes {
  reviewId: number;
  profileImg: string;
  name: string;
  date: string;
  rate: number;
  contents: string;
  images: string[];
}

const ReviewDetailScreen = ({route}: any) => {
  const {plantManagerId} = route?.params;
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isReviewImageVisible, setIsReviewImageVisible] =
    useState<boolean>(false);
  const [info, setInfo] = useState<ReviewInfoTypes[]>();
  const [reviewImgs, setReviewImgs] = useState<string[] | undefined>();

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + `plant-managers/${plantManagerId}/reviews`, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(reviewImgs);
    if (reviewImgs !== undefined) {
      setIsReviewImageVisible(true);
    }
  }, [reviewImgs]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <MatchingHeader title="리뷰 전체보기" />
      </View>
      <View style={styles.main}>
        <FlatList
          data={info}
          renderItem={({item}) => (
            <Review
              onPress={() => {
                setReviewImgs(item.images);
              }}
              info={item}
              screenType="ReviewDetail"
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
        images={reviewImgs}
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
    paddingHorizontal: 20,
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
