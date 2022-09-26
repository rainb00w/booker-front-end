import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLogging: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.pending](state) {
      state.loginError = null;
      state.isLogging = true;
    },
    [authOperations.logIn.rejected](state, action) {
      state.loginError = action.payload;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action?.payload.user;
      state.token = action?.payload.token;
      state.isLoggedIn = true;
      state.isLogging = false;
      state.loginError = null;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
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

export default authSlice.reducer;
