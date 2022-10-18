import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color} from '../utils/utils';
import HomeScreen from '../screens/Matching/HomeScreen';
import Matching from '../assets/icon/ic-focused-matching.svg';
import History from '../assets/icon/ic-history.svg';
import Community from '../assets/icon/ic-community.svg';
import MyPage from '../assets/icon/ic-mypage.svg';
import {StyleSheet} from 'react-native';

type MainTabParamList = {
  HomeScreen: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="매칭"
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
        name="매칭"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Matching name="매칭" size={24} />,
        }}
      />
      <Tab.Screen
        name="매칭 내역"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <History name="매칭 내역" size={24} />,
        }}
      />
      <Tab.Screen
        name="커뮤니티"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Community name="커뮤니티" size={24} />,
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <MyPage name="마이페이지" size={24} />,
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
