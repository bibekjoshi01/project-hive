export interface IBatch {
  id: number;
  year: number;
}

export interface IDepartment {
  id: number;
  name: string;
}

export enum ELevels {
  UNDERGRADUATE = 'Undergraduate',
  GRADUATE = 'Graduate',
  PHD = 'Phd',
  DIPLOMA = 'Diploma',
}

export interface ICategory {
  id: number;
  name: string;
  projectCount: number;
}

interface Response<T>{
  count: number;
  results: T[];
}

export type IDepartmentsResponse = Response<IDepartment>
export type ICategoriesResponse = Response<ICategory>
export type IBatchesResponse = Response<IBatch>

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

export interface ILevel {
  id: string;
  val: string;
}

export interface ProjectFormData {
  // Basic Info
  title: string;
  abstract: string;
  batch: IBatch;
  department: IDepartment;
  level: ILevel;
  category: ICategory;
  supervisor: string;
  teamMembers: TeamMember[];

  // Project Details
  description: string;
  objectives: string;
  features: string[];
  challenges: string;
  outcomes: string;

  // Technical Details
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  documentationUrl: string;
  files: IFile[];

  // Additional
  isPublic: boolean;
  allowDownloads: boolean;
}

