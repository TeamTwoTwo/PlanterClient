import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import FirstScreen from './FindID/FirstScreen';
import IdDoneScreen from './FindID/IdDoneScreen';

type FindIdStackParamList = {
  FirstScreen: undefined;
  IdDoneScreen: undefined;
};

export type FindIdStackNavigationProp =
  NativeStackNavigationProp<FindIdStackParamList>;

const Stack = createNativeStackNavigator<FindIdStackParamList>();

const FindIdStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default FindIdStack;
