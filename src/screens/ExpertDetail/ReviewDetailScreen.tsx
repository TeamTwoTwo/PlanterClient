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
import Toast from '../../components/common/Toast';

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
  const [toastStatus, setToastStatus] = useState<boolean>(false);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => {
        setToastStatus(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastStatus]);

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

  const reportUser = (reviewId: number) => {
    getData('auth').then(auth => {
      axios
        .post(
          url.dev + 'reports',
          {reviewId},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          console.log(res.data.result);
          if (res.data.isSuccess) {
            setToastStatus(true);
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

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
              reportUser={() => {
                reportUser(item.reviewId);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, idx) => `img ${item} ${idx}`}
          ItemSeparatorComponent={() => <View style={{height: 40}} />}
          ListFooterComponent={() => <View style={{marginBottom: 90}} />}
          listKey="review-all-list"
        />
      </View>
      <ImageDetail
        visible={isReviewImageVisible}
        setVisible={setIsReviewImageVisible}
        images={reviewImgs}
      />
      {toastStatus && (
        <View style={styles.toast}>
          <Toast text="신고가 접수되었습니다." />
        </View>
      )}
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
  toast: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
    paddingHorizontal: 20,
  },
});

export default ReviewDetailScreen;
