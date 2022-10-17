import React from 'react';
import Postcode from '@actbase/react-daum-postcode';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../LoginStack';
import FindHeader from '../../components/common/FindHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FindAddress = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.view}>
        <FindHeader />
      </View>
      <Postcode
        style={styles.post}
        jsOptions={{animation: true}}
        onSelected={data => {
          navigation.navigate('Signup03', {
            address:
              data.buildingName !== ''
                ? data.address + ` (${data.buildingName})`
                : data.address,
          });
        }}
        onError={function (error: unknown): void {
          throw new Error('Function not implemented.');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  view: {paddingHorizontal: 24},
  post: {
    width,
    height,
    marginTop: 20,
  },
});
export default FindAddress;
