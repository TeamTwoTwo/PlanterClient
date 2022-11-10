import React, {useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import Navigator from './screens/Navigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <RecoilRoot>
      <Navigator />
    </RecoilRoot>
  );
};

export default App;
