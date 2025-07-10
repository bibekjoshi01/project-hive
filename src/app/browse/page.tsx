import { Suspense } from 'react';
// Components
import BrowseProjects from './BrowseProjects';

export default function page() {
  return (
    <section className='border-b bg-white'>
      <div className='container mx-auto mb-16 px-4 lg:px-6'>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowseProjects />
        </Suspense>
      </div>
    </section>
  );
}
