export interface IBatch {
  id: number;
  year: number;
}

export interface IDepartment {
  id: number;
  name: string;
}

export enum ELevels {
  Masters = 'Masters',
  Bachelors = 'Bachelors',
  PHD = 'PHD',
}

export interface ICategory {
  id: number;
  name: string;
  projectCount: number;
}

interface Response<T> {
  count: number;
  results: T[];
}

export type IDepartmentsResponse = Response<IDepartment>;
export type ICategoriesResponse = Response<ICategory>;
export type IBatchesResponse = Response<IBatch>;
