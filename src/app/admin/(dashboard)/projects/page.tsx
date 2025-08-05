'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreVertical } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useGetProjectsQuery, useReviewProjectMutation } from '../redux/api';
import { useSnackbar } from 'notistack';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, refetch } = useGetProjectsQuery({
    search,
    limit,
    offset,
  });

  useEffect(() => {
    refetch();
  }, [search, page, refetch]);

  const handleView = (id: string) => {
    router.push(`/admin/projects/${id}`);
  };

  type ProjectStatus = 'APPROVED' | 'REJECTED';

  const [reviewProject, { isLoading: isReviewing }] =
    useReviewProjectMutation();

  const handleReview = async (id: string, status: ProjectStatus) => {
    try {
      await reviewProject({ projectId: id, status }).unwrap();
      enqueueSnackbar('Project status updated.', { variant: 'success' });
      refetch();
    } catch (err) {
      enqueueSnackbar('Failed to update project status', { variant: 'error' });
    }
  };

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gray-100 py-8 dark:bg-gray-950'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-50'>
            Projects
          </h1>
          <Input
            placeholder='Search by title...'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className='max-w-sm'
          />
        </div>
        <Card className='w-full shadow-none'>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Submitted By
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Category
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Batch Year
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Submitted At
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <LoadingProjects />
                ) : data?.results.length ? (
                  data.results.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className='font-medium'>
                        {project.title}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {project.submittedByFullName}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {project.category?.name}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {project.batchYear?.year}
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {new Date(project.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === 'APPROVED'
                              ? 'default'
                              : project.status === 'REJECTED'
                                ? 'destructive'
                                : 'secondary'
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className='cursor-pointer'
                              variant='ghost'
                              disabled={isReviewing}
                              size='icon'
                            >
                              <MoreVertical className='h-4 w-4' />
                              <span className='sr-only'>More actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => handleView(project.id)}
                              className='cursor-pointer'
                            >
                              View
                            </DropdownMenuItem>
                            {!(project.status === 'APPROVED') && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleReview(project.id, 'APPROVED')
                                }
                                className='cursor-pointer'
                              >
                                Accept
                              </DropdownMenuItem>
                            )}
                            {!(project.status === 'REJECTED') && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleReview(project.id, 'REJECTED')
                                }
                                className='cursor-pointer'
                              >
                                Reject
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className='py-4 text-center'>
                      No projects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='flex items-center justify-between border-t px-6 py-4'>
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              variant='outline'
              className='cursor-pointer'
            >
              Previous
            </Button>
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              Page {page} of {Math.ceil((data?.count || 1) / limit)}
            </span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={offset + limit >= (data?.count || 0)}
              variant='outline'
              className='cursor-pointer'
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const LoadingProjects = () => {
  const length = 5;
  return (
    // Skeleton loading state
    Array.from({ length }).map((_, index) => (
      <TableRow key={index}>
        <TableCell className='font-medium'>
          <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
        <TableCell className='hidden md:table-cell'>
          <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
        <TableCell className='hidden md:table-cell'>
          <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
        <TableCell>
          <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
        <TableCell>
          <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
        <TableCell>
          <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
        <TableCell className='text-right'>
          <div className='ml-auto h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </TableCell>
      </TableRow>
    ))
  );
};
