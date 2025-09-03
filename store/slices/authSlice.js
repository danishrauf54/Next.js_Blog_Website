import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: null, // null = unknown, true/false = known
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    hydrateFromCookie: (state, action) => {
      // option to hydrate on _app via cookie check
      const { user, token } = action.payload || {};
      if (token) {
        state.user = user || null;
        state.token = token;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    }
  },
});

export const {
  loginRequest, loginSuccess, loginFailure,
  logoutRequest, logoutSuccess, logoutFailure,
  hydrateFromCookie
} = authSlice.actions;

export default authSlice.reducer;
