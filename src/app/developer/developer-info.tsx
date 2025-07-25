'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import DevImage from '@/assets/images/developer.png';
import Image from 'next/image';

const developerData = {
  name: 'Bibek Joshi',
  title: 'Computer Science Student',
  batch: 'Batch 2024 • University Name',
  photo: DevImage,
  bio: [
    'Passionate computer science student with a love for web development and modern technologies. I enjoy building user-friendly applications and learning new programming languages.',
    'Currently focusing on React, Node.js, and full-stack development. Always excited to work on innovative projects and collaborate with fellow developers.',
  ],
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/johndoe',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:john.doe@example.com',
      icon: Mail,
    },
  ],
};

export default function DeveloperInfo() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-8'>
      <div className='w-full max-w-6xl'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Photo Side */}
          <div className='flex justify-center lg:justify-end'>
            <div className='relative'>
              <Image
                width={1000}
                height={1000}
                src={developerData.photo}
                alt={developerData.name}
                className='h-100 w-80 rounded-2xl object-cover shadow-lg lg:h-96 lg:w-96'
              />
            </div>
          </div>

          {/* Info Side */}
          <div className='space-y-6'>
            <div>
              <h1 className='mb-2 text-4xl font-bold text-gray-900 lg:text-5xl'>
                {developerData.name}
              </h1>
              <p className='mb-4 text-xl text-gray-600'>
                {developerData.title}
              </p>
              <p className='text-lg text-gray-500'>{developerData.batch}</p>
            </div>

            <div className='space-y-4'>
              {developerData.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className='text-lg leading-relaxed text-gray-700'
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Social Links */}
            <div className='flex flex-wrap gap-4 pt-4'>
              {developerData.socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <Button
                      variant='outline'
                      size='lg'
                      className='flex items-center gap-2 bg-transparent px-6 py-3 transition-colors hover:bg-gray-50'
                    >
                      <Icon className='h-5 w-5' />
                      {link.name}
                      <ExternalLink className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
                    </Button>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
