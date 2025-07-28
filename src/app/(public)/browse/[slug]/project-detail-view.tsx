'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import AvatarI from '@/assets/images/avatar.png';
import {
  Eye,
  Star,
  Github,
  FileText,
  Share2,
  BookOpen,
  Code,
  Users,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import ProjectNotFound from './project-not-found';
import { IProjectDetail } from '../redux/types';
import {
  useGetProjectDetailQuery,
  useIncreaseProjectViewMutation,
} from '../redux/project.api';
import { useSnackbar } from 'notistack';
import ProgrammaticDownload from './download';
import ProjectRating from './rate-project';

interface ProjectDetailViewProps {
  projectSlug: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, ''); // Remove special characters
}

export function getFileExtension(url: string): string {
  const cleanUrl = url.split('?')[0]; // Remove query params
  const ext = cleanUrl.split('.').pop();
  return ext || 'file';
}

const transformProjectDetail = (data: any): IProjectDetail => ({
  id: data.id,
  title: data.title,
  slug: data?.slug,
  abstract: data.abstract,
  description: data.projectDetails || '',
  batch: data.batchYear.year.toString(),
  department: data.department.name,
  level: data.level,
  category: data.category.name,
  supervisor: data.supervisor,
  teamMembers: data.teamMembers.map((m: any) => ({
    id: m.id,
    fullName: m.fullName,
    rollNo: m.rollNo,
    photo: m.photo,
  })),
  technologies: data.technologiesUsed,
  githubLinks: data.githubLinks,
  documentationUrl: data.documentationLink,
  files: data.files.map((f: any) => ({
    id: f.id,
    fileType: f.fileType,
    file: f.file,
  })),
  submittedDate: data.submittedAt,
  submittedBy: data?.submittedByFullName,
  views: data.views,
  rating: data.ratingAverage,
  totalRatings: data.totalRatings || 0,
});

