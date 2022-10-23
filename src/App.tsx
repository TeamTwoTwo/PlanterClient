import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginStack from './screens/LoginStack';
import RootStack from './screens/RootStack';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        {/* <LoginStack /> */}
        <RootStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
