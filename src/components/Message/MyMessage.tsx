import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {color, Typography} from '../../utils/utils.ts';
import Receive from '../../assets/icon/ic-receive.svg';
import Send from '../../assets/icon/ic-send.svg';
import ImageDetail from '../../components/common/ImageDetail';

interface PropTypes {
  isSend: boolean;
  contents: string;
  image?: boolean;
  sentAt: string;
  images: string[];
}

const MyMessage = ({
  contents,
  image = false,
  sentAt,
  isSend,
  images,
}: PropTypes) => {
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);
  return (
    <View style={styles.wrap}>
      <View style={styles.block}>
        {isSend ? (
          <View style={styles.statusWrap}>
            <Send />
            <Text style={styles.send}>보낸 쪽지</Text>
          </View>
        ) : (
          <View style={styles.statusWrap}>
            <Receive />
            <Text style={styles.status}>받은 쪽지</Text>
          </View>
        )}
        <Text style={styles.message}>{contents}</Text>
        {images && images.length > 0 && (
          <View style={{marginTop: 6, height: 76, width: 325.5}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              data={images.slice(0, 4)}
              renderItem={({item}: string) => (
                <Pressable
                  onPress={() => {
                    setIsImageVisible(true);
                  }}>
                  <Image style={styles.img} source={{uri: item}} />
                </Pressable>
              )}
              keyExtractor={item => `img ${item}`}
            />
            {images && images.length > 4 && (
              <View style={styles.overlist}>
                <Text style={[Typography.subtitle3, styles.number]}>
                  +{images.length - 4}
                </Text>
              </View>
            )}
          </View>
        )}

        <Text style={[Typography.body2, styles.time]}>{sentAt}</Text>
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
    color: color.mint_05,
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
  send: {
    color: color.blueGray_06,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
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
    right: 0,
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

export default MyMessage;
