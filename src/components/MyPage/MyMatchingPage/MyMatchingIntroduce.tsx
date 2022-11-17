import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {color, Typography} from '../../../utils/utils';
import CustomInput from '../../common/CustomInput';

interface Props {
  onelineText: string;
  setOnelineText: Dispatch<SetStateAction<string>>;
  introduceText: string;
  setIntroduceText: Dispatch<SetStateAction<string>>;
}

const MyMatchingIntroduce = ({
  introduceText,
  setIntroduceText,
  onelineText,
  setOnelineText,
}: Props) => {
  const onChangeIntroduce = (e: string) => {
    setIntroduceText(e);
  };

  const onChangeOneline = (e: string) => {
    setOnelineText(e);
  };

  return (
    <View>
      <Text style={[Typography.subtitle2, {color: color.blueGray_06}]}>
        소개글
      </Text>
      <View style={styles.introduceWrap}>
        <TextInput
          style={[styles.introduce, Typography.body1]}
          multiline
          placeholder="매칭카드에 소개될 문장"
          placeholderTextColor={color.blueGray_01}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onChangeText={onChangeOneline}
          value={onelineText}
        />
        <TextInput
          style={[styles.description, Typography.body1]}
          multiline
          placeholder={
            '나를 소개할 수 있는 글을 입력해주세요.\nex)식물을 사랑하는 5년차 식집사입니다.'
          }
          placeholderTextColor={color.blueGray_01}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onChangeText={onChangeIntroduce}
          value={introduceText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introduceWrap: {
    marginTop: 20,
    backgroundColor: '#FAFAFC',
    padding: 14,
  },
  introduce: {
    color: color.blueGray_06,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: color.blueGray_00,
  },
  description: {
    height: 124,
    overflow: 'scroll',
    paddingTop: 14,
    color: color.blueGray_06,
  },
});

export default MyMatchingIntroduce;
