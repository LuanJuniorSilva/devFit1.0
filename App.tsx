import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {NavigationContainer} from '@react-navigation/native';

import {store, persistor} from './src/redux/store';
import MainStack from './src/navigators/MainStack';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
