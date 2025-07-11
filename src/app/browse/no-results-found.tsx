'use client';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React from 'react';

type NoResultsFoundProps = {
  clearFilters: () => void;
};

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ clearFilters }) => {
  return (
    <div className='py-12 text-center'>
      <div className='mx-auto max-w-md'>
        <Search className='mx-auto h-12 w-12 text-gray-400' />
        <h3 className='mt-4 text-lg font-medium text-gray-900'>
          No projects found
        </h3>
        <p className='mt-2 text-gray-500'>
          Try adjusting your search criteria or clearing some filters.
        </p>
        <Button onClick={clearFilters} className='mt-4 cursor-pointer'>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default NoResultsFound;
