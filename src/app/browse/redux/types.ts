export interface ICategoryOut {
  id: number;
  name: string;
}

export interface ICategoryList {
  count: number;
  results: ICategoryOut[];
}

export interface IDepartmentOut {
  id: number;
  name: string;
}

export interface IDepartmentList {
  count: number;
  results: IDepartmentOut[];
}

export interface IBatchYearOut {
  id: number;
  year: number;
}

export interface IBatchYearList {
  count: number;
  results: IBatchYearOut[];
}

export interface IProjectResponse {
  id: number;
  title: string;
  abstract: string;
  level: string;
  supervisor: string;
  technologiesUsed: string;
  githubLink?: string;
  documentationLink?: string;
  status: string;
  submittedAt: string;
  category: ICategoryOut;
  department: IDepartmentOut;
  submittedByFullName: string;
  batchYear: IBatchYearOut;
  ratingAverage: number;
  views: number;
}

export interface IProjectList {
  count: number;
  results: IProjectResponse[];
}

export interface FilterState {
  search: string;
  category?: string;
  department?: string;
  batch?: string;
  level?: string;
  sortBy: string;
  sortOrder: string;
  limit: number;
  offset: number;
}

export interface ITeamMember {
  id: number;
  fullName: string;
  rollNo: string;
  photo?: string;
}

export interface IProjectFile {
  id: number;
  type: string;
  file: string;
}

export interface IProjectDetail {
  id: number;
  title: string;
  abstract: string;
  description: string; 
  batch: string; 
  department: string;
  level: string;
  category: string; 
  supervisor: string;
  teamMembers: ITeamMember[];
  submittedBy: string;
  technologies: string[]; 
  githubLinks: string[]; 
  documentationUrl?: string; 
  files: IProjectFile[];
  submittedDate: string; 
  views: number;
  rating: number; 
  totalRatings: number; 
}
