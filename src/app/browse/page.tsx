import React from 'react';
// Components
import SearchAndFilters from './BrowseProjects';

export default function page() {
  return (
    <>
      <section className='border-b bg-white py-16'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-3xl font-bold text-gray-900'>
              Browse Our Projects
            </h2>
            <p className='mx-auto max-w-2xl text-gray-600'>
              Discover innovative projects from talented students across
              different departments, batches, and academic levels.
            </p>
          </div>
          <SearchAndFilters />
        </div>
      </section>
    </>
  );
}
