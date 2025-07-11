'use client';

import type React from 'react';

import { useEffect, useState } from 'react';

interface CounterItemProps {
  count: number;
  label: string;
  suffix?: string;
}

const CounterItem = ({
  count,
  label,
  suffix = '+',
}: CounterItemProps) => {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = count / steps;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrentCount(Math.min(Math.floor(increment * step), count));

      if (step >= steps) {
        clearInterval(timer);
        setCurrentCount(count);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className='flex flex-col items-center py-8 text-center first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0'>
      <div className='mb-2 text-4xl font-bold text-gray-900'>
        {currentCount}
        {suffix}
      </div>
      <div className='text-lg font-medium text-gray-600'>{label}</div>
    </div>
  );
};

const CounterSection = () => {
  const stats = [
    {
      count: 5,
      label: 'Course Departments',
    },
    {
      count: 10,
      label: 'Categories',
    },
    {
      count: 100,
      label: 'Projects',
    },
    {
      count: 10,
      label: 'Batches',
    },
  ];

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-4 lg:px-6'>
        <div className='grid grid-cols-1 gap-8 divide-y divide-gray-300 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4'>
          {stats.map((stat, index) => (
            <CounterItem key={index} count={stat.count} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
