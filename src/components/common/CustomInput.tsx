import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardTypeOptions,
} from 'react-native';
import Clear from '../../assets/icon/ic-clean.svg';
import {color} from '../../utils/util';

// ?: 로 돼있는 건 props로 꼭 넘길 필요는 없음
// label: focus 됐을 때 placeholder가 위로 올라가면서 생기는 text
// errorText: 밑에 빨간 글씨로 뜨는 에러 메시지 내용 넘겨주면 됨
// type: number-pad와 같은 키보드 타입. 안 넘길 시 default로 고정
// secure: 비밀번호 인풋에 해당 props 사용하면 됨
// disabled: 해당 props 넘겨주면 input에 focus 및 value 수정 불가
// value: TextInput에 쓰여지는 value state 값 넘겨주면 됨
// checkStatus: 비밀번호 형식이나 이메일 형식에 맞는지와 같은 check state. 이름처럼 정규식 안 쓰이는 곳에는 해당 props 안 넘겨도 됨. 이 props에 따라 에러 메시지가 보이고 말고를 결정함
// multiline: 텍스트 여러 줄 입력 가능
// pointerEventsNone: 주소 입력 input 때문에 추가한 props인데 사용하면 해당 input 클릭 안 됨
// onChangeText: 단순히 TextInput value만 바꿔주는 경우엔 이거 쓰는 게 편함. 아래처럼 사용
// <TextInput onChangeText={setText(~~)} />
// clearText: x버튼 눌렀을 때 실행되는 함수. setText("") 같은 거 넣으면 됨
interface Props {
  label: string;
  placeholder: string;
  errorText?: string;
  type?: KeyboardTypeOptions;
  secure?: boolean;
  disabled?: boolean;
  value: string;
  checkStatus?: boolean;
  multiline?: boolean;
  pointerEventsNone?: boolean;
  onChangeText: Dispatch<SetStateAction<string>>;
  clearText?: () => void;
}

const CustomInput = ({
  label,
  placeholder,
  errorText,
  type,
  secure,
  disabled,
  value,
  checkStatus = true,
  multiline = false,
  pointerEventsNone = false,
  onChangeText,
  clearText,
}: Props) => {
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [borderBottomColor, setBorderBottomColor] = useState<string>(
    color.gray_04,
  );

  useEffect(() => {
    if (value?.length === 0) {
      setShowLabel(false);
      setShowClearBtn(false);
    } else {
      setShowLabel(true);
      setShowClearBtn(true);
    }
  }, [value]);

  useEffect(() => {
    if (value.length !== 0) {
      if (checkStatus) {
        setBorderBottomColor(color.mint_04);
      } else {
        setBorderBottomColor(color.red_02);
      }
    }
  }, [checkStatus, value.length]);

  const onFocus = () => {
    if (value?.length !== 0) {
      setShowClearBtn(true);
    }
    if (checkStatus) {
      setBorderBottomColor(color.mint_04);
    } else {
      setBorderBottomColor(color.red_02);
    }
  };

  const onEndEditing = () => {
    if (!checkStatus) {
      setBorderBottomColor(color.red_02);
    } else {
      setBorderBottomColor(color.gray_04);
      setShowClearBtn(false);
    }
  };

  return (
    <>
      {showLabel ? (
        <View>
          <Text style={styles.label}>{label}</Text>
        </View>
      ) : (
        <View style={{height: 18}} />
      )}
      <View style={[styles.textInputWrap, {borderBottomColor}]}>
        <TextInput
          style={styles.text}
          keyboardType={type ? type : 'default'}
          placeholder={placeholder}
          placeholderTextColor={color.gray_04}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={onChangeText}
          onFocus={onFocus}
          onEndEditing={onEndEditing}
          value={value}
          secureTextEntry={secure}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          multiline={multiline}
          pointerEvents={pointerEventsNone ? 'none' : 'auto'}
        />
        {showClearBtn && !disabled ? (
          <TouchableOpacity
            style={styles.clearBtn}
            activeOpacity={0.5}
            onPress={clearText}>
            <Clear width={20} height={20} />
          </TouchableOpacity>
        ) : null}
      </View>
      {!checkStatus && (
        <View style={styles.errorTextView}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: color.gray_04,
  },
  textInputWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingRight: 12,
  },
  text: {
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 10,
    paddingBottom: 14,
    lineHeight: 24,
  },
  clearBtn: {
    padding: 12,
  },
  errorTextView: {
    marginTop: 6,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: color.red_02,
  },
});

export default CustomInput;
