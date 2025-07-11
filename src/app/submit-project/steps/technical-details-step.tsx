'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Upload } from 'lucide-react';
import type { ProjectFormData } from '../types';

interface TechnicalDetailsStepProps {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ProjectFormData>) => void;
}

export default function TechnicalDetailsStep({
  formData,
  updateFormData,
}: TechnicalDetailsStepProps) {
  const addTechnology = () => {
    updateFormData({ technologies: [...formData.technologies, ''] });
  };

  const removeTechnology = (index: number) => {
    const newTechnologies = formData.technologies.filter((_, i) => i !== index);
    updateFormData({ technologies: newTechnologies });
  };

  const updateTechnology = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    updateFormData({ technologies: newTechnologies });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Technical Details</h2>
        <p className='mb-6 text-gray-600'>
          Share the technical aspects and resources of your project.
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label>Technologies Used *</Label>
          <div className='space-y-3'>
            {formData.technologies.map((tech, index) => (
              <div key={index} className='flex gap-2'>
                <Input
                  placeholder={`Technology ${index + 1} (e.g., React, Python, MongoDB)`}
                  value={tech}
                  onChange={(e) => updateTechnology(index, e.target.value)}
                  className='h-12'
                />
                {formData.technologies.length > 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => removeTechnology(index)}
                    className='h-12 w-12 p-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type='button'
              variant='outline'
              onClick={addTechnology}
              className='flex items-center gap-2 bg-transparent'
            >
              <Plus className='h-4 w-4' />
              Add Technology
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='githubUrl'>GitHub Repository</Label>
            <Input
              id='githubUrl'
              placeholder='https://github.com/username/project'
              value={formData.githubUrl}
              onChange={(e) => updateFormData({ githubUrl: e.target.value })}
              className='h-12'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='liveUrl'>Live Demo URL</Label>
            <Input
              id='liveUrl'
              placeholder='https://your-project-demo.com'
              value={formData.liveUrl}
              onChange={(e) => updateFormData({ liveUrl: e.target.value })}
              className='h-12'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='documentationUrl'>Documentation URL</Label>
          <Input
            id='documentationUrl'
            placeholder='https://docs.your-project.com'
            value={formData.documentationUrl}
            onChange={(e) =>
              updateFormData({ documentationUrl: e.target.value })
            }
            className='h-12'
          />
        </div>

        <div className='space-y-2'>
          <Label>Project Files</Label>
          <div className='rounded-lg border-2 border-dashed border-gray-300 p-6 text-center'>
            <Upload className='mx-auto mb-4 h-12 w-12 text-gray-400' />
            <p className='mb-2 text-gray-600'>
              Upload project files, screenshots, or documentation
            </p>
            <p className='mb-4 text-sm text-gray-500'>
              Supported formats: PDF, DOC, PNG, JPG, ZIP (Max 10MB each)
            </p>
            <Button variant='outline'>Choose Files</Button>
          </div>
        </div>

        <div className='space-y-4'>
          <Label>Project Settings</Label>
          <div className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='isPublic'
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  updateFormData({ isPublic: checked as boolean })
                }
              />
              <Label htmlFor='isPublic' className='text-sm font-normal'>
                Make this project publicly visible
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='allowDownloads'
                checked={formData.allowDownloads}
                onCheckedChange={(checked) =>
                  updateFormData({ allowDownloads: checked as boolean })
                }
              />
              <Label htmlFor='allowDownloads' className='text-sm font-normal'>
                Allow others to download project files
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
