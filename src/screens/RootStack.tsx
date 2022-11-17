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
import AlarmScreen from './MyPage/AlarmScreen';
import ClientCenterScreen from './MyPage/ClientCenterScreen';
import InquiryWriteScreen from './MyPage/InquiryWriteScreen';
import InquiryHistoryScreen from './MyPage/InquiryHistoryScreen';
import InquiryDetailScreen from './MyPage/InquiryDetailScreen';
import EnterStoreScreen from './MyPage/EnterStoreScreen';
import NoticeScreen from './MyPage/NoticeScreen';
import NoticeDetailScreen from './MyPage/NoticeDetailScreen';
import SettingScreen from './MyPage/SettingScreen';
import ProfileEditScreen from './MyPage/ProfileEditScreen';
import ReportScreen from './ExpertDetail/ReportScreen';
import AddressScreen from '../screens/Matching/AddressScreen';

type RootStackParamList = {
  MainTab: undefined;
  LocationScreen: {
    simpleAddress: string;
    locationAddress: string;
    userId: number;
  };
  AddressScreen: undefined;
  ExpertDetailScreen: {plantManagerId: number};
  MessageScreen: {type?: string};
  MessageDetailScreen: {
    plantManagerId: number;
    name: string;
    type: string;
    matchingId?: number;
  };
  WriteScreen: {
    plantManagerId: number;
    type: string;
    matchingId?: number;
  };
  ReviewDetailScreen: {plantManagerId: number};
  MatchingHistoryDetailScreen: {
    matchingId: number;
    type?: number;
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
  AlarmScreen: undefined;
  ClientCenterScreen: undefined;
  InquiryWriteScreen: undefined;
  InquiryHistoryScreen: undefined;
  InquiryDetailScreen: undefined;
  EnterStoreScreen: undefined;
  NoticeScreen: undefined;
  NoticeDetailScreen: undefined;
  SettingScreen: undefined;
  ProfileEditScreen: {nickname: string};
  ReportScreen: {plantManagerId: number; name: string};
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
      <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
      <Stack.Screen name="ClientCenterScreen" component={ClientCenterScreen} />
      <Stack.Screen name="InquiryWriteScreen" component={InquiryWriteScreen} />
      <Stack.Screen
        name="InquiryHistoryScreen"
        component={InquiryHistoryScreen}
      />
      <Stack.Screen
        name="InquiryDetailScreen"
        component={InquiryDetailScreen}
      />
      <Stack.Screen name="EnterStoreScreen" component={EnterStoreScreen} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="NoticeDetailScreen" component={NoticeDetailScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
