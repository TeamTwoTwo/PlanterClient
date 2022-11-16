import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, screen, Typography, url} from '../../utils/utils';
import Plus from '../../assets/icon/ic-plus.svg';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';
import MatchingHeader from '../../components/matching/MatchingHeader';
import MyMessage from '../../components/Message/MyMessage';
import Modal from '../../components/common/Modal';
import axios from 'axios';
import {getData} from '../../utils/AsyncStorage';

interface messageData {
  messageId: number;
  isSend: boolean;
  contents: string;
  images: string[];
  sentAt: string;
}

interface ButtonRefProps {
  isLoading: boolean;
}

const MessageDetailScreen = ({route}: any) => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [messageDetail, setMessageDetail] = useState<messageData[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {plantManagerId, name} = route?.params;
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });

  const onLayout = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    const {width, height} = e.nativeEvent.layout;
    setModalWidth(width);
    setModalHeight(height);
  };

  const onPressMeatball = (): void => {
    setIsModalShown(true);
  };

  const onDeleteMessage = (): void => {
    if (buttonRef.current.isLoading) {
      return;
    }

    buttonRef.current.isLoading = true;

    getData('auth').then(auth => {
      axios
        .patch(
          url.dev + `plant-managers/${plantManagerId}/messages/status`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          console.log(res.data);
          setIsModalShown(false);
          if (res.data.isSuccess) {
            navigation.navigate('MessageScreen');
          }
        })
        .finally(() => {
          buttonRef.current.isLoading = false;
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  const onReport = (): void => {
    getData('auth').then(auth => {
      axios
        .post(
          url.dev + 'reports',
          {plantManagerId: plantManagerId},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          console.log(res.data.result);
          setIsModalShown(false);
          if (res.data.isSuccess) {
            Alert.alert('스팸 신고를 완료했습니다.');
            navigation.navigate('MessageScreen');
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  const onGetMessageDetailList = () => {
    setRefreshing(true);
    getData('auth').then(auth => {
      axios
        .get(url.dev + `plant-managers/${plantManagerId}/messages`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          // console.log(res.data.result);
          setMessageDetail(res.data.result);
          setRefreshing(false);
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  useEffect(() => {
    getData('auth').then(auth => {
      axios
        .get(url.dev + `plant-managers/${plantManagerId}/messages`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(res => {
          // console.log(res.data.result);
          setMessageDetail(res.data.result);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }, [plantManagerId]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{paddingHorizontal: 24}}>
        <MatchingHeader
          title={name}
          meatball
          onPressMeatball={onPressMeatball}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messageDetail}
        renderItem={({item}: {item: messageData}) => (
          <MyMessage
            contents={item.contents}
            sentAt={item.sentAt}
            isSend={item.isSend}
            images={item.images}
          />
        )}
        keyExtractor={(item: messageData) => item.messageId.toString()}
        ItemSeparatorComponent={() => <View style={styles.line} />}
        ListFooterComponent={<View style={{marginTop: 90}} />}
        refreshing={refreshing}
        onRefresh={onGetMessageDetailList}
        listKey="message-detail-list"
      />
      <View style={styles.wrap}>
        <Pressable
          style={[styles.writeBtn, styles.shadow]}
          onPress={() => {
            navigation.navigate('WriteScreen', {
              plantManagerId: plantManagerId,
            });
          }}>
          <Plus />
        </Pressable>
      </View>
      <Modal visible={isModalShown} setVisible={setIsModalShown} overlay cancel>
        <View
          style={modalStyles(modalWidth, modalHeight).modal}
          onLayout={onLayout}>
          <Pressable style={styles.firstSelecBox} onPress={onReport}>
            <Text style={[Typography.subtitle3, {color: color.blueGray_04}]}>
              스팸 신고하기
            </Text>
          </Pressable>
          <Pressable style={styles.secondSelecBox} onPress={onDeleteMessage}>
            <Text style={[Typography.subtitle3, {color: color.red_02}]}>
              쪽지 삭제하기
            </Text>
          </Pressable>
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
  line: {
    borderTopWidth: 1,
    borderColor: color.blueGray_00,
  },
});

export default MessageDetailScreen;
