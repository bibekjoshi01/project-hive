import React from 'react';

const categories = [
  { title: 'C Programming', count: '150+ Projects' },
  { title: 'Computer Graphics', count: '120+ Projects' },
  { title: 'OOP (C++)', count: '80+ Projects' },
  { title: 'DBMS', count: '80+ Projects' },
  { title: 'Operating System', count: '80+ Projects' },
  { title: 'Design', count: '80+ Projects' },
  { title: 'Minor', count: '90+ Projects' },
  { title: 'Major', count: '90+ Projects' },
];

const Categories = () => {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 lg:px-6'>
        <h2 className='mb-12 text-center text-4xl font-bold text-gray-900'>
          Explore Projects by Category
        </h2>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className='group flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg'
            >
              <div className='bg-primary/10 text-primary group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors group-hover:text-white'>
                {/* Replace below with real icons later if you want */}
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='group-hover:text-primary mb-1 text-xl font-semibold text-gray-900 transition-colors'>
                  {category.title}
                </h3>
                <p className='text-sm text-gray-600'>{category.count}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
