export interface ProjectFormData {
  // Basic Info
  title: string;
  author: string;
  email: string;
  batch: string;
  department: string;
  level: string;
  category: string;

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
  files: File[];

  // Additional
  isPublic: boolean;
  allowDownloads: boolean;
}
