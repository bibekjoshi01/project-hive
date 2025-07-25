'use client';

import {
  Controller,
  FieldError,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Info, X, Plus } from 'lucide-react';
import type { ProjectFormData } from '../types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FILE_TYPES } from '../config';

export default function TechnicalDetailsStep() {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  console.log(errors, 'err');
  console.log(watch(), 'values');

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  });

  const addFile = () => {
    appendFile({ id: Date.now().toString(), file: null, type: '' });
  };

  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;

    setValue(`files.${index}.file`, file, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className='space-y-6'>
      <h2 className='mb-8 text-xl font-semibold'>Technical Details</h2>

      {/* Technologies Used */}
      <TooltipProvider delayDuration={200}>
        <div className='space-y-2'>
          <div className='flex items-center gap-1'>
            <Label htmlFor='technologies'>Technologies Used</Label>
            {/* info icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='h-4 w-4 cursor-pointer text-gray-400' />
              </TooltipTrigger>
              <TooltipContent
                side='right'
                className='max-w-xs text-xs leading-snug'
              >
                If you have several technologies used, separate them with commas
                (e.g. <code>tech1, tech2, te3h2</code>).
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id='technologies'
            placeholder='React, Python, MongoDB, AutoCAD'
            className='h-12'
            {...register('technologies')}
          />
          {errors.technologies?.message && (
            <p className='text-xs text-red-400'>
              {errors.technologies.message}
            </p>
          )}
        </div>
      </TooltipProvider>

      {/* URLs */}
      <TooltipProvider delayDuration={200}>
        <div className='space-y-2'>
          <div className='flex items-center gap-1'>
            <Label htmlFor='githubUrl'>GitHub Link</Label>

            {/* info icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='h-4 w-4 cursor-pointer text-gray-400' />
              </TooltipTrigger>
              <TooltipContent
                side='right'
                className='max-w-xs text-xs leading-snug'
              >
                If you have several repositories, separate the URLs with commas
                (e.g. <code>repo1, repo2, repo3</code>).
              </TooltipContent>
            </Tooltip>
          </div>

          <Input
            id='githubUrl'
            className='h-12'
            placeholder='Your GitHub Repo Links'
            {...register('githubUrl')}
          />

          {errors.githubUrl?.message && (
            <p className='text-xs text-red-400'>{errors.githubUrl.message}</p>
          )}
        </div>
      </TooltipProvider>

      <div className='space-y-2'>
        <Label htmlFor='documentationUrl'>Documentation Link</Label>
        <Input
          id='documentationUrl'
          className='h-12'
          placeholder='https://docs.your-project.com'
          {...register('documentationUrl')}
        />
        {errors.documentationUrl?.message && (
          <p className='text-xs text-red-400'>
            {errors.documentationUrl.message}
          </p>
        )}
      </div>

      <div className='space-y-4'>
        <div className='border-t pt-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-medium'>Project Files</h3>
          </div>
        </div>

        {/* File Upload */}
        {fileFields.length === 0 ? (
          <div className='rounded-lg border-2 border-dashed border-gray-300 py-8 text-center'>
            <p className='mb-4 text-gray-500'>No project files added yet</p>
            <Button
              type='button'
              className='cursor-pointer'
              onClick={addFile}
              variant='outline'
            >
              <Plus className='mr-2 h-4 w-4' />
              Add First File
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {fileFields.map((field, index) => {
              const fileObj = watch(`files.${index}.file`);
              const typeErr = errors.files?.[index]?.type;

              return (
                <div
                  key={field.id}
                  className='rounded-lg border bg-gray-50 p-4'
                >
                  <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-3'>
                    {/* File Type Select */}
                    <div className='relative'>
                      <Select
                        onValueChange={(value) =>
                          setValue(`files.${index}.type`, value)
                        }
                        value={watch(`files.${index}.type`) || ''}
                      >
                        <SelectTrigger className='h-12 w-full focus:ring-0 focus:ring-offset-0'>
                          <SelectValue placeholder='Select File Type *' />
                        </SelectTrigger>
                        <SelectContent>
                          {FILE_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {typeErr &&
                        typeof typeErr === 'object' &&
                        'message' in typeErr && (
                          <p className='mt-1 text-xs text-red-400'>
                            {(typeErr as FieldError).message}
                          </p>
                        )}
                    </div>

                    {/* File Input */}
                    <div className='relative col-span-2'>
                      <input
                        type='file'
                        className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                        onChange={(e) => handleFileUpload(index, e)}
                        accept='.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip'
                      />
                      <div className='flex h-12 cursor-pointer items-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2'>
                        <Upload className='h-5 w-5 text-gray-400' />
                        <span className='truncate text-gray-600'>
                          {fileObj instanceof File
                            ? fileObj.name
                            : 'Choose File'}
                        </span>
                      </div>
                      {errors.files?.[index]?.file && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.files[index]?.file?.message}
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => removeFile(index)}
                      className='h-12 w-12 cursor-pointer p-0 text-red-600 hover:bg-red-50 hover:text-red-700 md:col-span-1 md:col-start-4'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              );
            })}
            {errors.files && (
              <p className='text-sm text-red-500'>{errors.files.message}</p>
            )}
            <div className='flex justify-end'>
              <Button
                type='button'
                onClick={addFile}
                className='flex cursor-pointer items-center gap-2'
              >
                <Plus className='h-4 w-4' />
                Add File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
