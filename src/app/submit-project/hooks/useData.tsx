import { ELevels } from '../types';
import {
  useGetBatchesQuery,
  useGetProjectCategoriesQuery,
  useGetDepartmentsQuery,
} from '../redux/api.project';

export const useData = () => {
  const { data: batches, isLoading: batchLoading } = useGetBatchesQuery();
  const { data: departments, isLoading: departmentLoading } =
    useGetDepartmentsQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetProjectCategoriesQuery();

  const levels = ELevels;

  return {
    batches: batches?.results || [],
    departments: departments?.results || [],
    categories: categories?.results || [],
    levels,
    loading: batchLoading || departmentLoading || categoriesLoading,
  };
};
