import React from 'react';
import {Provider} from 'react-redux';
import store from './src/app/store';
import Routes from './src/routes/Routes';

import authRoutes from './src/routes/authRoutes';
import nonAuthRoutes from './src/routes/nonAuthRoutes';
import {NativeRouter} from 'react-router-native';

const App = () => {
  const {logIn} = store.getState();
  return (
    <Provider store={store}>
      <NativeRouter>
        {logIn.loggedIn ? (
          <Routes routes={authRoutes} />
        ) : (
          <Routes routes={nonAuthRoutes} />
        )}
      </NativeRouter>
    </Provider>
  );
};

export default App;
