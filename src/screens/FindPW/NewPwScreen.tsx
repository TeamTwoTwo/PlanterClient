import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import FindHeader from '../../components/common/FindHeader';
import {color} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {FindPwStackNavigationProp} from '../../screens/FindPwStack';
import {WithLocalSvg} from 'react-native-svg';
import Clean from '../../assets/icon/ic-clean.svg';
import Toast from 'react-native-easy-toast';

const NewPwScreen = () => {
  const [password, setPassword] = useState<string>('');
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [isfocus, setIsFocus] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const [newPW, setNewPW] = useState<string>('');
  const [showNewLabel, setShowNewLabel] = useState<boolean>(false);
  const [isNewfocus, setIsNewFocus] = useState<boolean>(false);

  const [isSame, setIsSame] = useState<boolean>(true);
  const [isBtnShow, setIsBtnShow] = useState<boolean>(false);

  const navigation = useNavigation<FindPwStackNavigationProp>();

  const validatePW = (pw: string): boolean => {
    //숫자+영문자+특수문자 조합으로 8자리 이상 입력
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return regex.test(pw);
  };

  useEffect(() => {
    if (password.length === 0) {
      setShowLabel(false);
    } else {
      setShowLabel(true);
    }
    if (newPW.length === 0) {
      setShowNewLabel(false);
    } else {
      setShowNewLabel(true);
    }
  }, [password, newPW]);

  useEffect(() => {
    if (newPW === password) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [newPW, password]);

  useEffect(() => {
    if (newPW !== '' && isSame) {
      setIsBtnShow(true);
    }
  }, [newPW, isSame]);

  const onPress = (): void => {
    if (newPW !== '' && isSame) {
      navigation.navigate('PwDoneScreen');
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <View>
        <FindHeader />
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>새 비밀번호 등록</Text>
      </View>
      {showLabel && (
        <View>
          <Text style={styles.label}>새 비밀번호</Text>
        </View>
      )}
      <View style={styles.pwInputWrap}>
        <TextInput
          style={inputStyle(isfocus, isValidate, isSame).pwInput}
          placeholder="새 비밀번호"
          placeholderTextColor="#AEAEAE"
          value={password}
          onChange={event => {
            const {text} = event.nativeEvent;
            setPassword(text);
            setIsValidate(validatePW(text));
          }}
          onFocus={() => {
            setIsNewFocus(false);
            setIsFocus(true);
          }}
          onSubmitEditing={() => {
            setIsFocus(false);
          }}
          secureTextEntry
        />
        {isfocus &&
          (isValidate ? null : (
            <Text style={styles.errorText}>잘못된 비밀번호입니다.</Text>
          ))}
        {isfocus && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPassword('')}
            style={styles.cleanBtn}>
            <WithLocalSvg width={20} height={20} asset={Clean} />
          </TouchableOpacity>
        )}
      </View>
      {showNewLabel && (
        <View>
          <Text style={styles.label}>새 비밀번호 확인</Text>
        </View>
      )}
      <View style={styles.pwInputWrap}>
        <TextInput
          style={newInputStyle(isNewfocus, isSame).pwInput}
          placeholder="새 비밀번호 확인"
          placeholderTextColor="#AEAEAE"
          value={newPW}
          onChange={event => {
            const {text} = event.nativeEvent;
            setNewPW(text);
          }}
          onFocus={() => {
            setIsFocus(false);
            setIsNewFocus(true);
          }}
          onSubmitEditing={() => {
            setIsNewFocus(false);
          }}
          secureTextEntry
        />
        {isNewfocus &&
          (isSame ? null : (
            <Text style={styles.errorText}>비밀번호를 확인해주세요.</Text>
          ))}
        {isNewfocus && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setNewPW('')}
            style={styles.cleanBtn}>
            <WithLocalSvg width={20} height={20} asset={Clean} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.empty} />
      {isBtnShow && (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <View style={styles.nextBtn}>
            <Text style={styles.btnText}>다음</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const inputStyle = (isfocus: boolean, isValidate: boolean, isSame: boolean) =>
  StyleSheet.create({
    pwInput: {
      fontSize: 16,
      color: color.gray_07,
      borderBottomWidth: 1,
      borderColor: isfocus
        ? isValidate
          ? color.mint_05
          : color.red_02
        : isSame
        ? color.gray_04
        : color.red_02,
      height: 48,
    },
  });

const newInputStyle = (isNewfocus: boolean, isSame: boolean) =>
  StyleSheet.create({
    pwInput: {
      fontSize: 16,
      color: color.gray_07,
      borderBottomWidth: 1,
      borderColor: isNewfocus
        ? isSame
          ? color.mint_05
          : color.red_02
        : color.gray_04,
      height: 48,
    },
  });

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 24,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: color.gray_04,
  },
  block: {
    backgroundColor: color.gray_00,
    flex: 1,
  },
  titleWrap: {
    paddingHorizontal: 24,
    paddingTop: 30,
    // borderWidth: 1,
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: color.gray_07,
  },
  pwInputWrap: {
    marginHorizontal: 24,
    marginBottom: 15,
    // marginBottom: 40,
    // borderWidth: 1,
  },
  pwInput: {
    fontSize: 16,
    color: color.gray_07,
    borderBottomWidth: 1,
    borderColor: color.gray_04,
    height: 48,
  },
  nextBtn: {
    height: 52,
    backgroundColor: color.mint_05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: color.gray_00,
    fontSize: 16,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: color.red_02,
    marginTop: 10,
  },
  cleanBtn: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
  focusedBox: {
    borderColor: color.mint_05,
    backgroundColor: color.mint_00,
  },
  focusedText: {
    color: color.mint_05,
  },
  focused: {
    borderColor: color.mint_05,
  },
});

export default NewPwScreen;
