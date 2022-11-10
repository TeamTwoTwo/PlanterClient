import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MatchingHeader from '../../components/matching/MatchingHeader';
import PlantItemList from '../../components/matchingRequest/PlantItemList';
import {getData} from '../../utils/AsyncStorage';
import {color, screen, url} from '../../utils/utils';

export interface PlantItemType {
  plantName: string;
  optionId: (number | null)[];
}

export interface OptionListType {
  optionId: number;
  name: string;
  price: number;
}

const MatchingRequestScreen01 = ({route}: any) => {
  const plantManagerId = route?.params;
  const [optionList, setOptionList] = useState<OptionListType[]>([]);
  const [plantList, setPlantList] = useState<PlantItemType[]>([]);

  useEffect(() => {
    getData('auth')
      .then(auth => {
        axios
          .get(url.dev + 'plant-managers/2/option', {
            headers: {Authorization: `Bearer ${auth.token}`},
          })
          .then(res => {
            console.log(res.data.result);
            if (res.data.isSuccess) {
              setOptionList(res.data.result);
              setPlantList([
                {
                  plantName: '',
                  optionId: new Array(res.data.result?.length).fill(null),
                },
              ]);
            }
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        <MatchingHeader title="식물 정보입력" />
      </View>
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarOuter}>
          <View style={styles.progressBarInner} />
        </View>
      </View>
      <PlantItemList
        optionList={optionList}
        plantList={plantList}
        setPlantList={setPlantList}
        plantManagerId={plantManagerId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  padding: {
    paddingHorizontal: 20,
  },
  progressBarWrap: {
    width: screen.width,
  },
  progressBarOuter: {
    height: 2,
    backgroundColor: color.blueGray_00,
  },
  progressBarInner: {
    width: '25%',
    height: 2,
    backgroundColor: color.blueGray_06,
  },
});

export default MatchingRequestScreen01;
