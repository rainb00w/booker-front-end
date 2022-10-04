import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  name: null,
  token: null,
  avatarGoogle: null,
  isLoggedIn: false,
  isLogging: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleLogIn(state, action) {
      // console.log('auth slice', action.payload)
     state.token = action?.payload.token;
     state.name = action?.payload.name;
     state.avatarGoogle = action?.payload.avatar;
     state.isLoggedIn = true;
     state.isLogging = false;
     state.loginError = null;
    },
  },
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      // state.isLoggedIn = true;
    },
    [authOperations.logIn.pending](state) {
      state.loginError = null;
      state.isLogging = true;
    },
    [authOperations.logIn.rejected](state, action) {
      state.loginError = action.payload;
    },
    [authOperations.logIn.fulfilled](state, action) {
      // console.log('action payload !!!',action.payload);
      state.name = action?.payload.name;
      state.token = action?.payload.token;
      state.isLoggedIn = true;
      state.isLogging = false;
      state.loginError = null;
    },
    [authOperations.logOut.fulfilled](state) {
      state.name =  null;
      state.token = null;
      state.isLoggedIn = false;
    },
  
    // [authOperations.fetchCurrentUser.fulfilled](state, action) {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    //   // console.log('fetchCurrentUser SLICE', state.isLoggedIn);
    // },
  },
});


export const { googleLogIn } = authSlice.actions;
export default authSlice.reducer;
