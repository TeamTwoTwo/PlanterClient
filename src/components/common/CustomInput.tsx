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
import {color} from '../../utils/color';

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