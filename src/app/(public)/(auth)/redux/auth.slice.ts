import Cookies from 'js-cookie';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './types';
import {
  PUBLIC_ACCESS_TOKEN,
  PUBLIC_REFRESH_TOKEN,
} from '@/constants/public/tokens';

const initialState: IAuthState = {
  fullName: '',
  role: '',
  photo: '',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IAuthState>) => {
      const {
        payload: { fullName, photo, accessToken, refreshToken, role },
      } = action;

      state.fullName = fullName;
      state.photo = photo;
      state.role = role;
      state.isAuthenticated = true;
      // Save access and refresh tokens in the cookies
      Cookies.set(PUBLIC_ACCESS_TOKEN, accessToken as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
      Cookies.set(PUBLIC_REFRESH_TOKEN, refreshToken as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
    },
    logoutSuccess: (state) => {
      Cookies.remove(PUBLIC_ACCESS_TOKEN, { path: '/' });
      Cookies.remove(PUBLIC_REFRESH_TOKEN, { path: '/' });
      // Reset the state to initialState
      return initialState;
    },
    checkAuthStatus: (state) => {
      const accessToken = Cookies.get(PUBLIC_ACCESS_TOKEN);

      if (!accessToken) {
        // No valid token, reset authentication state
        return initialState;
      }

      // Keep the current state if token exists
      return state;
    },
  },
});

export const { loginSuccess, logoutSuccess, checkAuthStatus } =
  authSlice.actions;

export default authSlice.reducer;
