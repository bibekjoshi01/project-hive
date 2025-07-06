import Cookies from 'js-cookie';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './types';

const initialState: IAuthState = {
  fullName: '',
  email: '',
  phoneNo: '',
  isEmailVerified: false,
  isPhoneVerified: false,
  roles: [],
  photo: '',
  isSuperuser: false,
  isAuthenticated: false,
  authVerificationEmailSent: false,
  forgetPasswordEmailSent: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IAuthState>) => {
      const {
        payload: {
          fullName,
          email,
          photo,
          phoneNo,
          tokens,
          isEmailVerified,
          isPhoneVerified,
          isSuperuser,
          roles,
        },
      } = action;

      state.fullName = fullName;
      state.email = email;
      state.photo = photo;
      state.phoneNo = phoneNo;
      state.isEmailVerified = isEmailVerified;
      state.isPhoneVerified = isPhoneVerified;
      state.isSuperuser = isSuperuser;
      state.roles = roles;
      state.isAuthenticated = true;
      // Save access and refresh tokens in the cookies
      Cookies.set('access', tokens?.access as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
      Cookies.set('refresh', tokens?.refresh as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
      Cookies.set('logout', 'false');
    },
    logoutSuccess: (state) => {
      Cookies.remove('access', { path: '/' });
      Cookies.remove('refresh', { path: '/' });
      Cookies.set('logout', 'true');
      // Reset the state to initialState
      return initialState;
    },
    checkAuthStatus: (state) => {
      const accessToken = Cookies.get('access');
      const logoutFlag = Cookies.get('logout');

      if (!accessToken || logoutFlag === 'true') {
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
