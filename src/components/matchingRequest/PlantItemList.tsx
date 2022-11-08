import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PlantItemType} from '../../screens/MatchingRequest/MatchingRequestScreen01';
import {color, screen, Typography} from '../../utils/utils';
import PlantItem from './PlantItem';
import Add from '../../assets/icon/ic-add.svg';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../screens/MainTab';

const PlantItemList = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [plantList, setPlantList] = useState<PlantItemType[]>([
    {name: '', caring: false, pruning: false, supplements: false},
  ]);
  const [canNext, setCanNext] = useState<boolean>(false);

  useEffect(() => {
    console.log(plantList);
    let tmp = true;
    plantList?.forEach((data, idx) => {
      if (
        data.name === '' ||
        (!data.caring && !data.pruning && !data.supplements)
      ) {
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
    name: '',
    caring: false,
    pruning: false,
    supplements: false,
  };
  const addPlant = () => {
    let list = [...plantList, plantItem];
    setPlantList(list);
  };

  const removePlant = (idx: number) => {
    let list = [...plantList];
    setPlantList(list.filter((d, i) => idx !== i));
  };

  const onNavigate = () => {
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