export default function ProjectDetailView({
  projectSlug,
}: ProjectDetailViewProps) {
  const [project, setProject] = useState<IProjectDetail | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetProjectDetailQuery(projectSlug);
  const hasIncreasedView = useRef(false);

  const [increaseView] = useIncreaseProjectViewMutation();

  // Increase project views
  useEffect(() => {
    if (!projectSlug || hasIncreasedView.current || !data?.id) return;
    hasIncreasedView.current = true;

    increaseView(data.id).catch(() => {});
  }, [data, increaseView, projectSlug]);

  useEffect(() => {
    if (data) {
      setProject(transformProjectDetail(data));
    }
  }, [data]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <Button
          variant='ghost'
          onClick={() => window.history.back()}
          className='mb-6 flex cursor-pointer items-center gap-2 hover:bg-gray-100'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Projects
        </Button>

        {/* Project Header */}
        <Card className='mb-8 shadow-none'>
          <CardHeader className='pb-4'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
              <div className='flex-1'>
                <div className='mb-3 flex items-center gap-3'>
                  <Badge
                    className={
                      'border border-green-200 bg-green-100 text-green-800'
                    }
                  >
                    {project.category}
                  </Badge>
                </div>
                <h1 className='mb-3 text-3xl font-bold text-gray-900'>
                  {project.title}
                </h1>
                <p className='text-lg leading-relaxed text-gray-600'>
                  {project.abstract}
                </p>
              </div>

              <div className='flex flex-col gap-3 lg:items-end'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    className='cursor-pointer'
                    size='sm'
                    onClick={handleShare}
                  >
                    <Share2 className='mr-2 h-4 w-4' />
                    Share
                  </Button>
                </div>

                <div className='flex items-center gap-4 text-sm text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <Eye className='h-4 w-4' />
                    {project.views.toLocaleString()} views
                  </div>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-current text-yellow-500' />
                    {project.rating} ({project.totalRatings} reviews)
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className='pt-0'>
            <div className='grid grid-cols-2 gap-4 text-sm md:grid-cols-5'>
              <div>
                <span className='text-gray-500'>Academic Level</span>
                <p className='font-medium'>{project.level}</p>
              </div>
              <div>
                <span className='text-gray-500'>Department</span>
                <p className='font-medium'>{project.department}</p>
              </div>
              <div>
                <span className='text-gray-500'>Batch Year</span>
                <p className='font-medium'>{project.batch}</p>
              </div>
              <div>
                <span className='text-gray-500'>Submission Date</span>
                <p className='font-medium'>
                  {formatDate(project.submittedDate)}
                </p>
              </div>
              <div>
                <span className='text-gray-500'>Submitted By</span>
                <p className='font-medium'>{project.submittedBy}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Technologies Used */}
            <Card className='shadow-none'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Code className='h-5 w-5' />
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='px-3 py-1'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card className='shadow-none'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='h-5 w-5' />
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className='prose max-w-none'
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Team Members */}
            <Card className='shadow-none'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {project.teamMembers?.map((member) => {
                  return (
                    <div key={member.id} className='flex items-center gap-3'>
                      <Avatar className='h-12 w-12'>
                        <AvatarImage src={member.photo || AvatarI.src} />
                        <AvatarFallback>{member.fullName}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium'>{member.fullName}</p>
                        <p className='text-sm text-gray-500'>{member.rollNo}</p>
                      </div>
                    </div>
                  );
                })}
                {project.supervisor && (
                  <>
                    <Separator />
                    <div>
                      <p className='mb-1 text-sm text-gray-500'>Supervisor</p>
                      <p className='font-medium'>{project.supervisor}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Project Links */}
            <Card className='shadow-none'>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {project?.githubLinks && project.githubLinks.length > 0 && (
                  <div className='space-y-2'>
                    {project?.githubLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50'
                      >
                        <Github className='h-5 w-5' />
                        <span>
                          View Source Code{' '}
                          {project?.githubLinks?.length > 1
                            ? `#${index + 1}`
                            : ''}
                        </span>
                        <ExternalLink className='ml-auto h-4 w-4' />
                      </a>
                    ))}
                  </div>
                )}

                {project.documentationUrl && (
                  <a
                    href={project.documentationUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50'
                  >
                    <FileText className='h-5 w-5' />
                    <span>Documentation</span>
                    <ExternalLink className='ml-auto h-4 w-4' />
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Project Files */}
            {project.files.length > 0 && (
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle>Project Files</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  {project.files.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between rounded-lg border p-3'
                    >
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-gray-500' />
                        <div>
                          <p className='text-sm font-medium'>
                            {file.fileType ?? `Project file ${index + 1}`}
                          </p>
                        </div>
                      </div>
                      <ProgrammaticDownload
                        fileUrl={file.file}
                        fileName={`${slugify(project.title)}_${slugify(file.fileType)}.${getFileExtension(file.file)}`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            <ProjectRating projectId={project.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className='min-h-screen animate-pulse bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Back Button Skeleton */}
        <div className='mb-6 h-10 w-40 rounded bg-gray-200'></div>

        {/* Project Header Skeleton */}
        <div className='mb-8 rounded-lg bg-white p-6 shadow-sm'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
            <div className='flex-1'>
              <div className='mb-3 h-6 w-24 rounded bg-gray-200'></div>{' '}
              {/* Badge */}
              <div className='mb-3 h-10 w-3/4 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='mb-2 h-6 w-full rounded bg-gray-200'></div>{' '}
              {/* Abstract line 1 */}
              <div className='h-6 w-11/12 rounded bg-gray-200'></div>{' '}
              {/* Abstract line 2 */}
            </div>
            <div className='flex flex-col gap-3 lg:items-end'>
              <div className='h-9 w-24 rounded bg-gray-200'></div>{' '}
              {/* Share Button */}
              <div className='flex items-center gap-4 text-sm text-gray-500'>
                <div className='h-4 w-20 rounded bg-gray-200'></div>{' '}
                {/* Views */}
                <div className='h-4 w-24 rounded bg-gray-200'></div>{' '}
                {/* Rating */}
              </div>
            </div>
          </div>
          <div className='mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className='mb-1 h-4 w-24 rounded bg-gray-200'></div>{' '}
                {/* Label */}
                <div className='h-6 w-32 rounded bg-gray-200'></div>{' '}
                {/* Value */}
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Main Content Skeleton */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Technologies Used Card Skeleton */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 h-6 w-48 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='flex flex-wrap gap-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='bg-gray-200\ h-8 w-20 rounded'></div>
                ))}
              </div>
            </div>

            {/* Project Description Card Skeleton */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 h-6 w-48 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='space-y-2'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
                <div className='h-4 w-11/12 rounded bg-gray-200'></div>
                <div className='h-4 w-full rounded bg-gray-200'></div>
                <div className='h-4 w-10/12 rounded bg-gray-200'></div>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className='space-y-6'>
            {/* Team Members Card Skeleton */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 h-6 w-40 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='space-y-4'>
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <div className='h-12 w-12 rounded-full bg-gray-200'></div>{' '}
                    {/* Avatar */}
                    <div>
                      <div className='mb-1 h-5 w-32 rounded bg-gray-200'></div>{' '}
                      {/* Name */}
                      <div className='h-4 w-24 rounded bg-gray-200'></div>{' '}
                      {/* Roll No */}
                    </div>
                  </div>
                ))}
                <div className='my-4 h-px bg-gray-200'></div> {/* Separator */}
                <div className='mb-1 h-4 w-24 rounded bg-gray-200'></div>{' '}
                {/* Supervisor Label */}
                <div className='h-5 w-32 rounded bg-gray-200'></div>{' '}
                {/* Supervisor Name */}
              </div>
            </div>

            {/* Project Links Card Skeleton */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 h-6 w-32 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='space-y-3'>
                <div className='h-12 w-full rounded bg-gray-200'></div>{' '}
                {/* Link 1 */}
                <div className='h-12 w-full rounded bg-gray-200'></div>{' '}
                {/* Link 2 */}
              </div>
            </div>

            {/* Project Files Card Skeleton */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 h-6 w-32 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='space-y-3'>
                <div className='h-12 w-full rounded bg-gray-200'></div>{' '}
                {/* File 1 */}
                <div className='h-12 w-full rounded bg-gray-200'></div>{' '}
                {/* File 2 */}
              </div>
            </div>

            {/* Project Rating Card Skeleton (assuming it's a card) */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 h-6 w-32 rounded bg-gray-200'></div>{' '}
              {/* Title */}
              <div className='h-10 w-full rounded bg-gray-200'></div>{' '}
              {/* Rating component placeholder */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
