'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ProjectFormData } from '../config';

const RichTextEditor = dynamic(() => import('@/components/rich-text-field'), {
  ssr: false,
});

export default function ProjectDetailsStep() {
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  // Watch description value
  const descriptionValue = watch('description', '');

  // Track word count
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = descriptionValue
      ? descriptionValue
          .replace(/<[^>]*>?/gm, '') // strip HTML if any
          .trim()
          .split(/\s+/)
          .filter(Boolean)
      : [];
    setWordCount(words.length);
  }, [descriptionValue]);

  return (
    <div className='space-y-6 p-0 md:p-2'>
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
                onChange={(value) => {
                  field.onChange(value);
                  trigger('description'); // re-validate dynamically
                }}
                placeholder='Describe your project in detail. What does it do? What problem does it solve?'
                className='min-h-[250px]'
              />
            )}
          />

          {/* Error or Word Count */}
          <div className='flex items-center justify-between text-sm'>
            {errors.description ? (
              <p className='text-red-500'>{errors.description.message}</p>
            ) : (
              <p className='text-gray-500'>
                {wordCount} / 200 words (minimum required)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
