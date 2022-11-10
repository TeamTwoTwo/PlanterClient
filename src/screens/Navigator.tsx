import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {LoginStatusState} from '../recoil/atoms/loginStatus';
import LoginStack from './LoginStack';
import RootStack from './RootStack';
import {NavigationContainer} from '@react-navigation/native';
import {getData} from '../utils/AsyncStorage';

const Navigator = () => {
  const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusState);

  // 앱 껐다 켰을 때 토큰이 남아있다면 자동로그인
  useEffect(() => {
    getData('auth').then(res => {
      console.log(res);
      if (res !== undefined) {
        setLoginStatus({isLogined: true});
      }
    });
  }, [setLoginStatus]);

  return (
    <NavigationContainer>
      {loginStatus.isLogined ? <RootStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Navigator;
