'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Eye,
  Download,
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
import { useGetProjectDetailQuery } from '../redux/project.api';
import { useSnackbar } from 'notistack';

interface ProjectDetailViewProps {
  projectId: string;
}

const transformProjectDetail = (data: any): IProjectDetail => ({
  id: data.id,
  title: data.title,
  abstract: data.abstract,
  description: data.projectDetails || '',
  batch: data.batchYear.year.toString(),
  department: data.department.name,
  level: data.level,
  category: data.category.name,
  supervisor: data.supervisor,
  teamMembers: data.teamMembers.map((m: any) => ({
    id: m.id,
    fullName: m.full_name,
    rollNo: m.roll_no,
    photo: m.photo,
  })),
  technologies: data.technologiesUsed,
  githubLinks: data.githubLinks,
  documentationUrl: data.documentationLink,
  files: data.files.map((f: any) => ({
    id: f.id,
    type: f.file_type,
    file: f.file,
  })),
  submittedDate: data.submittedAt,
  submittedBy: data?.submittedByFullName,
  views: data.views,
  rating: data.ratingAverage,
  totalRatings: data.total_ratings || 0,
});

export default function ProjectDetailView({
  projectId,
}: ProjectDetailViewProps) {
  const [project, setProject] = useState<IProjectDetail | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetProjectDetailQuery(projectId);

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
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black' />
      </div>
    );
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
                {project.teamMembers.map((member) => (
                  <div key={member.id} className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={member.photo || '/placeholder.svg'}
                        alt={member.fullName}
                      />
                      <AvatarFallback>
                        {member.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{member.fullName}</p>
                      <p className='text-sm text-gray-500'>{member.rollNo}</p>
                    </div>
                  </div>
                ))}
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
            {/* {project.files.length > 0 && (
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle>Project Files</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  {project.files.map((file) => (
                    <div
                      key={file.id}
                      className='flex items-center justify-between rounded-lg border p-3'
                    >
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-gray-500' />
                        <div>
                          <p className='text-sm font-medium'>{file.name}</p>
                          <p className='text-xs text-gray-500'>
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </div>
                      <Button size='sm' variant='outline'>
                        <Download className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
