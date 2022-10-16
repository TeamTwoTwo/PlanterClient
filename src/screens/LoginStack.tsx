import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import LoginScreen from './Login/LoginScreen';
import FirstScreen from './FindID/FirstScreen';
import IdDoneScreen from './FindID/IdDoneScreen';
import FirstPwScreen from './FindPW/FirstPwScreen';
import NewPwScreen from './FindPW/NewPwScreen';
import PwDoneScreen from './FindPW/PwDoneScreen';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Back from '../assets/icon/ic-back.svg';
import SignupScreen01 from './Signup/SignupScreen01';
import SignupScreen02 from './Signup/SignupScreen02';
import {useNavigation} from '@react-navigation/native';
import SignupScreen03 from './Signup/SignupScreen03';
import FindAddress from './Signup/FindAddress';
import SignupScreen04 from './Signup/SignupScreen04';
import TermsOfServiceScreen from './Signup/TermsOfServiceScreen';
import TOSDetail from './Signup/TOSDetail';

type LoginStackParamList = {
  LoginScreen: undefined;
  FirstScreen: undefined;
  IdDoneScreen: undefined;
  FirstPwScreen: undefined;
  NewPwScreen: undefined;
  PwDoneScreen: undefined;
  TermsOfService: undefined;
  TOSDetail: {number: number};
  Signup01: undefined;
  Signup02: undefined;
  Signup03: {address: string};
  FindAddress: undefined;
  Signup04: undefined;
};

export type LoginStackNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStack = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LoginScreen}
        name="LoginScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={FirstScreen}
        name="FirstScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={IdDoneScreen}
        name="IdDoneScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={FirstPwScreen}
        name="FirstPwScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={NewPwScreen}
        name="NewPwScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={PwDoneScreen}
        name="PwDoneScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={TermsOfServiceScreen}
        name="TermsOfService"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={TOSDetail}
        name="TOSDetail"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignupScreen01}
        name="Signup01"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignupScreen02}
        name="Signup02"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignupScreen03}
        name="Signup03"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={FindAddress}
        name="FindAddress"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignupScreen04}
        name="Signup04"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    padding: 18,
    marginLeft: -12,
  },
});

export default LoginStack;
