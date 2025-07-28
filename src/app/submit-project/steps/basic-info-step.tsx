'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ELevels, IBatch, ICategory, IDepartment } from '../types';
import { Button } from '@/components/ui/button';
import { Camera, Plus, Upload, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { useData } from '../hooks/useData';
import { ProjectFormData } from '../config';

export default function BasicInfoStep() {
  const { batches, departments, levels, categories, loading } = useData();

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const watchedAbstract = watch('abstract', '');
  const charCount = watchedAbstract.length;

  const addTeamMember = () => {
    append({
      id: Date.now().toString(),
      fullName: '',
      rollNo: '',
      photo: null,
    });
  };

  const handlePhotoUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(`teamMembers.${index}.photo`, file);
    }
  };

  return (
    <div className='space-y-8 p-0 md:p-2'>
      <h2 className='mb-8 text-xl font-semibold'>Basic Information</h2>

      {/* Project Title - Full Width */}
      <div className='space-y-2'>
        <Input
          id='title'
          placeholder='Enter your project title'
          className='h-12 text-lg'
          {...register('title')}
        />

        {errors.title && (
          <p className='text-xs text-red-400'>{errors.title.message}</p>
        )}
      </div>

      {/* Abstract - Full Width */}
      <div className='space-y-2'>
        <Textarea
          id='abstract'
          placeholder='Provide a brief description of your project.'
          className='min-h-[120px] resize-none'
          maxLength={500} // enforce max 500 chars
          {...register('abstract')}
        />
        <div className='flex justify-between text-sm text-gray-500'>
          {errors.abstract && (
            <p className='text-xs text-red-400'>{errors.abstract.message}</p>
          )}
          <span className={charCount > 500 ? 'text-red-500' : ''}>
            {charCount}/500 Characters
          </span>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Select
            value={watch('batch') ? JSON.stringify(watch('batch')) : ''}
            onValueChange={(value) =>
              setValue('batch', JSON.parse(value) as IBatch, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className='h-12 w-full focus:border-gray-400'>
              <SelectValue placeholder='Select batch year *' />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch) => (
                <SelectItem key={batch.id} value={JSON.stringify(batch)}>
                  {batch.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.batch && (
            <p className='text-xs text-red-400'>{errors.batch?.id?.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Select
            value={watch('category') ? JSON.stringify(watch('category')) : ''}
            onValueChange={(value) =>
              setValue('category', JSON.parse(value) as ICategory, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className='h-12 w-full focus:border-gray-400'>
              <SelectValue placeholder='Select project category *' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={JSON.stringify(category)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className='text-xs text-red-400'>
              {errors.category?.id?.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Select
            value={
              watch('department') ? JSON.stringify(watch('department')) : ''
            }
            onValueChange={(value) =>
              setValue('department', JSON.parse(value) as IDepartment, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className='h-12 w-full focus:border-gray-400'>
              <SelectValue placeholder='Select department *' />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={JSON.stringify(dept)}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (
            <p className='text-xs text-red-400'>
              {errors.department?.id?.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Select
            value={watch('level') || ''}
            onValueChange={(value) =>
              setValue('level', value as ELevels, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className='h-12 w-full focus:border-gray-400'>
              <SelectValue placeholder='Select academic level *' />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(levels).map(([key, val]) => (
                <SelectItem key={key} value={key}>
                  {val as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.level && (
            <p className='text-xs text-red-400'>{errors.level.message}</p>
          )}
        </div>
      </div>

      {/* Supervisor Section */}
      <div className='space-y-4'>
        <div className='border-t pt-6'>
          <h3 className='mb-4 text-lg font-medium'>Project Supervision</h3>
        </div>

        <div className='space-y-2'>
          <Input
            id='supervisor'
            placeholder="Enter supervisor's full name"
            className='h-12'
            {...register('supervisor')}
          />
          {errors.supervisor && (
            <p className='text-xs text-red-400'>{errors.supervisor.message}</p>
          )}
        </div>
      </div>

      {/* Team Members Section */}
      <div className='space-y-4'>
        <div className='border-t pt-4 sm:pt-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-medium'>Team Members</h3>
          </div>
        </div>

        {fields.length === 0 ? (
          <div className='rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 text-center sm:py-8'>
            <p className='mb-4 text-sm text-gray-500 sm:text-base'>
              No team members added yet
            </p>
            <Button
              type='button'
              onClick={addTeamMember}
              variant='outline'
              className='w-full cursor-pointer bg-transparent sm:w-auto'
            >
              <Plus className='mr-2 h-4 w-4' />
              Add First Team Member
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {fields.map((member, index) => (
              <div
                key={member.id}
                className='relative rounded-lg border bg-gray-50 p-3 sm:p-4'
              >
                {/* Mobile Remove Button (absolute top-right) */}
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className='absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full border-0 bg-red-500 p-0 text-white hover:bg-red-600 sm:hidden'
                >
                  <X className='h-3 w-3' />
                </Button>

                {/* Main content flex container */}
                <div className='flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:pt-0'>
                  {/* Photo Upload - Full width on mobile, fixed width on desktop */}
                  <div className='flex justify-center sm:justify-start'>
                    <div className='group relative'>
                      {(() => {
                        const photo = watch(
                          `teamMembers.${index}.photo`,
                        ) as File | null;
                        return photo ? (
                          <div className='relative'>
                            <Image
                              width={200}
                              height={200}
                              src={
                                URL.createObjectURL(photo) || '/placeholder.svg'
                              }
                              alt='Team member'
                              className='h-16 w-16 rounded-full border-2 border-gray-300 object-cover sm:h-20 sm:w-20'
                            />
                            <div className='bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100'>
                              <Camera className='h-4 w-4 text-white sm:h-5 sm:w-5' />
                            </div>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              onClick={() =>
                                setValue(`teamMembers.${index}.photo`, null)
                              }
                              className='absolute -top-1 -right-1 h-5 w-5 cursor-pointer rounded-full border-0 bg-red-500 p-0 text-white hover:bg-red-600 sm:h-6 sm:w-6'
                            >
                              <X className='h-3 w-3 sm:h-4 sm:w-4' />
                            </Button>
                          </div>
                        ) : (
                          <div className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-100 transition-colors group-hover:border-gray-400 group-hover:bg-gray-200 sm:h-20 sm:w-20'>
                            <Upload className='h-4 w-4 text-gray-400 group-hover:text-gray-600 sm:h-5 sm:w-5' />
                          </div>
                        );
                      })()}
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => handlePhotoUpload(index, e)}
                        className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                      />
                    </div>
                  </div>

                  {/* Form Fields - Stack on mobile, side by side on desktop */}
                  <div className='flex-1 space-y-3 sm:flex sm:gap-4 sm:space-y-0'>
                    {/* Full Name */}
                    <div className='flex-1'>
                      <Input
                        placeholder='Full Name *'
                        className='h-10 text-sm sm:h-12 sm:text-base'
                        {...register(`teamMembers.${index}.fullName`)}
                      />
                      {errors.teamMembers?.[index]?.fullName && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.teamMembers[index]?.fullName?.message}
                        </p>
                      )}
                    </div>

                    {/* Campus Roll No */}
                    <div className='flex-1'>
                      <Input
                        placeholder='Campus Roll No *'
                        className='h-10 text-sm sm:h-12 sm:text-base'
                        {...register(`teamMembers.${index}.rollNo`)}
                      />
                      {errors.teamMembers?.[index]?.rollNo && (
                        <p className='mt-1 text-xs text-red-400'>
                          {errors.teamMembers[index]?.rollNo?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Remove Button (flex item) */}
                  <div className='hidden justify-center sm:flex sm:justify-start'>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className='h-10 w-10 cursor-pointer p-0 text-red-600 hover:bg-red-50 hover:text-red-700 sm:h-12 sm:w-12'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {errors.teamMembers && (
              <p className='text-sm text-red-500'>
                {errors.teamMembers.message}
              </p>
            )}

            <div className='flex justify-center pt-2 sm:justify-end'>
              <Button
                type='button'
                onClick={addTeamMember}
                className='flex w-full cursor-pointer items-center gap-2 sm:w-auto'
              >
                <Plus className='h-4 w-4' />
                Add Member
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
