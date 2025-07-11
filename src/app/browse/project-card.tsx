'use client';

import { Calendar, Eye, Star, User } from 'lucide-react';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from './types';
import Link from 'next/link';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
    <Card className='group flex flex-col justify-between rounded-2xl bg-white p-8 transition-transform hover:-translate-y-2 hover:shadow-lg'>
      <CardHeader className='p-0 pb-1'>
        <div className='flex items-start justify-between'>
          <Link
            href={`/projects/${project.slug ?? project.id}`}
            className='group cursor-pointer'
          >
            <CardTitle className='text-lg leading-normal font-semibold text-black transition-colors'>
              {project.title}
            </CardTitle>
          </Link>

          <div className='flex items-center gap-1 text-sm text-yellow-600'>
            <Star className='h-4 w-4 fill-current' />
            {project.rating}
          </div>
        </div>
        <div className='mt-2 flex items-center gap-4 text-sm text-gray-500'>
          <div className='flex items-center gap-1'>
            <User className='h-4 w-4' />
            {project.author}
          </div>
          <div className='flex items-center gap-1'>
            <Calendar className='h-4 w-4' />
            {formatDate(project.date)}
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 p-0 pt-0'>
        <p className='mb-4 line-clamp-3 text-sm text-gray-600'>
          {truncateDescription(project.description)}
        </p>

        <div className='space-y-3'>
          {/* Project Details */}
          <div className='flex flex-wrap gap-2'>
            <Badge variant='outline' className='text-xs'>
              {project.batch}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {project.department}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {project.category}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {project.level}
            </Badge>
          </div>

          <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
            <div className='flex items-center gap-1'>
              <Eye className='h-4 w-4' />
              {project.views.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
