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
import History from '../assets/icon/ic-history.svg';
import Community from '../assets/icon/ic-community.svg';
import MyPage from '../assets/icon/ic-mypage.svg';
import {StyleSheet} from 'react-native';
import {RootStackNavigationProp} from './RootStack';

type MainTabParamList = {
  Matching: undefined;
  MatchingHistory: undefined;
  Community: undefined;
  Mypage: undefined;
};

export type MainTabNavigationProp = CompositeNavigationProp<
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
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <FocusedHistory /> : <History />,
          title: '매칭 내역',
        }}
      />
      <Tab.Screen
        name="Community"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Community />,
          title: '커뮤니티',
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <MyPage />,
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
