'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, SortAsc, SortDesc, X } from 'lucide-react';

interface FilterState {
  search: string;
  batch: string;
  department: string;
  category: string;
  level: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function SearchAndFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    batch: '',
    department: '',
    category: '',
    level: '',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const [showFilters, setShowFilters] = useState(false);

  const batches = [
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
  ];

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Design',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
  ];

  const categories = [
    'Web Development',
    'Mobile App',
    'Machine Learning',
    'Data Science',
    'IoT',
    'Robotics',
    'Research Paper',
    'Business Plan',
    'Design Project',
    'Hardware Project',
  ];

  const levels = ['Undergraduate', 'Graduate', 'PhD', 'Diploma'];

  const sortOptions = [
    { value: 'date', label: 'Date Created' },
    { value: 'title', label: 'Project Title' },
    { value: 'author', label: 'Author Name' },
    { value: 'department', label: 'Department' },
    { value: 'rating', label: 'Rating' },
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      batch: '',
      department: '',
      category: '',
      level: '',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== '' && value !== 'date' && value !== 'desc',
  ).length;

  return (
    <div className='mx-auto mt-12 max-w-6xl'>
      {/* Main Search Bar */}
      <div className='relative mb-8'>
        <div className='relative'>
          <Search className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
          <Input
            type='text'
            placeholder='Search projects by title, description, author, or keywords...'
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className='rounded-xl border-2 border-gray-200 py-4 pr-4 pl-12 text-lg focus:border-blue-500'
          />
        </div>
      </div>

      {/* Filter Toggle Button */}
      <div className='mb-6 flex items-center justify-between'>
        <Button
          variant='outline'
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2'
        >
          <Filter className='h-4 w-4' />
          Filters
          {activeFiltersCount > 0 && (
            <span className='ml-1 rounded-full bg-blue-500 px-2 py-1 text-xs text-white'>
              {activeFiltersCount}
            </span>
          )}
        </Button>

        <div className='flex items-center gap-4'>
          {activeFiltersCount > 0 && (
            <Button
              variant='ghost'
              onClick={clearFilters}
              className='text-gray-500'
            >
              <X className='mr-1 h-4 w-4' />
              Clear All
            </Button>
          )}

          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Sort by:</span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange('sortBy', value)}
            >
              <SelectTrigger className='w-40'>
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
              className='p-2'
            >
              {filters.sortOrder === 'asc' ? (
                <SortAsc className='h-4 w-4' />
              ) : (
                <SortDesc className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className='mb-8 rounded-xl border bg-gray-50 p-6'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {/* Batch Filter */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Batch Year
              </label>
              <Select
                value={filters.batch}
                onValueChange={(value) => handleFilterChange('batch', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select batch' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Batches</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Department
              </label>
              <Select
                value={filters.department}
                onValueChange={(value) =>
                  handleFilterChange('department', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select department' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Category
              </label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level Filter */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Academic Level
              </label>
              <Select
                value={filters.level}
                onValueChange={(value) => handleFilterChange('level', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select level' />
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

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className='mb-6 flex flex-wrap gap-2'>
          <span className='text-sm text-gray-600'>Active filters:</span>
          {filters.search && (
            <span className='flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
              Search: {filters.search}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('search', '')}
              />
            </span>
          )}
          {filters.batch && (
            <span className='flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800'>
              Batch: {filters.batch}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('batch', '')}
              />
            </span>
          )}
          {filters.department && (
            <span className='flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800'>
              Dept: {filters.department}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('department', '')}
              />
            </span>
          )}
          {filters.category && (
            <span className='flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800'>
              Category: {filters.category}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('category', '')}
              />
            </span>
          )}
          {filters.level && (
            <span className='flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-800'>
              Level: {filters.level}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('level', '')}
              />
            </span>
          )}
        </div>
      )}

      {/* Search Results Summary */}
      <div className='rounded-lg bg-gray-50 py-8 text-center'>
        <p className='text-gray-600'>
          Found{' '}
          <span className='font-semibold text-gray-900'>247 projects</span>{' '}
          matching your criteria
        </p>
        <Button className='mt-4' size='lg'>
          View Results
        </Button>
      </div>
    </div>
  );
}
