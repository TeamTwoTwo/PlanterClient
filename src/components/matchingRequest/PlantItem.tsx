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
import {PlantItemType} from '../../screens/MatchingRequest/MatchingRequestScreen01';

interface Props {
  idx: number;
  plantItem: PlantItemType;
  plantList: PlantItemType[];
  setPlantList: Dispatch<SetStateAction<PlantItemType[]>>;
  removePlant: () => void;
}

const PlantItem = ({
  idx,
  plantItem,
  plantList,
  setPlantList,
  removePlant,
}: Props) => {
  //   useEffect(() => {
  //     onChangeText();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [name]);

  const onChangeText = (e: string) => {
    const changed = {
      ...plantItem,
      name: e,
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  const clearText = () => {
    const changed = {
      ...plantItem,
      name: '',
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  const onCheckCaring = () => {
    const changed = {
      ...plantItem,
      caring: !plantItem.caring,
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  const onCheckPruning = () => {
    const changed = {
      ...plantItem,
      pruning: !plantItem.pruning,
    };
    let list = [...plantList];
    list[idx] = changed;
    setPlantList(list);
  };

  const onCheckSupplements = () => {
    const changed = {
      ...plantItem,
      supplements: !plantItem.supplements,
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
          value={plantItem.name}
          onChangeText={onChangeText}
          clearText={clearText}
        />
      </View>
      <View style={styles.optionView}>
        <View style={styles.optionWrap}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.checkBtn}
            onPress={onCheckCaring}>
            {plantItem.caring ? (
              <Check width={20} height={20} fill={color.mint_05} />
            ) : (
              <View style={styles.empty} />
            )}
          </TouchableOpacity>
          <View style={styles.optionNameWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              식물관리
            </Text>
          </View>
          <View>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              5,000원/1개
            </Text>
          </View>
        </View>
        <View style={styles.optionWrap}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.checkBtn}
            onPress={onCheckPruning}>
            {plantItem.pruning ? (
              <Check width={20} height={20} fill={color.mint_05} />
            ) : (
              <View style={styles.empty} />
            )}
          </TouchableOpacity>
          <View style={styles.optionNameWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              가지치기
            </Text>
          </View>
          <View>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              10,000원/1개
            </Text>
          </View>
        </View>
        <View style={styles.optionWrap}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.checkBtn}
            onPress={onCheckSupplements}>
            {plantItem.supplements ? (
              <Check width={20} height={20} fill={color.mint_05} />
            ) : (
              <View style={styles.empty} />
            )}
          </TouchableOpacity>
          <View style={styles.optionNameWrap}>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              영양제
            </Text>
          </View>
          <View>
            <Text style={[Typography.body1, {color: color.blueGray_06}]}>
              3,000원/1개
            </Text>
          </View>
        </View>
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
