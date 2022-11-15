import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ExpertDetailScreen from './ExpertDetail/ExpertDetailScreen';
import MainTab from './MainTab';
import LocationScreen from '../screens/Matching/LocationScreen';
import MessageScreen from '../screens/Message/MessageScreen';
import MessageDetailScreen from '../screens/Message/MessageDetailScreen';
import WriteScreen from '../screens/Message/WriteScreen';
import ReviewDetailScreen from './ExpertDetail/ReviewDetailScreen';
import MatchingHistoryDetailScreen from './MatchingHistory/MatchingHistoryDetailScreen';
import ReviewStarScreen from './MatchingHistory/ReviewStarScreen';
import MatchingRequestScreen02 from './MatchingRequest/MatchingRequestScreen02';
import MatchingRequestScreen01 from './MatchingRequest/MatchingRequestScreen01';
import MatchingRequestScreen03 from './MatchingRequest/MatchingRequestScreen03';
import MatchingRequestScreen04 from './MatchingRequest/MatchingRequestScreen04';
import ReviewWriteScreen from './Review/ReviewWriteScreen';
import DropOutScreen from './MyPage/DropOutScreen';
import ProfileScreen from './MyPage/ProfileScreen';
import TOSDetail from './Signup/TOSDetail';

type RootStackParamList = {
  MainTab: undefined;
  LocationScreen: undefined;
  ExpertDetailScreen: {plantManagerId: number};
  MessageScreen: {type: string};
  MessageDetailScreen: {
    plantManagerId: number;
    name: string;
    type: string;
  };
  WriteScreen: {
    plantManagerId: number;
    type: string;
  };
  ReviewDetailScreen: {plantManagerId: number};
  MatchingHistoryDetailScreen: {
    matchingId: number;
  };
  ReviewStarScreen: {
    matchingId: number;
    name: string;
    profileImg: string;
  };
  ReviewWriteScreen: {
    matchingId: number;
    rating: number;
  };
  MatchingRequestScreen01: {plantManagerId: number};
  DropOutScreen: undefined;
  ProfileScreen: undefined;
  TOSDetail: {number: number};
  MatchingRequestScreen02: undefined;
  MatchingRequestScreen03: undefined;
  MatchingRequestScreen04: undefined;
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
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen
        name="MessageDetailScreen"
        component={MessageDetailScreen}
      />
      <Stack.Screen name="WriteScreen" component={WriteScreen} />
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
      <Stack.Screen
        name="MatchingRequestScreen04"
        component={MatchingRequestScreen04}
      />
      <Stack.Screen name="ReviewWriteScreen" component={ReviewWriteScreen} />
      <Stack.Screen name="DropOutScreen" component={DropOutScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="TOSDetail" component={TOSDetail} />
    </Stack.Navigator>
  );
};

export default RootStack;
