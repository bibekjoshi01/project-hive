'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { projects } from './data';
import type { FilterState } from './types';
import NoResultsFound from './no-results-found';
import ProjectCard from './project-card';
import SearchAndFilters from './search-and-filters';

export default function BrowseProjects() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const [visibleProjects, setVisibleProjects] = useState(10);

  // Initialize filters from URL params on component mount
  useEffect(() => {
    const rawSortOrder = searchParams.get('sortOrder');
    const validSortOrder =
      rawSortOrder === 'asc' || rawSortOrder === 'desc' ? rawSortOrder : 'desc';

    const urlFilters: FilterState = {
      search: searchParams.get('search') || '',
      batch: searchParams.get('batch') || '',
      department: searchParams.get('department') || '',
      category: searchParams.get('category') || '',
      level: searchParams.get('level') || '',
      sortBy: searchParams.get('sortBy') || 'date',
      sortOrder: validSortOrder, 
    };

    setFilters(urlFilters);

    // Show filters panel if any filters are active
    const hasActiveFilters = Object.values(urlFilters).some(
      (value) => value !== '' && value !== 'date' && value !== 'desc',
    );
    if (hasActiveFilters) {
      setShowFilters(true);
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();

      // Only add non-empty values to URL
      Object.entries(newFilters).forEach(([key, value]) => {
        if (
          value &&
          value !== '' &&
          !(key === 'sortBy' && value === 'date') &&
          !(key === 'sortOrder' && value === 'desc')
        ) {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const newURL = queryString ? `?${queryString}` : window.location.pathname;

      router.replace(newURL, { scroll: false });
    },
    [router],
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);

    // Reset visible projects when filters change
    setVisibleProjects(10);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      batch: '',
      department: '',
      category: '',
      level: '',
      sortBy: 'date',
      sortOrder: 'desc',
    };
    setFilters(defaultFilters);
    updateURL(defaultFilters);
    setVisibleProjects(10);
  };

  const toggleSortOrder = () => {
    const newSortOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
    const newFilters = { ...filters, sortOrder: newSortOrder };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== '' && value !== 'date' && value !== 'desc',
  ).length;

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      if (
        filters.search &&
        !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        !project.author.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.tags.some((tag) =>
          tag.toLowerCase().includes(filters.search.toLowerCase()),
        )
      ) {
        return false;
      }
      if (filters.batch && project.batch !== filters.batch) return false;
      if (filters.department && project.department !== filters.department)
        return false;
      if (filters.category && project.category !== filters.category)
        return false;
      if (filters.level && project.level !== filters.level) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (filters.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case 'department':
          aValue = a.department.toLowerCase();
          bValue = b.department.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'views':
          aValue = a.views;
          bValue = b.views;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 10, filteredProjects.length));
  };

  const handleRemoveFilter = (key: keyof FilterState) => {
    const newFilters = {
      ...filters,
      [key]: key === 'sortBy' ? 'date' : key === 'sortOrder' ? 'desc' : '',
    };
    setFilters(newFilters);
    updateURL(newFilters);
    setVisibleProjects(10);
  };

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
          {filters.search && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              Search: {filters.search}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleRemoveFilter('search')}
              />
            </Badge>
          )}
          {filters.batch && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              Batch: {filters.batch}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleRemoveFilter('batch')}
              />
            </Badge>
          )}
          {filters.department && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              Dept: {filters.department}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleRemoveFilter('department')}
              />
            </Badge>
          )}
          {filters.category && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              Category: {filters.category}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleRemoveFilter('category')}
              />
            </Badge>
          )}
          {filters.level && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              Level: {filters.level}
              <X
                className='h-3 w-3 cursor-pointer'
                onClick={() => handleRemoveFilter('level')}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className='mb-6 flex items-center justify-between'>
        <p className='text-gray-600'>
          Found&nbsp;
          <span className='font-semibold text-gray-900'>
            {filteredProjects.length}
          </span>
          &nbsp;projects matching your criteria
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {filteredProjects.slice(0, visibleProjects).map((project, key) => (
          <ProjectCard project={project} key={key} />
        ))}
      </div>

      {/* Show More Button */}
      {visibleProjects < filteredProjects.length && (
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
            Showing {visibleProjects} of {filteredProjects.length} projects
          </p>
        </div>
      )}

      {/* No Results */}
      {filteredProjects?.length === 0 && (
        <NoResultsFound clearFilters={clearFilters} />
      )}
    </div>
  );
}
