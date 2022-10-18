import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../utils/utils';
import Check from '../../assets/icon/ic-check.svg';
import CustomButton from '../../components/common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../LoginStack';
import FindHeader from '../../components/common/FindHeader';

interface AgreeStatus {
  all: boolean;
  first: boolean;
  second: boolean;
  third: boolean;
}

const TermsOfServiceScreen = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  const [agree, setAgree] = useState<AgreeStatus>({
    all: false,
    first: false,
    second: false,
    third: false,
  });

  useEffect(() => {
    if (!agree.first || !agree.second || !agree.third) {
      setAgree({...agree, all: false});
    } else if (agree.first && agree.second && agree.third) {
      setAgree({...agree, all: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agree.first, agree.second, agree.third]);

  const onPressAll = () => {
    if (agree.all) {
      setAgree({all: false, first: false, second: false, third: false});
    } else {
      setAgree({all: true, first: true, second: true, third: true});
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FindHeader />
      <View style={styles.contentWrap}>
        <View>
          <Text style={styles.headerText}>이용약관</Text>
        </View>
        <View style={styles.main}>
          <View style={[styles.agreeView, {backgroundColor: color.gray_01}]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.checkBtn}
              onPress={onPressAll}>
              <Check
                width={20}
                height={20}
                fill={agree.all ? color.mint_05 : color.gray_03}
              />
            </TouchableOpacity>
            <View style={styles.textView}>
              <Text style={styles.text}>약관 전체 동의</Text>
            </View>
          </View>
          <View style={[styles.agreeView, {marginTop: 10}]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.checkBtn}
              onPress={() => {
                setAgree({...agree, first: !agree.first});
              }}>
              <Check
                width={20}
                height={20}
                fill={agree.first ? color.mint_05 : color.gray_03}
              />
            </TouchableOpacity>
            <View style={styles.textView}>
              <Text style={styles.text}>[필수] 서비스 이용약관 동의</Text>
            </View>
            <View>
              <Text
                style={styles.detail}
                onPress={() => {
                  navigation.navigate('TOSDetail', {number: 1});
                }}>
                보기
              </Text>
            </View>
          </View>
          <View style={[styles.agreeView, {marginTop: 4}]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.checkBtn}
              onPress={() => {
                setAgree({...agree, second: !agree.second});
              }}>
              <Check
                width={20}
                height={20}
                fill={agree.second ? color.mint_05 : color.gray_03}
              />
            </TouchableOpacity>
            <View style={styles.textView}>
              <Text style={styles.text}>[필수] 개인정보 처리 방침 동의</Text>
            </View>
            <View>
              <Text
                style={styles.detail}
                onPress={() => {
                  navigation.navigate('TOSDetail', {number: 2});
                }}>
                보기
              </Text>
            </View>
          </View>
          <View style={[styles.agreeView, {marginTop: 4}]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.checkBtn}
              onPress={() => {
                setAgree({...agree, third: !agree.third});
              }}>
              <Check
                width={20}
                height={20}
                fill={agree.third ? color.mint_05 : color.gray_03}
              />
            </TouchableOpacity>
            <View style={styles.textView}>
              <Text style={styles.text}>[필수] 전자금융거래 이용약관 동의</Text>
            </View>
            <View>
              <Text
                style={styles.detail}
                onPress={() => {
                  navigation.navigate('TOSDetail', {number: 3});
                }}>
                보기
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.btnWrap}>
          <CustomButton
            text="다음"
            backgroundColor={color.mint_05}
            disabled={!agree.all ? true : false}
            width="100%"
            borderRadius={6}
            onPress={() => {
              navigation.navigate('Signup01');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 24,
  },
  contentWrap: {
    marginTop: 47,
    flex: 1,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    color: color.gray_07,
  },
  main: {
    marginTop: 44,
    flex: 1,
  },
  agreeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    paddingRight: 14,
    borderRadius: 5,
  },
  checkBtn: {
    padding: 8,
  },
  textView: {flex: 1, marginLeft: 4},
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: color.gray_07,
  },
  detail: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: color.gray_04,
    textDecorationLine: 'underline',
  },
  btnWrap: {
    marginBottom: Platform.OS === 'ios' ? 16 : 24,
  },
});
export default TermsOfServiceScreen;
