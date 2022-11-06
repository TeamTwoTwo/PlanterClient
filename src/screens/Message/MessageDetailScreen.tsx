import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, screen, Typography} from '../../utils/utils.ts';
import Plus from '../../assets/icon/ic-plus.svg';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';
import ReceiveMessage from '../../components/Message/ReceiveMessage';
import SendMessage from '../../components/Message/SendMessage';
import MatchingHeader from '../../components/matching/MatchingHeader';
import MyMessage from '../../components/Message/MyMessage';
import Modal from '../../components/common/Modal';

const MessageDetailScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  const onModal = (): void => {
    setIsModalShown(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 24}}>
        <MatchingHeader title="김보경" meatball onModal={onModal} />
      </View>
      <MyMessage
        receive
        message="몬스테라는 크기가 있다보니 제가 직접 그 장소로 가겠습니다! 괜찮으세요?"
      />
      <MyMessage send message="감사합니다! 수요일에 사진 보내드릴게요" image />
      <View style={styles.wrap}>
        <Pressable
          style={[styles.writeBtn, styles.shadow]}
          onPress={() => {
            navigation.navigate('WriteScreen');
          }}>
          <Plus />
        </Pressable>
      </View>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay cancle>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <View style={styles.firstSelecBox}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_04}]}>
              스팸 신고하기
            </Text>
          </View>
          <View style={styles.secondSelecBox}>
            <Text style={[Typography.subtitle3, {color: color.red_02}]}>
              쪽지 삭제하기
            </Text>
          </View>
          <Pressable
            style={styles.cancleBox}
            onPress={() => {
              setIsModalShown(false);
            }}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_06}]}>
              취소
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
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
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
    // paddingHorizontal: 24,
  },
  writeBtn: {
    width: 56,
    height: 56,
    backgroundColor: color.mint_05,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
        elevation: 3,
      },
    }),
  },
  wrap: {
    position: 'absolute',
    right: 24,
    bottom: 60,
  },
  firstSelecBox: {
    paddingTop: 22,
    // borderWidth: 1,
  },
  secondSelecBox: {
    paddingTop: 28,
    // borderWidth: 1,
  },
  cancleBox: {
    // borderWidth: 1,
    marginTop: 32,
    paddingBottom: 22,
  },
});

export default MessageDetailScreen;
