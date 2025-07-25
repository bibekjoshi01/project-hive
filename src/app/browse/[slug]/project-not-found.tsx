import { Button } from '@/components/ui/button';
import React from 'react';

const ProjectNotFound = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>
          Project Not Found
        </h2>
        <p className='mb-4 text-gray-600'>
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button
          className='cursor-pointer'
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ProjectNotFound;
