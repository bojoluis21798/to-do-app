import React from 'react';
import {Provider} from 'react-redux';
import store from './src/app/store';
import Routes from './src/routes/Routes';

import authRoutes from './src/routes/authRoutes';
import nonAuthRoutes from './src/routes/nonAuthRoutes';
import {NativeRouter} from 'react-router-native';
import {ThemeProvider} from 'styled-components/native';
import {useColorScheme} from 'react-native';
import LightTheme, {DarkTheme} from './src/theme/Theme';

const App = () => {
  const {logIn} = store.getState();
  const colorScheme = useColorScheme();

  const currentTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={currentTheme}>
        <NativeRouter>
          {logIn.loggedIn ? (
            <Routes routes={authRoutes} />
          ) : (
            <Routes routes={nonAuthRoutes} />
          )}
        </NativeRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
