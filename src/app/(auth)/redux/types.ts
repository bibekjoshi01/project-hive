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

export interface IProfileResponse {
  id: number;
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  photo?: string | null;
  dateJoined: string;
  userRole: string;
  bio: string;
}

export interface IProject {
  id: number;
  title: string;
  status: string;
  submittedAt: string;
  categoryName: string;
}

export interface IProjectList {
  count: number;
  results: IProject[];
}
