import { createSlice } from '@reduxjs/toolkit';
import Timer from 'components/Timer/Timer';
import authOperations from './auth-operations';

const initialState = {
  name: null,
  token: null,
  avatarGoogle: null,
  isLoggedIn: false,
  isLogging: false,
  loginError: null,
  trainingStatus: false,
  trainingStatusJustCompleted: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleLogIn(state, action) {
      state.token = action?.payload.token;
      state.name = action?.payload.name;
      state.avatarGoogle = action?.payload.avatar;
      state.isLoggedIn = true;
      state.isLogging = false;
      state.loginError = null;
    },
    setTrainingState(state, action) {

      if (action.payload === 'true') {
        state.trainingStatus = true;
      }
      if (action.payload === 'false') {
        state.trainingStatus = false;
      }
    },
    setTrainingStatusJustCompleted(state, action) {
      if (action.payload === 'false') {
        state.trainingStatusJustCompleted = 'false';
      }
      if (action.payload === 'completedByPages') {
        state.trainingStatusJustCompleted = 'completedByPages';
      }
      if (action.payload === 'completedByTime') {
        state.trainingStatusJustCompleted = 'completedByTime';
      }
    },
  },
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {},
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
      state.name = null;
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

export const { googleLogIn, setTrainingState, setTrainingStatusJustCompleted } = authSlice.actions;
export default authSlice.reducer;
