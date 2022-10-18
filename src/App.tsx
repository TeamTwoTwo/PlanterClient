import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginStack from './screens/LoginStack';
import {RecoilRoot} from 'recoil';
import RootStack from './screens/RootStack';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
