import React, {useState, useCallback} from 'react';
import Postcode from '@actbase/react-daum-postcode';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {MainTabNavigationProp} from '../MainTab';
import FindHeader from '../../components/common/FindHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getData} from '../../utils/AsyncStorage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddressScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [userId, setUserId] = useState<number>(0);

  const getUserInfo = () => {
    getData('auth').then(info => {
      setUserId(info.userId);
      console.log(info.userId);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo(); // 화면이 포커스 됐을 때
      return () => {
        console.log('나가욥'); // 화면 포커스 아웃 됐을 때
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.view}>
        <FindHeader />
      </View>
      <Postcode
        style={styles.post}
        jsOptions={{animation: true}}
        onSelected={data => {
          navigation.navigate('LocationScreen', {
            locationAddress:
              data.buildingName !== ''
                ? data.address + ` (${data.buildingName})`
                : data.address,
            simpleAddress:
              data.sido +
              ' ' +
              data.sigungu +
              ' ' +
              (data.bname1.length > 0 ? data.bname1 : data.bname2),
            userId,
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
export default AddressScreen;
