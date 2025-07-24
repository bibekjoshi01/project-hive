'use client';

import { useFormContext } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Github, Globe } from 'lucide-react';
import type { ProjectFormData, TeamMember } from '../types';

type FormDataWithTech = ProjectFormData & {
  technologies: string | string[];
};

export default function ReviewStep() {
  const { getValues } = useFormContext<ProjectFormData>();
  const data = getValues() as FormDataWithTech;

  console.log(data);

  const technologies =
    typeof data.technologies === 'string'
      ? data.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : data.technologies;

  return (
    <div className='space-y-6'>
      <h2 className='mb-8 text-xl font-semibold'>Review &amp; Submit</h2>

      {/* ---------- Basic Info ---------- */}
      <Card className='mb-4 shadow-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg'>
            <CheckCircle className='h-5 w-5 text-green-500' />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Info label='Project Title' value={data.title} />
            <Info label='Supervisor' value={data.supervisor || '—'} />
            <Info label='Batch' value={String(data.batch.year)} />
            <Info label='Department' value={data.department.name} />
            <Info label='Level' value={data.level} />
          </div>

          <Info label='Category'>
            <Badge variant='outline' className='mt-1'>
              {data.category.name}
            </Badge>
          </Info>

          {/* Team Members List */}
          <Info label='Team Members'>
            <ul className='list-inside list-disc'>
              {(data.teamMembers || []).map((member: TeamMember, idx) => (
                <li key={member.id || idx}>
                  {member.fullName} — Roll No: {member.rollNo}
                </li>
              ))}
            </ul>
          </Info>
        </CardContent>
      </Card>

      {/* ---------- Technical Details ---------- */}
      <Card className='shadow-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg'>
            <CheckCircle className='h-5 w-5 text-green-500' />
            Technical Details
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {technologies.length > 0 && (
            <div>
              <p className='mb-2 text-sm text-gray-500'>Technologies Used</p>
              <div className='flex flex-wrap gap-2'>
                {technologies.map((tech, i) => (
                  <Badge key={i} variant='outline'>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <LinkRow icon={Github} url={data.githubUrl} label='GitHub' />
            <LinkRow icon={Globe} url={data.liveUrl} label='Live Demo' />
            <LinkRow
              icon={ExternalLink}
              url={data.documentationUrl}
              label='Documentation'
            />
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-gray-500'>Project Settings</p>
            <div className='flex gap-4'>
              <Badge variant={data.isPublic ? 'default' : 'secondary'}>
                {data.isPublic ? 'Public' : 'Private'}
              </Badge>
              <Badge variant={data.allowDownloads ? 'default' : 'secondary'}>
                {data.allowDownloads ? 'Downloads Allowed' : 'No Downloads'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/*---------------------------------------------------
 * Small helper components
 *--------------------------------------------------*/
function Info({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className='text-sm text-gray-500'>{label}</p>
      {children ?? <p className='font-medium'>{value || '—'}</p>}
    </div>
  );
}

function LinkRow({
  icon: Icon,
  url,
  label,
}: {
  icon: React.ElementType;
  url?: string;
  label: string;
}) {
  if (!url) return null;
  return (
    <div className='flex items-center gap-2'>
      <Icon className='h-4 w-4 text-gray-500' />
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-1 text-sm text-blue-600 hover:underline'
      >
        {label} <ExternalLink className='h-3 w-3' />
      </a>
    </div>
  );
}
