import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    logIn: state => {
      state.loggedIn = true;
    },
    logOut: state => {
      state.loggedIn = false;
    },
  },
});

export const {logIn, logOut} = loginSlice.actions;
export default loginSlice.reducer;
