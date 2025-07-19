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
