'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Edit, Trash2, Calendar, User, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedDate: string;
  category: string;
  department: string;
  views: number;
  rating: number;
  teamMembers: string[];
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Student Management System',
    description:
      'A comprehensive web application that uses machine learning to predict student performance.',
    status: 'approved',
    submittedDate: '2024-03-15',
    category: 'Web Development',
    department: 'Computer Science',
    views: 1250,
    rating: 4.8,
    teamMembers: ['John Doe', 'Jane Smith'],
  },
  {
    id: 2,
    title: 'Smart Home IoT Controller',
    description:
      'An IoT-based home automation system with mobile app control and voice commands.',
    status: 'pending',
    submittedDate: '2024-03-20',
    category: 'IoT',
    department: 'Computer Science',
    views: 0,
    rating: 0,
    teamMembers: ['John Doe'],
  },
  {
    id: 3,
    title: 'E-commerce Analytics Dashboard',
    description:
      'Real-time analytics dashboard for e-commerce businesses with predictive sales forecasting.',
    status: 'under_review',
    submittedDate: '2024-03-18',
    category: 'Data Science',
    department: 'Computer Science',
    views: 45,
    rating: 0,
    teamMembers: ['John Doe', 'Mike Chen'],
  },
  {
    id: 4,
    title: 'Mobile Learning App',
    description:
      'Educational mobile application for interactive learning with gamification elements.',
    status: 'rejected',
    submittedDate: '2024-02-28',
    category: 'Mobile App',
    department: 'Computer Science',
    views: 12,
    rating: 0,
    teamMembers: ['John Doe'],
  },
];

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳',
  },
  approved: {
    label: 'Approved',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
  },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: '❌' },
  under_review: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800',
    icon: '👀',
  },
};

export default function MyProjects() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projects] = useState<Project[]>(mockProjects);

  const filteredProjects = projects.filter(
    (project) => statusFilter === 'all' || project.status === statusFilter,
  );

  const getStatusCounts = () => {
    return {
      all: projects.length,
      pending: projects.filter((p) => p.status === 'pending').length,
      approved: projects.filter((p) => p.status === 'approved').length,
      rejected: projects.filter((p) => p.status === 'rejected').length,
      under_review: projects.filter((p) => p.status === 'under_review').length,
    };
  };

  const statusCounts = getStatusCounts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>My Projects</h1>
        <Button onClick={() => (window.location.href = '/submit-project')}>
          Submit New Project
        </Button>
      </div>

      {/* Status Filter */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <span className='text-sm font-medium'>Filter by status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-48 focus:ring-0 focus:ring-offset-0'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>
                  All Projects ({statusCounts.all})
                </SelectItem>
                <SelectItem value='pending'>
                  Pending ({statusCounts.pending})
                </SelectItem>
                <SelectItem value='approved'>
                  Approved ({statusCounts.approved})
                </SelectItem>
                <SelectItem value='under_review'>
                  Under Review ({statusCounts.under_review})
                </SelectItem>
                <SelectItem value='rejected'>
                  Rejected ({statusCounts.rejected})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className='space-y-4'>
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className='p-8 text-center'>
              <p className='mb-4 text-gray-500'>
                No projects found for the selected filter.
              </p>
              <Button
                onClick={() => (window.location.href = '/submit-project')}
              >
                Submit Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card
              key={project.id}
              className='transition-shadow hover:shadow-md'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='mb-2 text-lg'>
                      {project.title}
                    </CardTitle>
                    <p className='line-clamp-2 text-sm text-gray-600'>
                      {project.description}
                    </p>
                  </div>
                  <Badge
                    className={cn('ml-4', statusConfig[project.status].color)}
                  >
                    {statusConfig[project.status].icon}{' '}
                    {statusConfig[project.status].label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <div className='mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    {formatDate(project.submittedDate)}
                  </div>
                  <div className='flex items-center gap-1'>
                    <User className='h-4 w-4' />
                    {project.teamMembers.length} member
                    {project.teamMembers.length > 1 ? 's' : ''}
                  </div>
                  {project.status === 'approved' && (
                    <>
                      <div className='flex items-center gap-1'>
                        <Eye className='h-4 w-4' />
                        {project.views} views
                      </div>
                      <div className='flex items-center gap-1'>
                        <Star className='h-4 w-4' />
                        {project.rating}/5
                      </div>
                    </>
                  )}
                </div>

                <div className='mb-4 flex flex-wrap gap-2'>
                  <Badge variant='outline'>{project.category}</Badge>
                  <Badge variant='outline'>{project.department}</Badge>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-500'>Team:</span>
                    <span className='text-sm'>
                      {project.teamMembers.join(', ')}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      <Eye className='mr-1 h-4 w-4' />
                      View
                    </Button>
                    {project.status === 'pending' ||
                    project.status === 'rejected' ? (
                      <Button variant='outline' size='sm'>
                        <Edit className='mr-1 h-4 w-4' />
                        Edit
                      </Button>
                    ) : null}
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-transparent text-red-600 hover:text-red-700'
                    >
                      <Trash2 className='mr-1 h-4 w-4' />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
