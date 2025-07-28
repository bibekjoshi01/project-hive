'use client';

import { Calendar, ExternalLink, Eye, Star, User } from 'lucide-react';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { IProjectResponse } from './redux/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type ProjectCardProps = {
  project: IProjectResponse;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  };

  const truncateDescription = (text: string, maxLength = 250) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card
      onClick={() => router.push(`/browse/${project.slug}`)}
      className='group flex cursor-pointer flex-col justify-between rounded-2xl bg-white p-4 shadow-none transition-transform hover:-translate-y-2 sm:p-8'
    >
      <CardHeader className='p-0 pb-1'>
        <div className='flex items-start justify-between'>
          <Link
            href={`/browse/${project.slug}`}
            className='group cursor-pointer'
          >
            <CardTitle className='text-lg leading-normal font-semibold text-black transition-colors'>
              {project?.title}
            </CardTitle>
          </Link>

          <div className='flex items-center gap-1 text-sm text-yellow-600'>
            <Star className='h-4 w-4 fill-current' />
            {project?.ratingAverage ? project.ratingAverage.toFixed(1) : 'N/A'}
          </div>
        </div>
        <div className='mt-2 flex items-center gap-4 text-sm text-gray-500'>
          <div className='flex items-center gap-1'>
            <User className='h-4 w-4' />
            {project?.submittedByFullName}
          </div>
          <div className='flex items-center gap-1'>
            <Calendar className='h-4 w-4' />
            {formatDate(project?.submittedAt)}
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 p-0 pt-0'>
        <p className='mb-4 line-clamp-3 text-sm text-gray-600'>
          {truncateDescription(project?.abstract)}
        </p>

        <div className='space-y-3'>
          {/* Project Details */}
          <div className='flex flex-wrap gap-2'>
            <Badge variant='outline' className='text-xs'>
              {project?.batchYear?.year}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {project.level}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {project.category?.name}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {project?.department?.name}
            </Badge>
          </div>

          <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
            <div className='flex items-center gap-1'>
              <Eye className='h-4 w-4' />
              {project?.views.toLocaleString() || 0} views
            </div>
            <div className='flex items-center gap-1'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => router.push(`/browse/${project.slug}`)}
                className='flex cursor-pointer items-center gap-2 shadow-none'
              >
                <ExternalLink className='h-4 w-4' />
                View
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

export const ProjectCardSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col justify-between rounded-2xl bg-white p-4 shadow-sm sm:p-8'>
      {/* Title and Rating */}
      <div className='mb-4 space-y-2'>
        <div className='h-5 w-3/4 rounded bg-gray-200'></div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-16 rounded bg-gray-200'></div>
          <div className='h-4 w-8 rounded bg-gray-200'></div>
        </div>
      </div>

      {/* Meta Info */}
      <div className='mb-4 flex items-center gap-4 text-sm text-gray-500'>
        <div className='h-4 w-24 rounded bg-gray-200'></div>
        <div className='h-4 w-20 rounded bg-gray-200'></div>
      </div>

      {/* Abstract */}
      <div className='mb-4 space-y-2'>
        <div className='h-4 w-full rounded bg-gray-200'></div>
        <div className='h-4 w-5/6 rounded bg-gray-200'></div>
        <div className='h-4 w-3/4 rounded bg-gray-200'></div>
      </div>

      {/* Badges */}
      <div className='mb-4 flex flex-wrap gap-2'>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className='h-6 w-20 rounded bg-gray-200'></div>
        ))}
      </div>

      {/* Footer (Views + Button) */}
      <div className='flex items-center justify-between'>
        <div className='h-4 w-20 rounded bg-gray-200'></div>
        <div className='h-8 w-16 rounded bg-gray-200'></div>
      </div>
    </div>
  );
};
