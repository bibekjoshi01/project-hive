export interface IAuthState {
  fullName: string;
  role: string;
  photo?: string;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated?: boolean;
  message?: string;
}

export interface ILoginFormDataType {
  email: string;
}
