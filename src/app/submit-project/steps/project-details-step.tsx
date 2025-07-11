'use client';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { ProjectFormData } from '../types';
import { Label } from '@/components/ui/label';

import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/rich-text-field'), {
  ssr: false,
});

export default function ProjectDetailsStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  console.log(errors, 'err');
  console.log(watch(), 'values');

  return (
    <div className='space-y-6'>
      <h2 className='mb-8 text-xl font-semibold'>Project Details</h2>

      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='description'>Project Description *</Label>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder='Describe your project in detail. What does it do? What problem does it solve?'
                className='min-h-[250px]'
              />
            )}
          />
          {errors.description && (
            <p className='text-sm text-red-500'>{errors.description.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
