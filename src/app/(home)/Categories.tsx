import {
  Code,
  Monitor,
  Database,
  Cpu,
  Palette,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

const categories = [
  {
    title: 'C Programming',
    count: '150 Projects',
    icon: Code,
  },
  {
    title: 'Computer Graphics',
    count: '120 Projects',
    icon: Monitor,
  },
  {
    title: 'OOP (C++)',
    count: '80 Projects',
    icon: Code,
  },
  {
    title: 'DBMS',
    count: '80 Projects',
    icon: Database,
  },
  {
    title: 'Embedded System',
    count: '80 Projects',
    icon: Cpu,
  },
  {
    title: 'Design',
    count: '80 Projects',
    icon: Palette,
  },
  {
    title: 'Minor',
    count: '90 Projects',
    icon: BookOpen,
  },
  {
    title: 'Major',
    count: '90 Projects',
    icon: GraduationCap,
  },
];

const Categories = () => {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 lg:px-6 py-12'>
        <h2 className='mb-16 text-center text-4xl font-bold text-gray-900'>
          Explore Projects by Category
        </h2>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <a
                key={index}
                href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className='group flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg'
              >
                <div className='bg-primary/10 text-primary group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors group-hover:text-white'>
                  <IconComponent className='h-6 w-6'/>
                </div>
                <div>
                  <h3 className='group-hover:text-primary mb-1 text-xl font-semibold text-gray-900 transition-colors'>
                    {category.title}
                  </h3>
                  <p className='text-sm text-gray-600'>{category.count}</p>
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
