import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {LoginStatusState} from '../recoil/atoms/loginStatus';
import LoginStack from './LoginStack';
import RootStack from './RootStack';
import {NavigationContainer} from '@react-navigation/native';

const Navigator = () => {
  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusState);

  return (
    <NavigationContainer>
      {loginStatus.isLogined ? <RootStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Navigator;
