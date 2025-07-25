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

export interface TeamMember {
  id: string;
  fullName: string;
  rollNo: string;
  photo: File | null;
}

export interface IFile {
  id: string;
  type: string;
  file: string | null | File;
}

export interface ProjectFormData {
  // Basic Info
  title: string;
  abstract: string;
  batch: IBatch;
  department: IDepartment;
  level: ELevels;
  category: ICategory;
  supervisor: string;
  teamMembers: TeamMember[];

  // Project Details
  description: string;

  // Technical Details
  technologies: string[];
  githubUrl: string;
  documentationUrl: string;
  files: IFile[];

  // Additional
  isPublic: boolean;
  allowDownloads: boolean;
}
