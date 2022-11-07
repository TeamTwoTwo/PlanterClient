import React from 'react';
import {View, Text, StyleSheet, Platform, Pressable, Image} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Butler from '../../assets/icon/ic-butler-badge.svg';
import Star from '../../assets/icon/ic-star.svg';
import Expert from '../../assets/icon/ic-expert-badge.svg';
import Flower from '../../assets/icon/ic-flower-badge.svg';
import Care from '../../assets/icon/ic-care-badge.svg';

interface PropTypes {
  id: number;
  name: string;
  category: number;
  profileImg: string;
  distance: number;
  isPhoto: boolean;
  rate: number;
  description: string;
  minPrice: number;
  onPress: () => void;
}

let maxlimit = 10;

const MatchingItem = ({
  id,
  name,
  category,
  profileImg,
  distance,
  isPhoto,
  rate,
  description,
  minPrice,
  onPress,
}: PropTypes) => {
  return (
    <Pressable style={[styles.box, styles.shadow]} onPress={onPress}>
      <View>
        <Image style={styles.profile} source={{uri: profileImg}} />
      </View>
      <View style={styles.content}>
        <View style={styles.line}>
          <Text style={[Typography.subtitle3, styles.name]}>
            {name.length > maxlimit
              ? name.slice(0, maxlimit + 1) + ' ...'
              : name}
          </Text>
          {category === 0 && (
            <View style={styles.line}>
              <Butler />
              <Text style={styles.job}>식물 집사</Text>
            </View>
          )}
          {category === 1 && (
            <View style={styles.line}>
              <Flower />
              <Text style={styles.job}>꽃집</Text>
            </View>
          )}
          {category === 2 && (
            <View style={styles.line}>
              <Expert />
              <Text style={styles.job}>식물 전문가</Text>
            </View>
          )}
          {category === 3 && (
            <View style={styles.line}>
              <Care />
              <Text style={styles.job}>식물케어 서비스</Text>
            </View>
          )}
        </View>
        <View style={styles.line}>
          {isPhoto ? (
            <Text style={[Typography.caption1, styles.info]}>{distance}km</Text>
          ) : (
            <Text style={[Typography.caption1, styles.info]}>
              {distance}km ·{' '}
            </Text>
          )}
          {isPhoto && (
            <Text style={[Typography.caption1, styles.info]}>
              {' '}
              · 사진 제공 ·{' '}
            </Text>
          )}
          <Star />
          <Text style={[Typography.caption1, styles.info]}> {rate}</Text>
        </View>
        <View style={styles.bodyLine}>
          <Text style={[Typography.body2, styles.bodyText]}>{description}</Text>
        </View>
        <View style={styles.moneyLine}>
          <Text style={[Typography.subtitle4, {color: color.blueGray_06}]}>
            {minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원~
          </Text>
          <Text style={[Typography.body2, styles.day]}>/ 1일</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: color.blueGray_00,
    hegiht: 166,
    borderRadius: 8,
    marginTop: 20,
    padding: 20,
    backgroundColor: color.gray_00,
    flexDirection: 'row',
    marginLeft: 22,
    marginRight: 18,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  content: {
    // borderWidth: 1,
    marginLeft: 9,
    width: '69%',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: color.blueGray_06,
    marginRight: 5,
  },
  job: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: color.blueGray_05,
  },
  info: {
    color: color.blueGray_01,
  },
  bodyLine: {
    marginTop: 8,
  },
  bodyText: {
    color: color.blueGray_06,
  },
  moneyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  day: {
    color: color.blueGray_03,
    marginLeft: 4,
  },
});

export default MatchingItem;
