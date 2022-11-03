import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {color, Typography} from '../../utils/utils.ts';
import Send from '../../assets/icon/ic-send.svg';
import ImageDetail from '../../components/common/ImageDetail';

let data = [1, 2, 3, 4, 5];

const SendMessage = () => {
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);
  return (
    <View style={styles.wrap}>
      <View style={styles.block}>
        <View style={styles.statusWrap}>
          <Send />
          <Text style={styles.status}>보낸 쪽지</Text>
        </View>
        <Text style={styles.message}>
          감사합니다! 수요일에 사진 보내드릴게요
        </Text>
        {data && data.length > 0 && (
          <View style={{marginTop: 6, height: 76}}>
            <FlatList
              horizontal
              showsScrollIndicator={false}
              data={data.slice(0, 4)}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setIsImageVisible(true);
                  }}>
                  <View style={styles.img} />
                </Pressable>
              )}
              keyExtractor={item => item.toString()}
            />
          </View>
        )}
        {data && data.length > 4 && (
          <View style={styles.overlist}>
            <Text style={[Typography.subtitle3, styles.number]}>
              +{data.length - 4}
            </Text>
          </View>
        )}
        <Text style={[Typography.body2, styles.time]}>오후 08:40</Text>
      </View>
      <ImageDetail visible={isImageVisible} setVisible={setIsImageVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    // borderWidth: 1,
    // borderColor: color.blueGray_00,
    paddingVertical: 20,
  },
  status: {
    color: color.blueGray_06,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  block: {
    paddingHorizontal: 24,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: color.blueGray_06,
    fontWeight: '400',
  },
  time: {
    marginTop: 4,
    color: color.blueGray_02,
  },
  img: {
    width: 76,
    height: 76,
    borderRadius: 4,
    marginRight: 7,
    borderWidth: 1,
  },
  overlist: {
    position: 'absolute',
    right: 62,
    top: 60,
    width: 76,
    height: 76,
    borderRadius: 4,
    backgroundColor: 'black',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: color.gray_00,
    // opacity: 1,
  },
});

export default SendMessage;
