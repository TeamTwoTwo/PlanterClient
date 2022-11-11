import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {color} from '../utils/utils';
import HomeScreen from '../screens/Matching/HomeScreen';
import Matching from '../assets/icon/ic-matching.svg';
import FocusedMatching from '../assets/icon/ic-focused-matching.svg';
import FocusedHistory from '../assets/icon/ic-focused-history.svg';
import FocusedMypage from '../assets/icon/ic-focused-mypage.svg';
import History from '../assets/icon/ic-history.svg';
import Community from '../assets/icon/ic-community.svg';
import MyPage from '../assets/icon/ic-mypage.svg';
import {StyleSheet} from 'react-native';
import {RootStackNavigationProp} from './RootStack';
import {LoginStackNavigationProp} from './LoginStack';
import MatchingHistoryListScreen from './MatchingHistory/MatchingHistoryListScreen';
import MyPageScreen from './MyPage/MyPageScreen';

type MainTabParamList = {
  Matching: undefined;
  MatchingHistory: undefined;
  Mypage: undefined;
};

export type MainTabNavigationProp = CompositeNavigationProp<
  LoginStackNavigationProp,
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;

export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Matching"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.blueGray_06,
        tabBarInactiveTintColor: color.blueGray_03,
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 10,
          lineHeight: 12,
          letterSpacing: -0.01,
        },
      }}>
      <Tab.Screen
        name="Matching"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <FocusedMatching /> : <Matching />,
          title: '매칭',
        }}
      />
      <Tab.Screen
        name="MatchingHistory"
        component={MatchingHistoryListScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <FocusedHistory /> : <History />,
          title: '매칭 내역',
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({focused}) => (focused ? <FocusedMypage /> : <MyPage />),
          title: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default MainTab;
