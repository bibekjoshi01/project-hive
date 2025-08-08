'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { ProjectFormData } from '../config';
import { TextEditor } from '@/components/editor';

export default function ProjectDetailsStep() {
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  const [wordCount, setWordCount] = useState<number>(0);

  // Watch the description form value (JSON string)
  const descriptionValue = watch('description', '') ?? '';

  // Safely parse initialEditorState JSON to string or empty string if invalid
  const safeInitialEditorState = (() => {
    try {
      if (!descriptionValue) return undefined;
      JSON.parse(descriptionValue);
      return descriptionValue;
    } catch {
      return undefined;
    }
  })();

  // Update word count based on plain text extracted from editor content
  useEffect(() => {
    if (!descriptionValue) {
      setWordCount(0);
      return;
    }

    try {
      const parsed = JSON.parse(descriptionValue);
      const extractPlainText = (node: any): string => {
        if (!node) return '';
        if (typeof node.text === 'string') return node.text;
        if (node.children && Array.isArray(node.children)) {
          return node.children.map(extractPlainText).join(' ');
        }
        return '';
      };
      const plainText = extractPlainText(parsed.root);
      const words = plainText.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    } catch {
      // Fallback: If JSON parse fails, set wordCount 0
      setWordCount(0);
    }
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
              <TextEditor
                initialEditorState={safeInitialEditorState}
                onChange={(payload: any) => {
                  // Payload includes json, html, plainText
                  const json =
                    typeof payload === 'string'
                      ? payload
                      : (payload?.json ?? '');
                  const plainText =
                    typeof payload === 'string'
                      ? undefined
                      : payload?.plainText;

                  field.onChange(json || '');

                  // Compute word count from plainText fallback to empty string
                  const words = plainText
                    ? plainText.trim().split(/\s+/).filter(Boolean)
                    : [];
                  setWordCount(words.length);

                  trigger('description');
                }}
                placeholder='Describe your project in detail. What does it do? What problem does it solve?'
                className='min-h-[250px] w-full'
              />
            )}
          />

          {/* Error or word count */}
          <div className='flex items-center justify-between text-sm'>
            <p className='text-red-500'>{errors.description?.message}</p>
            <p className='text-gray-500'>
              {wordCount} / 200 words (minimum required)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
