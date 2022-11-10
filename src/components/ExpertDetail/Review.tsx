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
import {ReviewInfoTypes} from '../../screens/ExpertDetail/ReviewDetailScreen';

interface Props {
  onPress: () => void;
  info?: ReviewInfoTypes | undefined;
}

const Review = ({onPress, info}: Props) => {
  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.profileImg} source={{uri: info?.profileImg}} />
        <View style={styles.headerTextView}>
          <Text style={[Typography.body2, {color: color.blueGray_05}]}>
            {info?.name}
          </Text>
          <View style={[styles.header]}>
            <Text style={[Typography.caption2, {color: color.blueGray_02}]}>
              {info?.date}&nbsp;|&nbsp;
            </Text>
            <Star fill="#FFC42C" />
            <Text
              style={[
                Typography.caption2,
                {color: color.blueGray_02, marginLeft: 2},
              ]}>
              {info?.rate.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[Typography.body2, {color: color.blueGray_05}]}>
          {info?.contents}
        </Text>
      </View>
      <View style={styles.imgView}>
        <FlatList
          data={info?.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={1} onPress={onPress}>
              <Image source={{uri: item}} style={styles.img} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, idx) => `img ${item} ${idx}`}
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
