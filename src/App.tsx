/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FindIdStack from './screens/FindIdStack';
import FindPwStack from './screens/FindPwStack';

const App = () => {
  return (
    <NavigationContainer>
      {/* <FindIdStack /> */}
      <FindPwStack />
    </NavigationContainer>
  );
};

export default App;
