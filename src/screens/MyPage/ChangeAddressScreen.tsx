import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import CustomInput from '../../components/common/CustomInput';
import {getData} from '../../utils/AsyncStorage';
import {color, url} from '../../utils/utils';
import {MainTabNavigationProp} from '../MainTab';

interface ButtonRefProps {
  isLoading: boolean;
}

const ChangeAddressScreen = ({route}: any) => {
  const buttonRef = useRef<ButtonRefProps>({
    isLoading: false,
  });
  const addr = route.params?.address;
  const detailAddr = route.params?.detailAddress;
  const simpleAddress = route.params?.simpleAddress;

  const navigation = useNavigation<MainTabNavigationProp>();
  const [address, setAddress] = useState<string>(addr);
  const [detailAddress, setDetailAddress] = useState<string>(detailAddr);

  console.log(addr);
  useEffect(() => {
    console.log(detailAddress);
  }, [detailAddress]);
  console.log(simpleAddress);

  useEffect(() => {
    setAddress(addr);
  }, [addr]);

  const onGoBack = () => {
    navigation.pop();
  };

  const onPressComplete = () => {
    if (buttonRef.current.isLoading) {
      return;
    }

    buttonRef.current.isLoading = true;

    getData('auth').then(auth => {
      axios
        .patch(
          url.dev + `users/${auth.userId}/location`,
          {
            address,
            detailAddress,
            simpleAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(res => {
          console.log(res);
          if (res.data.isSuccess) {
            navigation.popToTop();
            navigation.navigate('ProfileScreen');
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

  const onPressAddress = () => {
    navigation.navigate('FindAddress', {type: 'mypage'});
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
            <Back />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>주소지 변경</Text>
          </View>
          <Pressable onPress={onPressComplete}>
            <Text style={styles.send}>완료</Text>
          </Pressable>
        </View>
        <View style={styles.main}>
          <TouchableOpacity
            style={styles.addressView}
            activeOpacity={1}
            onPress={onPressAddress}>
            <View style={styles.address}>
              <CustomInput
                label="주소"
                placeholder="주소"
                onChangeText={setAddress}
                value={address}
                disabled
                multiline
                pointerEventsNone
              />
            </View>
            <TouchableOpacity
              style={styles.addressBtn}
              activeOpacity={0.5}
              onPress={onPressAddress}>
              <Text style={styles.addressBtnText}>주소 검색</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.inputWrap}>
            <CustomInput
              label="상세 주소"
              placeholder="상세 주소"
              onChangeText={setDetailAddress}
              value={detailAddress}
              clearText={() => {
                setDetailAddress('');
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: color.gray_00,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: color.blueGray_06,
    lineHeight: 24,
  },
  send: {
    color: color.mint_05,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  main: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  addressView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  address: {width: '65%'},
  addressBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.mint_00,
    paddingVertical: 8,
    paddingHorizontal: 23.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color.mint_04,
  },
  addressBtnText: {
    color: color.mint_04,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  inputWrap: {marginTop: 36},
});
export default ChangeAddressScreen;
