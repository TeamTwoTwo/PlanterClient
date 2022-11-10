import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {color, Typography} from '../../utils/utils';
import PlantBadge from '../../assets/icon/ic-plant-badge.svg';
import Butler from '../../assets/icon/ic-butler-badge.svg';
import Expert from '../../assets/icon/ic-expert-badge.svg';
import Flower from '../../assets/icon/ic-flower-badge.svg';
import Care from '../../assets/icon/ic-care-badge.svg';

interface PropTypes {
  onPress: () => void;
  name: string;
  contents: string;
  profileImg: string;
  sentAt: string;
  isUnread: boolean;
  category: number;
}

const MessageItem = ({
  onPress,
  name,
  contents,
  profileImg,
  sentAt,
  isUnread,
  category,
}: PropTypes) => {
  return (
    <Pressable style={styles.wrap} onPress={onPress}>
      {isUnread && <View style={styles.alram} />}
      <View>
        <Image style={styles.profileImg} source={{uri: profileImg}} />
      </View>
      <View style={styles.bodyWrap}>
        <View style={styles.nameLine}>
          <Text style={[Typography.subtitle3, styles.name]}>{name}</Text>
          {category === 0 && (
            <>
              <Butler />
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                식물 집사
              </Text>
            </>
          )}
          {category === 1 && (
            <>
              <Flower />
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                꽃집
              </Text>
            </>
          )}
          {category === 2 && (
            <>
              <Expert />
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                식물 전문가
              </Text>
            </>
          )}
          {category === 3 && (
            <>
              <Care />
              <Text style={[Typography.body2, {color: color.blueGray_05}]}>
                식물케어 서비스
              </Text>
            </>
          )}
        </View>
        <View style={styles.messageLine}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              Typography.body1,
              {color: isUnread ? color.blueGray_06 : color.blueGray_04},
            ]}>
            {contents}
          </Text>
        </View>
        <Text style={[Typography.body2, {color: color.blueGray_02}]}>
          {sentAt}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    // borderWidth: 1,
    height: 106,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyWrap: {
    marginLeft: 8.5,
  },
  name: {
    color: color.blueGray_06,
    marginRight: 5,
  },
  messageLine: {
    width: '100%',
    paddingRight: 35,
    marginVertical: 3,
  },
  alram: {
    position: 'absolute',
    right: 0,
    top: 15,
    width: 8,
    height: 8,
    backgroundColor: '#FF5757',
    borderRadius: 40,
  },
});

export default MessageItem;
