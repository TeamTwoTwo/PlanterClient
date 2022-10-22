import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Star from '../../assets/icon/ic-star.svg';

let mock = [1, 2, 3, 4, 5, 6, 7];

interface Props {
  onPress: () => void;
}

const Review = ({onPress}: Props) => {
  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.profileImg}
          source={require('../../assets/img/img-expert-profile.png')}
        />
        <View style={styles.headerTextView}>
          <Text style={[Typography.body2, {color: color.blueGray_05}]}>
            유지민
          </Text>
          <View style={[styles.header]}>
            <Text style={[Typography.caption2, {color: color.blueGray_02}]}>
              2022. 10. 12{'  '}|{'  '}
            </Text>
            <Star />
            <Text
              style={[
                Typography.caption2,
                {color: color.blueGray_02, marginLeft: 2},
              ]}>
              4.8
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[Typography.body2, {color: color.blueGray_05}]}>
          식물을 사랑한 지 12년차 된 식물집사입니다. 내 식물이라고 생각하고
          식물을 사랑한 지 12년차 된 식물집사입니다. 내 식물이라고 생각하고 내
          식물이라고 생각합니다.
        </Text>
      </View>
      <View style={styles.imgView}>
        <FlatList
          data={mock}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={1} onPress={onPress}>
              <Image
                source={require('../../assets/img/img-expert-img.png')}
                style={styles.img}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => `img ${item}`}
          ItemSeparatorComponent={() => <View style={{width: 8}} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextView: {
    marginLeft: 6,
  },
  profileImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  content: {
    marginTop: 8,
  },
  imgView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});
export default Review;
