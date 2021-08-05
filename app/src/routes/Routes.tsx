import React from 'react';
import {NativeRouter, Route} from 'react-router-native';
import routeConfig from './routeConfig';

const Routes: React.FunctionComponent = () => {
  return (
    <NativeRouter>
      {routeConfig.map(route => (
        <Route key={route.key} path={route.path}>
          {route.screen}
        </Route>
      ))}
    </NativeRouter>
  );
};

export default Routes;
