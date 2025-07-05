import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden bg-white py-12 md:py-20'>
      {/* Dotted Grid Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50'>
        <div
          className='absolute inset-0 opacity-30'
          style={{
            backgroundImage: `radial-gradient(circle, var(--sidebar-primary) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className='relative container mx-auto px-4 text-center lg:px-6'>
        <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-6xl'>
          Explore Our College Project Archive
        </h1>
        <p className='mx-auto mt-12 mb-12 max-w-5xl text-xl font-medium text-gray-600'>
          A digital repository showcasing the creativity, research, and
          innovative projects by students of our college. Preserve academic
          achievements and inspire future generations.
        </p>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Button size='lg' className='px-8 py-6 text-lg' asChild>
            <Link href='/projects'>Browse Projects</Link>
          </Button>
          <Button
            variant='outline'
            size='lg'
            className='px-8 py-6 text-lg'
            asChild
          >
            <Link href='/submit'>Submit Project</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
