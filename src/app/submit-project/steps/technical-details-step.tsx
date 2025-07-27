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
import { FILE_TYPES, ProjectFormData } from '../config';

export default function TechnicalDetailsStep() {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  });

  const addFile = () => {
    appendFile({ id: Date.now().toString(), file: null, type: 'Report' });
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
    <div className='space-y-6 p-0 md:p-2'>
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
        <div className='border-t pt-4 sm:pt-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-medium'>Project Files</h3>
          </div>
        </div>

        {fileFields.length === 0 ? (
          <div className='rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 text-center sm:py-8'>
            <p className='mb-4 text-sm text-gray-500 sm:text-base'>
              No project files added yet
            </p>
            <Button
              type='button'
              className='w-full cursor-pointer bg-transparent sm:w-auto'
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
              const fileObj = watch(`files.${index}.file`) as File | null;
              const typeErr = errors.files?.[index]?.type as
                | FieldError
                | undefined;
              const fileErr = errors.files?.[index]?.file as
                | FieldError
                | undefined;

              return (
                <div
                  key={field.id}
                  className='relative rounded-lg border bg-gray-50 p-3 sm:p-4'
                >
                  {/* Mobile Remove Button (absolute top-right) */}
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => removeFile(index)}
                    className='absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full border-0 bg-red-500 p-0 text-white hover:bg-red-600 md:hidden'
                  >
                    <X className='h-3 w-3' />
                  </Button>

                  {/* Main content flex container */}
                  <div className='flex flex-col gap-3 pt-8 md:flex-row md:items-center md:pt-0'>
                    {/* File Type Select */}
                    <div className='w-full md:w-1/3'>
                      <Select
                        onValueChange={(value) =>
                          setValue(`files.${index}.type`, value as any)
                        }
                        value={watch(`files.${index}.type`) || ''}
                      >
                        <SelectTrigger className='h-10 w-full text-sm focus:ring-0 focus:ring-offset-0 sm:h-12 sm:text-base'>
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
                      {typeErr && (
                        <p className='mt-1 text-xs text-red-400'>
                          {typeErr.message}
                        </p>
                      )}
                    </div>

                    {/* File Input */}
                    <div className='w-full md:flex-1'>
                      <label className='block'>
                        <input
                          type='file'
                          className='sr-only' // Hide default input visually
                          onChange={(e) => handleFileUpload(index, e)}
                          accept='.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip'
                        />
                        <div className='flex h-10 cursor-pointer items-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:h-12 sm:text-base'>
                          <Upload className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                          <span className='truncate text-gray-600'>
                            {fileObj instanceof File
                              ? fileObj.name
                              : 'Choose File'}
                          </span>
                        </div>
                      </label>
                      {fileErr && (
                        <p className='mt-1 text-xs text-red-400'>
                          {fileErr.message}
                        </p>
                      )}
                    </div>

                    {/* Desktop Remove Button (flex item) */}
                    <div className='hidden md:flex md:justify-center md:pl-4'>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => removeFile(index)}
                        className='h-10 w-10 cursor-pointer p-0 text-red-600 hover:bg-red-50 hover:text-red-700 sm:h-12 sm:w-12'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {errors.files &&
              typeof errors.files === 'object' &&
              'message' in errors.files && (
                <p className='text-sm text-red-500'>
                  {(errors.files as FieldError).message}
                </p>
              )}
            <div className='flex justify-center pt-2 sm:justify-end'>
              <Button
                type='button'
                onClick={addFile}
                className='flex w-full cursor-pointer items-center gap-2 sm:w-auto'
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
