'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetUserProjectQuery } from '../redux/auth.api';
import { Edit, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const statusConfig = [
  {
    label: 'All',
    value: 'all',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    label: 'Pending',
    value: 'PENDING',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    label: 'Approved',
    value: 'APPROVED',
    color: 'bg-green-100 text-green-800',
  },
  { label: 'Rejected', value: 'REJECTED', color: 'bg-red-100 text-red-800' },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function MyProjects() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: projectData, isLoading } = useGetUserProjectQuery();

  // Filter projects by status
  const filteredProjects = projectData?.results?.filter((project) =>
    statusFilter === 'all' ? true : project.status === statusFilter,
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold'>My Projects</h3>
        <Button
          className='cursor-pointer'
          onClick={() => (window.location.href = '/submit-project')}
        >
          Submit New Project
        </Button>
      </div>

      {/* Status Filter */}
      <Card className='border-1 shadow-none'>
        <CardContent className='p-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <span className='text-sm font-medium'>Filter by status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-48 focus:ring-0 focus:ring-offset-0'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusConfig.map((status, key) => (
                  <SelectItem key={key} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading ? (
        <Card className='border-1 shadow-none'>
          <CardContent className='p-8 text-center text-gray-500'>
            Loading your projects...
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {filteredProjects?.length === 0 ? (
            <Card className='border-1 shadow-none'>
              <CardContent className='p-8 text-center text-gray-500'>
                No projects found for the selected filter.
              </CardContent>
            </Card>
          ) : (
            filteredProjects?.map((project, idx) => (
              <Card key={idx} className='border-1 border-gray-200 shadow-none'>
                <CardContent className='p-6'>
                  <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                    {/* Left: Project Info */}
                    <div className='flex flex-1 flex-col gap-1.5'>
                      <h2 className='text-xl font-semibold text-gray-900'>
                        {project.title}
                      </h2>

                      {/* Tags (example badges) */}
                      <div className='my-2 flex flex-wrap gap-2'>
                        <div
                          className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                            statusConfig.find((s) => s.value === project.status)
                              ?.color
                          }`}
                        >
                          {project.status}
                        </div>
                        <Badge variant='outline'>{project.categoryName}</Badge>
                      </div>

                      <p className='text-sm text-gray-500'>
                        Submitted at: {formatDate(project.submittedAt)}
                      </p>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className='flex flex-col items-end justify-between gap-3'>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='cursor-pointer'
                        >
                          <Eye className='mr-1 h-4 w-4' />
                          View
                        </Button>
                        {project.status === 'PENDING' && (
                          <Button
                            variant='outline'
                            className='cursor-pointer'
                            size='sm'
                          >
                            <Edit className='mr-1 h-4 w-4' />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
