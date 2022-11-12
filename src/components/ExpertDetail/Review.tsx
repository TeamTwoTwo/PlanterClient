import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {color, screen, Typography} from '../../utils/utils';
import Star from '../../assets/icon/ic-star.svg';
import {ReviewInfoTypes} from '../../screens/ExpertDetail/ReviewDetailScreen';
import Modal from '../common/Modal';

interface Props {
  onPress: () => void;
  info?: ReviewInfoTypes | undefined;
  screenType: string;
}

const Review = ({onPress, info, screenType}: Props) => {
  const maxContentsLength = 50;
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [contents, setContents] = useState<string | undefined>(
    screenType === 'ExpertDetail' &&
      info?.contents &&
      info?.contents.length > maxContentsLength
      ? info?.contents.slice(0, maxContentsLength + 1) + ' ...'
      : info?.contents,
  );
  const [isMoreClicked, setIsMoreClicked] = useState<boolean>(false);

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  const onPressReport = () => {
    setIsModalShown(true);
  };

  const onSubmit = () => {
    setIsModalShown(false);
    Alert.alert('리뷰 신고가 접수되었습니다.');
  };

  const onPressContentsMore = () => {
    setContents(info?.contents);
    setIsMoreClicked(true);
  };

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
              {info?.date}
            </Text>
            <View style={styles.separator} />
            <Star fill="#FFC42C" />
            <Text
              style={[
                Typography.caption2,
                {color: color.blueGray_02, marginLeft: 2},
              ]}>
              {info?.rate.toFixed(1)}
            </Text>
            <View style={styles.separator} />
            <TouchableOpacity activeOpacity={0.5} onPress={onPressReport}>
              <Text style={[Typography.caption2, {color: color.blueGray_02}]}>
                신고
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[Typography.body2, {color: color.blueGray_05}]}>
          {contents}
          {screenType === 'ExpertDetail' &&
            !isMoreClicked &&
            contents &&
            contents.length > maxContentsLength && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPressContentsMore}>
                <Text style={{color: color.blueGray_01}}>&nbsp;더보기</Text>
              </TouchableOpacity>
            )}
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
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Text
            style={[
              Typography.subtitle2,
              {color: color.blueGray_06, marginTop: 40},
            ]}>
            리뷰신고
          </Text>
          <Text
            style={[
              Typography.body1,
              {color: color.blueGray_05, marginTop: 8},
            ]}>
            리뷰를 신고하시겠습니까?
          </Text>
          <View style={styles.modalBtnWrap}>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={1}
              onPress={() => {
                setIsModalShown(false);
              }}>
              <Text style={[Typography.subtitle3, {color: color.blueGray_05}]}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={1}
              onPress={onSubmit}>
              <Text style={[Typography.subtitle3, {color: color.red_02}]}>
                신고
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = (modalWidth: number, modalHeight: number) =>
  StyleSheet.create({
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      backgroundColor: 'white',
      transform: [
        {translateX: -modalWidth * 0.5},
        {translateY: -modalHeight * 0.5},
      ],
      borderRadius: 8,
      width: screen.width - 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

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
  modalBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    flex: 1,
  },
  separator: {
    borderWidth: 1,
    borderColor: color.blueGray_00,
    height: 9.5,
    marginHorizontal: 6,
  },
});
export default Review;
