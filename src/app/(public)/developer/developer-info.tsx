'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import DevImage from '@/assets/images/developer.jpeg';
import Image from 'next/image';

const developerData = {
  name: 'Bibek Joshi',
  title: 'Electronics, Communication and Information Engineering',
  batch: '2079 • Thapathali Engineering Campus',
  photo: DevImage,
  bio: [
    'A curious and enthusiastic individual who loves exploring new ideas and experiences. I enjoy connecting with people, sharing stories, and learning from different perspectives.',
    'In my free time, I like reading, traveling, and discovering creative ways to express myself. Always striving to grow personally and make meaningful memories along the way.',
  ],
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/bibekjoshi01',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bibek-joshi-69458b231/',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:bibekjoshi34@gmail.com',
      icon: Mail,
    },
  ],
};

export default function DeveloperInfo() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-4 py-6 md:p-8'>
      <div className='w-full max-w-6xl rounded-lg border p-4 lg:p-16'>
        <div className='grid h-full grid-cols-1 items-center gap-8 md:gap-16 lg:grid-cols-2'>
          {/* Photo Side */}
          <div className='flex h-full justify-center lg:justify-end'>
            <div className='relative h-full'>
              <Image
                width={1000}
                height={1200}
                src={developerData.photo}
                alt={developerData.name}
                className='h-full w-80 rounded-2xl object-cover shadow-lg lg:w-96'
              />
            </div>
          </div>

          {/* Info Side */}
          <div className='space-y-6'>
            <div>
              <h1 className='mb-2 text-4xl font-bold text-gray-900 lg:text-5xl'>
                {developerData.name}
              </h1>
              <p className='mb-4 text-sm text-gray-600 md:text-xl'>
                {developerData.title}
              </p>
              <p className='text-sm text-gray-500 md:text-lg'>
                {developerData.batch}
              </p>
            </div>

            <div className='space-y-4'>
              {developerData.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className='text-sm leading-relaxed text-gray-700 md:text-lg'
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
                      className='flex cursor-pointer items-center gap-2 bg-transparent px-6 py-3 transition-colors hover:bg-gray-50'
                    >
                      <Icon className='h-5 w-5' />
                      <span className='hidden md:inline'>{link.name}</span>
                      <ExternalLink className='hidden h-4 w-4 md:inline' />
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
