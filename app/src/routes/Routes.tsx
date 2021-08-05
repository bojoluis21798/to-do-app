import React from 'react';
import {BackButton, Route} from 'react-router-native';

interface IRoute {
  path: string;
  screen: React.ReactNode;
  exact?: boolean;
}

const Routes: React.FunctionComponent<{routes: IRoute[]}> = ({routes}) => {
  return (
    <React.Fragment>
      <BackButton>
        {routes.map(route => (
          <Route exact={route?.exact} key={route.path} path={route.path}>
            {route.screen}
          </Route>
        ))}
      </BackButton>
    </React.Fragment>
  );
};

export default Routes;
