import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomInput from '../common/CustomInput';
import Check from '../../assets/icon/ic-check.svg';
import {color, Typography} from '../../utils/utils';
import {
  OptionListType,
  PlantItemType,
} from '../../screens/MatchingRequest/MatchingRequestScreen01';

interface Props {
  idx: number;
  optionList: OptionListType[];
  plantItem: PlantItemType;
  plantList: PlantItemType[];
  setPlantList: Dispatch<SetStateAction<PlantItemType[]>>;
  removePlant: () => void;
}

const PlantItem = ({
  idx,
  optionList,
  plantItem,
  plantList,
  setPlantList,
  removePlant,
}: Props) => {
  const onChangeText = (e: string) => {
    const changed = {
      ...plantItem,
      plantName: e,
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  const clearText = () => {
    const changed = {
      ...plantItem,
      plantName: '',
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  // 옵션 id에 따라 체크값 상태 관리
  // 클릭한 옵션만 상태를 반대로 변경
  const onCheckOption = (optionId: number) => {
    const changed = {
      ...plantItem,
      optionId: plantItem.optionId.map((data, i) =>
        optionId === i + 1 ? (data ? null : optionId) : data,
      ),
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.headerWrap}>
        <Text style={[Typography.subtitle1, {color: color.blueGray_06}]}>
          맡길 식물{idx + 1}
        </Text>
        {plantList.length > 1 && (
          <TouchableOpacity activeOpacity={1} onPress={removePlant}>
            <Text style={[Typography.body1, {color: color.blueGray_01}]}>
              삭제
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.nameWrap}>
        <CustomInput
          label="식물이름"
          placeholder="식물이름"
          value={plantItem.plantName}
          onChangeText={onChangeText}
          clearText={clearText}
        />
      </View>
      <View style={styles.optionView}>
        {optionList.map((data, i) => (
          <View style={styles.optionWrap}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.checkBtn}
              onPress={() => {
                onCheckOption(data.optionId);
              }}>
              {plantItem.optionId[data.optionId - 1] ? (
                <Check width={20} height={20} fill={color.mint_05} />
              ) : (
                <View style={styles.empty} />
              )}
            </TouchableOpacity>
            <View style={styles.optionNameWrap}>
              <Text style={[Typography.body1, {color: color.blueGray_06}]}>
                {data.name}
              </Text>
            </View>
            <View>
              <Text style={[Typography.body1, {color: color.blueGray_06}]}>
                {data.price.toLocaleString()}원/1개
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameWrap: {
    marginTop: 14,
  },
  optionView: {
    marginTop: 14,
  },
  optionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkBtn: {
    padding: 8,
  },
  optionNameWrap: {
    marginLeft: -2,
    flex: 1,
  },
  empty: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.gray_03,
  },
});
export default PlantItem;
