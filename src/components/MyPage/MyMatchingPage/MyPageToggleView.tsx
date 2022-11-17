import React, {Dispatch, SetStateAction} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {color, Typography} from '../../../utils/utils';
import Toggle from '../../../components/MyPage/Toggle';

interface Props {
  isMatchingAllowed: boolean;
  setIsMatchingAllowed: Dispatch<SetStateAction<boolean>>;
}

const MyPageToggleView = ({isMatchingAllowed, setIsMatchingAllowed}: Props) => {
  const onPressToggle = () => {
    setIsMatchingAllowed(previousState => !previousState);
  };
  return (
    <View style={[styles.toggleWrap, styles.padding]}>
      <Toggle
        text="매칭 허용"
        isEnabled={isMatchingAllowed}
        onPress={onPressToggle}
      />
      <Text style={[Typography.body2, {color: color.blueGray_01}]}>
        매칭 허용 시 내 매칭카드가 타인에게 노출됩니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleWrap: {
    marginTop: 20,
  },
  padding: {
    paddingHorizontal: 20,
  },
});

export default MyPageToggleView;
