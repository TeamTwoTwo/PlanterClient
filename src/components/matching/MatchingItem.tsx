import React from 'react';
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native';
import {color, Typography} from '../../utils/utils';
import Plant from '../../assets/icon/ic-plant-badge.svg';
import Star from '../../assets/icon/ic-star.svg';

interface PropTypes {
  name: string;
  job: string;
  distance: string;
  info: string;
  grade: string;
  bodyText: string;
  money: string;
  day: string;
  onPress: () => void;
}

const MatchingItem = ({
  name,
  job,
  distance,
  info,
  grade,
  bodyText,
  money,
  day,
  onPress,
}: PropTypes) => {
  return (
    <Pressable style={[styles.box, styles.shadow]} onPress={onPress}>
      <View>
        <View style={styles.profile} />
      </View>
      <View style={styles.content}>
        <View style={styles.line}>
          <Text style={[Typography.subtitle3, styles.name]}>{name}</Text>
          <Plant />
          <Text style={styles.job}>{job}</Text>
        </View>
        <View style={styles.line}>
          <Text style={[Typography.caption1, styles.info]}>
            {distance} · {info} ·
          </Text>
          <Star />
          <Text style={[Typography.caption1, styles.info]}>{grade}</Text>
        </View>
        <View style={styles.bodyLine}>
          <Text style={[Typography.body2, styles.bodyText]}>{bodyText}</Text>
        </View>
        <View style={styles.moneyLine}>
          <Text style={[Typography.subtitle4, {color: color.blueGray_06}]}>
            {money}~
          </Text>
          <Text style={[Typography.body2, styles.day]}>/{day}</Text>
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
    backgroundColor: '#f2f2f2',
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
    color: color.gray_04,
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
