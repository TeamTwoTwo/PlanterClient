import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import FirstPwScreen from './FindPW/FirstPwScreen';
import NewPwScreen from './FindPW/NewPwScreen';
import PwDoneScreen from './FindPW/PwDoneScreen';

type FindPwStackParamList = {
  FirstPwScreen: undefined;
  NewPwScreen: undefined;
  PwDoneScreen: undefined;
};

export type FindPwStackNavigationProp =
  NativeStackNavigationProp<FindPwStackParamList>;

const Stack = createNativeStackNavigator<FindPwStackParamList>();

const FindPwStack = () => {
  return (
    <Stack.Navigator>
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

export default FindPwStack;
