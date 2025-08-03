'use client';

import type React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, SortAsc, SortDesc, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterState } from './redux/types';
import {
  useGetProjectBatchYearsQuery,
  useGetProjectCategoriesQuery,
  useGetProjectDepartmentsQuery,
} from './redux/project.api';

interface SearchAndFiltersProps {
  filters: FilterState;
  showFilters: boolean;
  handleFilterChange: (key: keyof FilterState, value: string) => void;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  activeFiltersCount: number;
  toggleSortOrder: () => void;
  clearFilters: () => void;
}

export const sortOptions = [
  { value: 'submitted_at', label: 'Published Date' },
  { value: 'title', label: 'Project Title' },
  { value: 'avg_rating', label: 'Rating' },
];

export const levels = ['Bachelors', 'Masters', 'PHD'];

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  showFilters,
  handleFilterChange,
  setShowFilters,
  activeFiltersCount,
  toggleSortOrder,
  clearFilters,
}) => {
  const { data: categoryData } = useGetProjectCategoriesQuery();
  const { data: departmentData } = useGetProjectDepartmentsQuery();
  const { data: batchYearData } = useGetProjectBatchYearsQuery();

  return (
    <>
      {/* Search Bar and Controls Row */}
      <div className='mb-4 sm:mb-6'>
        <div className='flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-6'>
          {/* Search Bar */}
          <div className='relative flex-1'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 sm:left-4 sm:h-5 sm:w-5' />
            <Input
              type='text'
              placeholder='Search projects...'
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className='h-10 rounded-lg border-1 border-gray-200 pr-3 pl-10 text-sm focus:border-black focus:shadow-none focus:ring-0 focus:outline-none sm:h-12 sm:pr-4 sm:pl-12 sm:text-base'
            />
          </div>

          {/* Controls */}
          <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
            {/* Filter Toggle */}
            <Button
              variant='outline'
              onClick={() => setShowFilters(!showFilters)}
              className='flex h-10 cursor-pointer items-center gap-2 rounded-lg border-1 border-gray-200 px-3 text-sm focus:border-black focus:shadow-none focus:ring-0 focus:outline-none sm:h-12 sm:px-4 sm:text-base'
            >
              <Filter className='h-4 w-4' />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge
                  variant='default'
                  className='ml-1 h-4 w-4 rounded-full p-0 text-xs sm:h-5 sm:w-5'
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Sort Controls */}
            <div className='flex items-center gap-2'>
              <span className='hidden text-xs text-gray-600 sm:text-sm lg:inline'>
                Sort:
              </span>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value)}
              >
                <SelectTrigger className='h-10 w-full cursor-pointer rounded-lg border-1 border-gray-200 text-sm focus:border-gray-800 focus:shadow-none focus:ring-0 focus:outline-none'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant='outline'
                size='sm'
                onClick={toggleSortOrder}
                className='h-10 w-10 cursor-pointer rounded-lg border-1 border-gray-200 bg-transparent p-0 focus:border-black focus:shadow-none focus:ring-0 focus:outline-none sm:h-12 sm:w-12'
              >
                {filters.sortOrder === 'asc' ? (
                  <SortAsc className='h-4 w-4' />
                ) : (
                  <SortDesc className='h-4 w-4' />
                )}
              </Button>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant='ghost'
                onClick={clearFilters}
                className='h-10 w-full cursor-pointer rounded-lg border-1 border-transparent px-2 text-gray-500 hover:border-gray-200 focus:border-black focus:shadow-none focus:ring-0 focus:outline-none sm:h-12 sm:w-auto sm:px-3'
              >
                <X className='mr-1 h-4 w-4' />
                <span>Clear All</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className='mb-6 rounded-lg border-1 border-gray-200 bg-gray-50/50 p-6'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Batch Filter */}
            <div className='w-full'>
              <Select
                value={filters.batch}
                onValueChange={(value) =>
                  handleFilterChange('batch', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className='h-12 w-full rounded-lg border-1 border-gray-200 focus:border-black focus:shadow-none focus:ring-0 focus:outline-none'>
                  <SelectValue placeholder='All Batches' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Batches</SelectItem>
                  {batchYearData?.results?.map((batch) => (
                    <SelectItem key={batch.id} value={String(batch.id)}>
                      {batch.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div className='w-full'>
              <Select
                value={filters.department}
                onValueChange={(value) =>
                  handleFilterChange('department', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className='h-12 w-full rounded-lg border-1 border-gray-200 focus:border-black focus:shadow-none focus:ring-0 focus:outline-none'>
                  <SelectValue placeholder='All Departments' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Departments</SelectItem>
                  {departmentData?.results.map((dept) => (
                    <SelectItem key={dept.id} value={String(dept.id)}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className='w-full'>
              <Select
                value={filters.category}
                onValueChange={(value) =>
                  handleFilterChange('category', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className='h-12 w-full rounded-lg border-1 border-gray-200 focus:border-black focus:shadow-none focus:ring-0 focus:outline-none'>
                  <SelectValue placeholder='All Categories' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Categories</SelectItem>
                  {categoryData?.results.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level Filter */}
            <div className='w-full'>
              <Select
                value={filters.level}
                onValueChange={(value) =>
                  handleFilterChange('level', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className='h-12 w-full rounded-lg border-1 border-gray-200 focus:border-black focus:shadow-none focus:ring-0 focus:outline-none'>
                  <SelectValue placeholder='All Levels' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Levels</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAndFilters;
