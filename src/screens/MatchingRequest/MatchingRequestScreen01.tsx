import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MatchingHeader from '../../components/matching/MatchingHeader';
import PlantItemList from '../../components/matchingRequest/PlantItemList';
import {color, screen} from '../../utils/utils';

export interface PlantItemType {
  name: string;
  caring: boolean;
  pruning: boolean;
  supplements: boolean;
}

const MatchingRequestScreen01 = () => {
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
      <PlantItemList />
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
