import React from 'react';
import {Provider} from 'react-redux';
import store from './src/app/store';
import Login from './src/domain/login/Login';
import Routes from './src/routes/Routes';

const App = () => {
  const {logIn} = store.getState();
  return (
    <Provider store={store}>{logIn.loggedIn ? <Routes /> : <Login />}</Provider>
  );
};

export default App;
