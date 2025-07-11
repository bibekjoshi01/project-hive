'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Github, Globe } from 'lucide-react';
import type { ProjectFormData } from '../types';

interface ReviewStepProps {
  formData: ProjectFormData;
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Review & Submit</h2>
        <p className='mb-6 text-gray-600'>
          Please review your project information before submitting.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <p className='text-sm text-gray-500'>Project Title</p>
                <p className='font-medium'>{formData.title}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Author</p>
                <p className='font-medium'>{formData.author}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Email</p>
                <p className='font-medium'>{formData.email}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Batch</p>
                <p className='font-medium'>{formData.batch}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Department</p>
                <p className='font-medium'>{formData.department}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Level</p>
                <p className='font-medium'>{formData.level}</p>
              </div>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Category</p>
              <Badge variant='outline' className='mt-1'>
                {formData.category}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='mb-2 text-sm text-gray-500'>Description</p>
              <p className='text-sm leading-relaxed'>{formData.description}</p>
            </div>
            <div>
              <p className='mb-2 text-sm text-gray-500'>Objectives</p>
              <p className='text-sm leading-relaxed'>{formData.objectives}</p>
            </div>
            <div>
              <p className='mb-2 text-sm text-gray-500'>Key Features</p>
              <ul className='list-inside list-disc space-y-1'>
                {formData.features
                  .filter((f) => f.trim())
                  .map((feature, index) => (
                    <li key={index} className='text-sm'>
                      {feature}
                    </li>
                  ))}
              </ul>
            </div>
            {formData.challenges && (
              <div>
                <p className='mb-2 text-sm text-gray-500'>Challenges</p>
                <p className='text-sm leading-relaxed'>{formData.challenges}</p>
              </div>
            )}
            {formData.outcomes && (
              <div>
                <p className='mb-2 text-sm text-gray-500'>Outcomes</p>
                <p className='text-sm leading-relaxed'>{formData.outcomes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              Technical Details
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='mb-2 text-sm text-gray-500'>Technologies Used</p>
              <div className='flex flex-wrap gap-2'>
                {formData.technologies
                  .filter((t) => t.trim())
                  .map((tech, index) => (
                    <Badge key={index} variant='outline'>
                      {tech}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              {formData.githubUrl && (
                <div className='flex items-center gap-2'>
                  <Github className='h-4 w-4 text-gray-500' />
                  <a
                    href={formData.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-1 text-sm text-blue-600 hover:underline'
                  >
                    GitHub <ExternalLink className='h-3 w-3' />
                  </a>
                </div>
              )}
              {formData.liveUrl && (
                <div className='flex items-center gap-2'>
                  <Globe className='h-4 w-4 text-gray-500' />
                  <a
                    href={formData.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-1 text-sm text-blue-600 hover:underline'
                  >
                    Live Demo <ExternalLink className='h-3 w-3' />
                  </a>
                </div>
              )}
              {formData.documentationUrl && (
                <div className='flex items-center gap-2'>
                  <ExternalLink className='h-4 w-4 text-gray-500' />
                  <a
                    href={formData.documentationUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-1 text-sm text-blue-600 hover:underline'
                  >
                    Documentation <ExternalLink className='h-3 w-3' />
                  </a>
                </div>
              )}
            </div>

            <div className='space-y-2'>
              <p className='text-sm text-gray-500'>Project Settings</p>
              <div className='flex gap-4'>
                <Badge variant={formData.isPublic ? 'default' : 'secondary'}>
                  {formData.isPublic ? 'Public' : 'Private'}
                </Badge>
                <Badge
                  variant={formData.allowDownloads ? 'default' : 'secondary'}
                >
                  {formData.allowDownloads
                    ? 'Downloads Allowed'
                    : 'No Downloads'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
