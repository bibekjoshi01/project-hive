'use client';
import { useGetCategoriesQuery } from './redux/home.api';

import {
  Code,
  Monitor,
  Database,
  Cpu,
  BookOpen,
  GraduationCap,
  type LucideIcon,
  Brain,
  Search,
  Image,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'C Programming': Code,
  'C++ (OOP)': Code,
  DSA: Code,
  DBMS: Database,
  'Computer Graphics': Monitor,
  'Computer Networks': Cpu,
  Minor: BookOpen,
  Major: GraduationCap,
  AI: Brain,
  'Data Mining': Search,
  'Image Processing': Image,
};

const Categories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4 py-12 lg:px-6'>
          <h2 className='mb-16 text-center text-4xl font-bold text-gray-900'>
            Explore Projects by Category
          </h2>
          <div className='grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.results || data.results.length === 0) {
    return (
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4 py-12 lg:px-6'>
          <h2 className='mb-16 text-center text-4xl font-bold text-gray-900'>
            Explore Projects by Category
          </h2>
          <div className='flex h-48 items-center justify-center rounded-lg bg-white p-8 shadow-sm'>
            <p className='text-center text-xl font-medium text-gray-600'>
              No categories available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 py-12 lg:px-6'>
        <h2 className='mb-16 text-center text-4xl font-bold text-gray-900'>
          Explore Projects by Category
        </h2>
        <div className='grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-4'>
          {data.results.map((category: CategoryResponse) => {
            const IconComponent = iconMap[category.name] || Code; // fallback
            return (
              <a
                key={category.id}
                href={`/browse/?category=${encodeURIComponent(category.id)}`}
                className='group flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg'
              >
                <div className='bg-primary/10 text-primary group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors group-hover:text-white'>
                  <IconComponent className='h-6 w-6' />
                </div>
                <div>
                  <h3 className='group-hover:text-primary mb-1 text-xl font-semibold text-gray-900 transition-colors'>
                    {category.name}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {category.projectCount} Projects
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;

export const CategorySkeleton = () => {
  return (
    <div className='group flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm'>
      <div className='mb-4 h-12 w-12 animate-pulse rounded-full bg-gray-200'></div>
      <div>
        <div className='mb-1 h-6 w-3/4 animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-1/2 animate-pulse rounded bg-gray-200'></div>
      </div>
    </div>
  );
};
