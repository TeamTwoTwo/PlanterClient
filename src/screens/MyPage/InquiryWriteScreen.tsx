import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, screen, Typography, url} from '../../utils/utils';
import Back from '../../assets/icon/ic-back-arrow-black.svg';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/common/CustomInput';

const InquiryWriteScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [isFull, setIsFull] = useState<boolean>(false);
  const navigation = useNavigation<MainTabNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    if (contents.length === 0) {
      setIsFull(false);
    } else {
      setIsFull(true);
    }
  }, [contents]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={onGoBack}>
            <Back />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>1:1 문의하기</Text>
          </View>
          <Pressable>
            <Text style={textStyles(isFull).send}>등록</Text>
          </Pressable>
        </View>
        <View style={{marginTop: 28, paddingHorizontal: 20}}>
          <CustomInput
            label="문의제목"
            placeholder="문의제목"
            onChangeText={setTitle}
            value={title}
            clearText={() => {
              setTitle('');
            }}
          />
        </View>
        <View style={{minHeight: screen.height - 96}}>
          <TextInput
            style={[
              Typography.body1,
              {paddingLeft: 20, paddingRight: 16, marginTop: 20, flex: 1},
            ]}
            placeholder="1:1 문의 내용을 작성해주세요."
            multiline
            textAlignVertical="top"
            placeholderTextColor={color.blueGray_01}
            value={contents}
            onChangeText={setContents}
            selectionColor={color.mint_05}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const textStyles = (isFull: boolean) =>
  StyleSheet.create({
    send: {
      color: isFull ? color.mint_05 : color.gray_04,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
  });

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.gray_00,
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
  keyboard: {
    flex: 1,
  },
});

export default InquiryWriteScreen;
