import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Back from '../assets/svg/svg-back.svg';
import SignupScreen01 from './Signup/SignupScreen01';
import SignupScreen02 from './Signup/SignupScreen02';
import {useNavigation} from '@react-navigation/native';
import SignupScreen03 from './Signup/SignupScreen03';
import FindAddress from './Signup/FindAddress';
import SignupScreen04 from './Signup/SignupScreen04';

type LoginStackParamList = {
  Signup01: undefined;
  Signup02: undefined;
  Signup03: {address: string};
  FindAddress: undefined;
  Signup04: undefined;
};

export type LoginStackNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStack = () => {
  const navigation = useNavigation<LoginStackNavigationProp>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={SignupScreen01}
        name="Signup01"
        options={{
          headerLeft: () => (
            <TouchableOpacity style={styles.backBtn} onPress={() => {}}>
              <Back width="12" height="12" />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        component={SignupScreen02}
        name="Signup02"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                navigation.navigate('Signup01');
              }}>
              <Back width="12" height="12" />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        component={SignupScreen03}
        name="Signup03"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                navigation.navigate('Signup02');
              }}>
              <Back width="12" height="12" />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        component={FindAddress}
        name="FindAddress"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                navigation.navigate('Signup03', {address: ''});
              }}>
              <Back width="12" height="12" />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        component={SignupScreen04}
        name="Signup04"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    padding: 18,
    marginLeft: -12,
  },
});

export default LoginStack;
