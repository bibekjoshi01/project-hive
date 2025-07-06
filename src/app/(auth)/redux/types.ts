export interface IRole {
  id: number;
  name: string;
  codename: string;
}

export interface IAuthState {
  fullName: string;
  email: string;
  phoneNo: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: IRole[] | [];
  isSuperuser: boolean;
  photo?: string;
  tokens?: {
    access: string;
    refresh: string;
  };
  isAuthenticated?: boolean;
  authVerificationEmailSent?: boolean;
  forgetPasswordEmailSent?: boolean;
  message?: string;
}

export interface ILoginFormDataType {
  email: string;
  password: string;
}
