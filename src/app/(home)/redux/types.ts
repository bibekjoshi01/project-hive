interface StatsType {
  departments: number;
  categories: number;
  batches: number;
  projects: number;
}

interface CategoryResponse {
  id: number;
  name: string;
  projectCount: number;
}

interface CategoryList {
  count: number;
  results: CategoryResponse[];
}
