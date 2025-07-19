'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import NoResultsFound from './no-results-found';
import ProjectCard from './project-card';
import SearchAndFilters from './search-and-filters';
import { useGetProjectsQuery } from './redux/project.api';
import { FilterState } from './redux/types';

export default function BrowseProjects() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    limit: 10,
    offset: 0,
    sortBy: 'submitted_at',
    sortOrder: 'desc',
  });

  const [showFilters, setShowFilters] = useState(false);

  const apiQueryParams = {
    search: filters.search || '',
    department: filters.department || '',
    batch: filters.batch || '',
    category: filters.category || '',
    level: filters.level || '',
    ordering:
      (filters.sortOrder === 'desc' ? '-' : '') +
      (filters.sortBy === 'submitted_at' ? 'submitted_at' : filters.sortBy),
    limit: filters.limit,
    offset: filters.offset,
  };

  // --- Fetch projects from API with filters ---
  const { data: projectList, isLoading } = useGetProjectsQuery(apiQueryParams);

  // --- Sync URL parameters to state ---
  useEffect(() => {
    const rawSortOrder = searchParams.get('sortOrder');
    const validSortOrder =
      rawSortOrder === 'asc' || rawSortOrder === 'desc' ? rawSortOrder : 'desc';

    const urlFilters: FilterState = {
      search: searchParams.get('search') || '',
      limit: parseInt(searchParams.get('limit') || '10', 10),
      offset: parseInt(searchParams.get('offset') || '0', 10),
      sortBy: searchParams.get('sortBy') || 'submitted_at',
      sortOrder: validSortOrder,
    };

    setFilters(urlFilters);

    const hasActiveFilters = Object.values(urlFilters).some(
      (value) => value !== '' && value !== 'submitted_at' && value !== 'desc',
    );
    setShowFilters(hasActiveFilters);
  }, [searchParams]);

  // --- Update URL query string ---
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (
          value &&
          value !== '' &&
          !(key === 'sortBy' && value === 'submitted_at') &&
          !(key === 'sortOrder' && value === 'desc')
        ) {
          params.set(key, String(value));
        }
      });

      const newURL = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;

      router.replace(newURL, { scroll: false });
    },
    [router],
  );

  // --- Filter change handler ---
  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number,
  ) => {
    const newFilters = { ...filters, [key]: value, offset: 0 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      limit: 10,
      department: '',
      batch: '',
      level: '',
      category: '',
      offset: 0,
      sortBy: 'submitted_at',
      sortOrder: 'desc',
    };
    setFilters(defaultFilters);
    updateURL(defaultFilters);
  };

  const toggleSortOrder = () => {
    const newSortOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
    const newFilters = { ...filters, sortOrder: newSortOrder, offset: 0 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleRemoveFilter = (key: keyof FilterState) => {
    const newFilters = {
      ...filters,
      [key]:
        key === 'sortBy' ? 'submitted_at' : key === 'sortOrder' ? 'desc' : '',
      offset: 0,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const showMoreProjects = () => {
    const newOffset = filters.offset + filters.limit / 2;
    const newFilters = { ...filters, offset: newOffset };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== '' && value !== 'submitted_at' && value !== 'desc',
  ).length;

  return (
    <div className='mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8'>
      <SearchAndFilters
        filters={filters}
        showFilters={showFilters}
        handleFilterChange={handleFilterChange}
        setShowFilters={setShowFilters}
        activeFiltersCount={activeFiltersCount}
        toggleSortOrder={toggleSortOrder}
        clearFilters={clearFilters}
      />

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className='mb-6 flex flex-wrap items-center gap-2'>
          <span className='text-sm text-gray-600'>Active filters:</span>
          {['search', 'batch', 'department', 'category', 'level'].map((key) => {
            const value = filters[key as keyof FilterState];
            return (
              value && (
                <Badge
                  key={key}
                  variant='secondary'
                  className='flex items-center gap-1'
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleRemoveFilter(key as keyof FilterState)}
                  />
                </Badge>
              )
            );
          })}
        </div>
      )}

      {/* Results Summary */}
      <div className='mb-6 flex items-center justify-between'>
        <p className='text-gray-600'>
          Found&nbsp;
          <span className='font-semibold text-gray-900'>
            {projectList?.count ?? 0}
          </span>
          &nbsp;projects matching your criteria
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {projectList?.results?.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>

      {/* Show More Button */}
      {projectList && filters.offset + filters.limit < projectList.count && (
        <div className='mt-8 text-center'>
          <Button
            onClick={showMoreProjects}
            variant='outline'
            size='lg'
            className='my-8 cursor-pointer'
          >
            Show More Projects
          </Button>
          <p className='mt-2 text-sm text-gray-500'>
            Showing {filters.offset + filters.limit} of {projectList.count}{' '}
            projects
          </p>
        </div>
      )}

      {/* No Results */}
      {!isLoading && projectList?.results?.length === 0 && (
        <NoResultsFound clearFilters={clearFilters} />
      )}
    </div>
  );
}
