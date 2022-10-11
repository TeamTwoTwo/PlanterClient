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

type LoginStackParamList = {
  LoginScreen: undefined;
  FirstScreen: undefined;
  IdDoneScreen: undefined;
  FirstPwScreen: undefined;
  NewPwScreen: undefined;
  PwDoneScreen: undefined;
};

export type LoginStackNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStack = () => {
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
    </Stack.Navigator>
  );
};

export default LoginStack;
