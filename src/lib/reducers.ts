import { combineReducers } from '@reduxjs/toolkit';
import { rootAPI } from './apiSlice';

// Project Imports
import authReducer from "@/app/(public)/(auth)/redux/auth.slice"

export const rootReducer = combineReducers({
  auth: authReducer,
  // add reducers here
  [rootAPI.reducerPath]: rootAPI.reducer
});
