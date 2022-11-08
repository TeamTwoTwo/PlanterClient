import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ExpertDetailScreen from './ExpertDetail/ExpertDetailScreen';
import MainTab from './MainTab';
import LocationScreen from '../screens/Matching/LocationScreen';
import ReviewDetailScreen from './ExpertDetail/ReviewDetailScreen';
import MatchingHistoryDetailScreen from './MatchingHistory/MatchingHistoryDetailScreen';
import ReviewStarScreen from './MatchingHistory/ReviewStarScreen';
import MatchingRequestScreen02 from './MatchingRequest/MatchingRequestScreen02';
import MatchingRequestScreen01 from './MatchingRequest/MatchingRequestScreen01';
import MatchingRequestScreen03 from './MatchingRequest/MatchingRequestScreen03';

type RootStackParamList = {
  MainTab: undefined;
  LocationScreen: undefined;
  ExpertDetailScreen: undefined;
  ReviewDetailScreen: undefined;
  MatchingHistoryDetailScreen: {
    type: string;
  };
  ReviewStarScreen: undefined;
  MatchingRequestScreen01: undefined;
  MatchingRequestScreen02: undefined;
  MatchingRequestScreen03: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="ExpertDetailScreen" component={ExpertDetailScreen} />
      <Stack.Screen name="ReviewDetailScreen" component={ReviewDetailScreen} />
      <Stack.Screen
        name="MatchingHistoryDetailScreen"
        component={MatchingHistoryDetailScreen}
      />
      <Stack.Screen name="ReviewStarScreen" component={ReviewStarScreen} />
      <Stack.Screen
        name="MatchingRequestScreen01"
        component={MatchingRequestScreen01}
      />
      <Stack.Screen
        name="MatchingRequestScreen02"
        component={MatchingRequestScreen02}
      />
      <Stack.Screen
        name="MatchingRequestScreen03"
        component={MatchingRequestScreen03}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
