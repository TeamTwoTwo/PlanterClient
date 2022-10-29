import React from 'react';
import {RecoilRoot} from 'recoil';
import Navigator from './screens/Navigator';

const App = () => {
  return (
    <RecoilRoot>
      <Navigator />
    </RecoilRoot>
  );
};

export default App;
