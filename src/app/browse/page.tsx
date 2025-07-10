import React from 'react';
// Components
import BrowseProjects from './BrowseProjects';

export default function page() {
  return (
    <section className='border-b bg-white'>
      <div className='container mx-auto px-4 lg:px-6 mb-16'>
        <BrowseProjects />
      </div>
    </section>
  );
}
