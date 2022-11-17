import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {color, Typography} from '../../../utils/utils';
import CustomInput from '../../common/CustomInput';

interface Props {
  introduceText: string;
  setIntroduceText: Dispatch<SetStateAction<string>>;
}

const MyMatchingIntroduce = ({introduceText, setIntroduceText}: Props) => {
  const onChangeText = (e: string) => {
    setIntroduceText(e);
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
          placeholder={
            '나를 소개할 수 있는 글을 입력해주세요.\nex)식물을 사랑하는 5년차 식집사입니다.'
          }
          placeholderTextColor={color.blueGray_01}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onChangeText={onChangeText}
          value={introduceText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introduceWrap: {
    marginTop: 20,
  },
  introduce: {
    backgroundColor: '#FAFAFC',
    height: 124,
    overflow: 'scroll',
    padding: 14,
    paddingTop: 14,
    color: color.blueGray_06,
  },
});

export default MyMatchingIntroduce;
