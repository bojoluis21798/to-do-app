import React from 'react';
import Login from '../domain/login/Login';
import Register from '../domain/register/Register';

export default [
  {path: '/', exact: true, screen: <Login />},
  {path: '/register', screen: <Register />},
];
