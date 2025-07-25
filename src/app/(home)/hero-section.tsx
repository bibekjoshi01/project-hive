import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const heroData = {
  title: 'Thapathali Campus Project Archive',
  description:
    'A digital repository showcasing the creativity, research, and innovative projects by students of our college. Preserve academic achievements and inspire future generations.',
  actions: [
    {
      label: 'Browse Projects',
      href: '/browse',
      variant: 'default',
    },
    {
      label: 'Submit Project',
      href: '/submit-project',
      variant: 'outline',
    },
  ],
};

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden bg-white py-12 md:py-20'>
      {/* Dotted Grid Background */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 opacity-30'
          style={{
            backgroundImage: `radial-gradient(circle, var(--sidebar-primary) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* gradient fade */}
        <div className='absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-b from-transparent to-gray-50' />
      </div>

      <div className='relative container mx-auto px-4 py-16 text-center lg:px-6'>
        <h1 className='mb-6 text-4xl font-extrabold text-gray-900 md:text-6xl'>
          {heroData.title}
        </h1>
        <p className='mx-auto mt-12 mb-12 max-w-5xl text-xl font-medium text-gray-600'>
          {heroData.description}
        </p>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          {heroData.actions.map((action, index) => (
            <Button
              key={index}
              size='lg'
              variant={action.variant as 'default' | 'outline'}
              className='font-poppins px-8 py-6 text-lg font-medium'
              asChild
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
