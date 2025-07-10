export interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  department: string;
  batch: string;
  category: string;
  slug: string;
  level: string;
  rating: number;
  views: number;
  downloads: number;
  date: string;
  tags: string[];
}

export interface FilterState {
  search: string;
  batch: string;
  department: string;
  category: string;
  level: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc' | string;
}
