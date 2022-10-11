import React, {useState, useEffect, useRef} from 'react';
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
import {LoginStackNavigationProp} from '../../screens/LoginStack';
import {WithLocalSvg} from 'react-native-svg';
import Clean from '../../assets/icon/ic-clean.svg';
import Toast from 'react-native-easy-toast';

const FirstPwScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [isBtnShow, setIsBtnShow] = useState<boolean>(false);
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [isfocus, setIsFocus] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>('');
  const [isPhoneShow, setIsPhoneShow] = useState<boolean>(false);
  const [showPhoneLabel, setShowPhoneLabel] = useState<boolean>(false);
  const [isPhoneFocus, setIsPhoneFocus] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [isMessageShow, setIsMessageShow] = useState<boolean>(false);
  const [showMessageLabel, setShowMessageLable] = useState<boolean>(false);
  const [isMessageFocus, setMessageFocus] = useState<boolean>(false);

  const [stage, setStage] = useState<number>(1);
  const [isFull, setIsFull] = useState<boolean>(false);

  const navigation = useNavigation<LoginStackNavigationProp>();
  const inputRef = useRef<TextInput | null>(null);

  const onPress = (): void => {
    if (isValidate) {
      Keyboard.dismiss();
      setIsPhoneShow(true);
      setIsBtnShow(false);
      setIsFocus(false);
      setStage(2);
    }
  };

  const onSend = () => {
    Keyboard.dismiss();
    setIsMessageShow(true);
    setIsPhoneFocus(false);
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  };

  const onConfirm = (): void => {
    navigation.navigate('NewPwScreen');
  };

  const validateEmail = (id: string): boolean => {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(id);
  };

  useEffect(() => {
    if (email.length === 0) {
      setShowLabel(false);
      setIsBtnShow(false);
    } else {
      setShowLabel(true);
      setIsBtnShow(true);
    }
    if (phone.length === 0) {
      setShowPhoneLabel(false);
    } else {
      setShowPhoneLabel(true);
    }
    if (message.length === 0) {
      setShowMessageLable(false);
    } else {
      setShowMessageLable(true);
    }
  }, [email, phone, message]);

  useEffect(() => {
    if (phone !== '') {
      setIsFull(true);
    }
  }, [phone]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (isMessageShow) {
      inputRef.current.focus();
    }
  }, [isMessageShow]);

  return (
    <SafeAreaView style={styles.block}>
      <View>
        <FindHeader />
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>비밀번호 재설정</Text>
      </View>
      {showPhoneLabel && (
        <View>
          <Text style={styles.label}>휴대폰번호</Text>
        </View>
      )}
      {isPhoneShow && (
        <View style={styles.phoneInputWrap}>
          <View>
            <TextInput
              style={[styles.phoneInput, isPhoneFocus && styles.focused]}
              placeholder="휴대폰번호"
              placeholderTextColor="#AEAEAE"
              keyboardType="number-pad"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                setIsPhoneFocus(false);
              }}
              value={phone}
              onChange={event => {
                const {text} = event.nativeEvent;
                setPhone(text);
              }}
              onFocus={() => {
                setIsPhoneFocus(true);
              }}
            />
            {isPhoneFocus && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setPhone('')}
                style={styles.cleanBtn}>
                <WithLocalSvg width={20} height={20} asset={Clean} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.messageWrap}>
            <TouchableOpacity activeOpacity={1} onPress={onSend}>
              <View
                style={[
                  styles.messageBtn,
                  isPhoneFocus && styles.focusedBox,
                  isFull && styles.focusedBox,
                ]}>
                {isMessageShow ? (
                  <Text
                    style={[
                      styles.messageBtnText,
                      isPhoneFocus && styles.focusedText,
                      isFull && styles.focusedText,
                    ]}>
                    인증번호 재전송
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.messageBtnText,
                      isPhoneFocus && styles.focusedText,
                    ]}>
                    인증번호 전송
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showMessageLabel && (
        <View>
          <Text style={styles.label}>인증번호 입력</Text>
        </View>
      )}
      {isMessageShow && (
        <View style={styles.phoneInputWrap}>
          <View>
            <TextInput
              style={[styles.phoneInput, isMessageFocus && styles.focused]}
              placeholder="인증번호 입력"
              placeholderTextColor="#AEAEAE"
              keyboardType="number-pad"
              value={message}
              onChange={event => {
                const {text} = event.nativeEvent;
                setMessage(text);
              }}
              onFocus={() => setMessageFocus(true)}
              onSubmitEditing={() => {
                navigation.navigate('NewPwScreen');
              }}
              ref={inputRef}
            />
            {isMessageFocus && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setMessage('')}
                style={styles.cleanBtn}>
                <WithLocalSvg width={20} height={20} asset={Clean} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.messageWrap}>
            <TouchableOpacity activeOpacity={1} onPress={onConfirm}>
              <View
                style={[
                  styles.messageBtn,
                  isMessageFocus && styles.focusedBox,
                ]}>
                <Text
                  style={[
                    styles.messageBtnText,
                    isMessageFocus && styles.focusedText,
                  ]}>
                  인증번호 확인
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showLabel && (
        <View>
          <Text style={styles.label}>아이디</Text>
        </View>
      )}
      <View style={styles.emailInputWrap}>
        <TextInput
          style={[
            inputStyle(isValidate).emailInput,
            isfocus && inputStyle(isValidate).focused,
          ]}
          placeholder="아이디"
          placeholderTextColor="#AEAEAE"
          value={email}
          onChange={event => {
            const {text} = event.nativeEvent;
            setEmail(text);
            setIsBtnShow(true);
            setIsValidate(validateEmail(text));
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onSubmitEditing={() => {
            setIsFocus(false);
          }}
        />
        {isValidate ? null : (
          <Text style={styles.errorText}>이메일 주소를 확인해주세요.</Text>
        )}
        {isfocus && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setEmail('')}
            style={styles.cleanBtn}>
            <WithLocalSvg width={20} height={20} asset={Clean} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.empty} />
      {isBtnShow && stage === 1 && (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <View style={styles.nextBtn}>
            <Text style={styles.btnText}>다음</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const inputStyle = (isValidate: boolean) =>
  StyleSheet.create({
    focused: {
      borderColor: isValidate ? color.mint_05 : color.red_02,
    },
    emailInput: {
      fontSize: 16,
      color: color.gray_07,
      borderBottomWidth: 1,
      borderColor: isValidate ? color.gray_04 : color.red_02,
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
  emailInputWrap: {
    marginHorizontal: 24,
    // marginBottom: 40,
    // borderWidth: 1,
  },
  emailInput: {
    fontSize: 16,
    color: color.gray_07,
    borderBottomWidth: 1,
    borderColor: color.gray_04,
    height: 48,
  },
  phoneInput: {
    fontSize: 16,
    color: color.gray_07,
    borderBottomWidth: 1,
    borderColor: color.gray_04,
    width: 250,
    height: 48,
  },
  phoneInputWrap: {
    marginHorizontal: 24,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
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
  messageBtn: {
    height: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.gray_03,
    borderRadius: 6,
  },
  messageBtnText: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontSize: 12,
    color: color.gray_05,
  },
  messageWrap: {
    width: 95,
    justifyContent: 'center',
    // borderWidth: 1,
  },
  focused: {
    borderColor: color.mint_05,
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
});

export default FirstPwScreen;
