import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginStack from './screens/LoginStack';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
