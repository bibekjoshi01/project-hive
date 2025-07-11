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
  batch: string;
  department: string;
  level: string;
  category: string;
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
