import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  OptionListType,
  PlantItemType,
} from '../../screens/MatchingRequest/MatchingRequestScreen01';
import {color, screen, Typography} from '../../utils/utils';
import PlantItem from './PlantItem';
import Add from '../../assets/icon/ic-add.svg';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';
import {useRecoilState} from 'recoil';
import {MatchingRequestInfoState} from '../../recoil/atoms/matchingRequest';

interface Props {
  optionList: OptionListType[];
  plantList: PlantItemType[];
  setPlantList: Dispatch<SetStateAction<PlantItemType[]>>;
  plantManagerId: number;
}

const PlantItemList = ({
  optionList,
  plantList,
  setPlantList,
  plantManagerId,
}: Props) => {
  const [MatchingRequestInfo, setMatchingRequestInfo] = useRecoilState(
    MatchingRequestInfoState,
  );
  const navigation = useNavigation<MainTabNavigationProp>();

  const [canNext, setCanNext] = useState<boolean>(false);

  useEffect(() => {
    console.log(plantList);
    let tmp = true; // 다음 버튼 활성화 유무
    plantList?.forEach((data, idx) => {
      let optionNonCheck = false;
      // ㄴ true -> 옵션이 하나도 체크되지 않음
      let cnt = 0;
      // 각 아이템의 옵션 리스트를 돌면서 체크되지 않은 옵션의 갯수를 체크
      data.optionId.forEach(option => {
        if (!option) {
          cnt++;
        }
      });
      // 옵션 리스트가 모두 체크되지 않았다면 optionNonCheck = true
      if (cnt === data.optionId.length) {
        optionNonCheck = true;
      }
      if (data.plantName === '' || optionNonCheck) {
        setCanNext(false);
        tmp = false;
        return;
      }
    });
    if (tmp) {
      setCanNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantList]);

  let plantItem: PlantItemType = {
    plantName: '',
    optionId: new Array(optionList?.length).fill(null),
  };
  const addPlant = () => {
    console.log(plantItem);
    let list = [...plantList, plantItem];
    setPlantList(list);
  };

  const removePlant = (idx: number) => {
    let list = [...plantList];
    setPlantList(list.filter((d, i) => idx !== i));
  };

  const onNavigate = () => {
    setMatchingRequestInfo({
      ...MatchingRequestInfo,
      service: plantList,
      plantManagerId,
    });
    navigation.navigate('MatchingRequestScreen02');
  };

  return (
    <View style={styles.wrap}>
      <ScrollView>
        <View style={styles.main}>
          <FlatList
            data={plantList}
            renderItem={({item, index}) => (
              <PlantItem
                idx={index}
                optionList={optionList}
                plantItem={item}
                plantList={plantList}
                setPlantList={setPlantList}
                removePlant={() => {
                  removePlant(index);
                }}
              />
            )}
            keyExtractor={(_, idx) => `plant-item ${idx}`}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View style={[styles.addBtnWrap, styles.padding]}>
            <TouchableOpacity
              style={styles.addBtn}
              activeOpacity={1}
              onPress={addPlant}>
              <Add />
              <Text
                style={[
                  Typography.subtitle3,
                  {color: color.blueGray_03, marginLeft: 4},
                ]}>
                식물추가
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View>
        <CustomButton
          text="다음"
          onPress={onNavigate}
          backgroundColor={color.mint_05}
          style={{width: screen.width}}
          disabled={canNext ? false : true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  main: {
    marginTop: 32,
    flex: 1,
  },
  separator: {
    height: 0,
    borderWidth: 1,
    borderColor: color.blueGray_00,
    marginTop: 22,
    marginBottom: 32,
  },
  addBtnWrap: {
    marginTop: 26,
    marginBottom: 90,
  },
  addBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.blueGray_00,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  padding: {
    paddingHorizontal: 20,
  },
});
export default PlantItemList;
