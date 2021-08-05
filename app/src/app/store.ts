import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../domain/login/loginSlice';

export default configureStore({
  reducer: {logIn: loginReducer},
});
