import React from 'react';
import Postcode from '@actbase/react-daum-postcode';
import {Dimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginStackNavigationProp} from '../LoginStack';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FindAddress = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  return (
    <View>
      <Postcode
        style={{width, height}}
        jsOptions={{animation: true}}
        onSelected={data => {
          navigation.navigate('Signup03', {address: data.address});
        }}
        onError={function (error: unknown): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};

export default FindAddress;
