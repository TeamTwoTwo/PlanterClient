import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ExpertDetailScreen from './ExpertDetail/ExpertDetailScreen';

type RootStackParamList = {
  ExpertDetailScreen: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ExpertDetailScreen}
        name="ExpertDetailScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
