import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import FirstScreen from './FindID/FirstScreen';
import IdDoneScreen from './FindID/IdDoneScreen';

type FindStackParamList = {
  FirstScreen: undefined;
};

export type FindStackNavigationProp =
  NativeStackNavigationProp<FindStackParamList>;

const Stack = createNativeStackNavigator<FindStackParamList>();

const FindStack = () => {
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

export default FindStack;
