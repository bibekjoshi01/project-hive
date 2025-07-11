'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { batches, departments, levels, categories } from '../../browse/data';
import type { ProjectFormData, TeamMember } from '../types';
import { Button } from '@/components/ui/button';
import { Camera, Plus, Upload, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface BasicInfoStepProps {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ProjectFormData>) => void;
}

export default function BasicInfoStep({
  formData,
  updateFormData,
}: BasicInfoStepProps) {
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      fullName: '',
      rollNo: '',
      photo: null,
    };
    updateFormData({ teamMembers: [...formData.teamMembers, newMember] });
  };

  const removeTeamMember = (id: string) => {
    const newTeamMembers = formData.teamMembers.filter(
      (member) => member.id !== id,
    );
    updateFormData({ teamMembers: newTeamMembers });
  };

  const updateTeamMember = (
    id: string,
    field: keyof TeamMember,
    value: string | File | null,
  ) => {
    const newTeamMembers = formData.teamMembers.map((member) =>
      member.id === id ? { ...member, [field]: value } : member,
    );
    updateFormData({ teamMembers: newTeamMembers });
  };

  const handlePhotoUpload = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      updateTeamMember(id, 'photo', file);
    }
  };

  const wordCount = formData.abstract
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Basic Information</h2>
        <p className='mb-6 text-gray-600'>
          Let&lsquo;s start with the basic details about your project.
        </p>
      </div>

      {/* Project Title - Full Width */}
      <div className='space-y-2'>
        <Label htmlFor='title'>Project Title *</Label>
        <Input
          id='title'
          placeholder='Enter your project title'
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className='h-12 text-lg'
        />
      </div>

      {/* Abstract - Full Width */}
      <div className='space-y-2'>
        <Label htmlFor='abstract'>Project Abstract *</Label>
        <Textarea
          id='abstract'
          placeholder='Provide a brief description of your project.'
          value={formData.abstract}
          onChange={(e) => updateFormData({ abstract: e.target.value })}
          className='min-h-[120px] resize-none'
          maxLength={300}
        />
        <div className='flex justify-between text-sm text-gray-500'>
          <span className={wordCount > 300 ? 'text-red-500' : ''}>
            {wordCount}/300 words
          </span>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='batch'>Batch Year *</Label>
          <Select
            value={formData.batch}
            onValueChange={(value) => updateFormData({ batch: value })}
          >
            <SelectTrigger className='h-12 w-full'>
              <SelectValue placeholder='Select batch year' />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>Project Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData({ category: value })}
          >
            <SelectTrigger className='h-12 w-full'>
              <SelectValue placeholder='Select project category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='department'>Department *</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => updateFormData({ department: value })}
          >
            <SelectTrigger className='h-12 w-full'>
              <SelectValue placeholder='Select department' />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='level'>Academic Level *</Label>
          <Select
            value={formData.level}
            onValueChange={(value) => updateFormData({ level: value })}
          >
            <SelectTrigger className='h-12 w-full'>
              <SelectValue placeholder='Select academic level' />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Supervisor Section */}
      <div className='space-y-4'>
        <div className='border-t pt-6'>
          <h3 className='mb-4 text-lg font-medium'>Project Supervision</h3>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='supervisor'>Supervisor Full Name (Optional)</Label>
          <Input
            id='supervisor'
            placeholder="Enter supervisor's full name"
            value={formData.supervisor}
            onChange={(e) => updateFormData({ supervisor: e.target.value })}
            className='h-12'
          />
        </div>
      </div>

      {/* Team Members Section */}
      <div className='space-y-4'>
        <div className='border-t pt-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-medium'>Team Members</h3>
          </div>
        </div>

        {formData.teamMembers.length === 0 ? (
          <div className='rounded-lg border-2 border-dashed border-gray-300 py-8 text-center'>
            <p className='mb-4 text-gray-500'>No team members added yet</p>
            <Button type='button' onClick={addTeamMember} variant='outline'>
              <Plus className='mr-2 h-4 w-4' />
              Add First Team Member
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {formData.teamMembers.map((member, index) => (
              <div key={member.id} className='rounded-lg border bg-gray-50 p-4'>
                <div className='flex items-center gap-4'>
                  {/* Photo Upload */}
                  <div className='group relative'>
                    {member.photo ? (
                      <div className='relative'>
                        <Image
                          src={
                            URL.createObjectURL(member.photo) ||
                            '/placeholder.svg'
                          }
                          width={200}
                          height={200}
                          alt='Team member'
                          className='h-16 w-16 rounded-full border-2 border-gray-300 object-cover'
                        />
                        <div className='bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100'>
                          <Camera className='h-5 w-5 text-white' />
                        </div>
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            updateTeamMember(member.id, 'photo', null)
                          }
                          className='absolute -top-1 -right-1 h-5 w-5 rounded-full border-0 bg-red-500 p-0 text-white hover:bg-red-600'
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </div>
                    ) : (
                      <div className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-100 transition-colors group-hover:border-gray-400 group-hover:bg-gray-200'>
                        <Upload className='h-5 w-5 text-gray-400 group-hover:text-gray-600' />
                      </div>
                    )}
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handlePhotoUpload(member.id, e)}
                      className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                    />
                  </div>

                  {/* Full Name */}
                  <div className='flex-1'>
                    <Input
                      placeholder='Full Name *'
                      value={member.fullName}
                      onChange={(e) =>
                        updateTeamMember(member.id, 'fullName', e.target.value)
                      }
                      className='h-12'
                    />
                  </div>

                  {/* Campus Roll No */}
                  <div className='flex-1'>
                    <Input
                      placeholder='Campus Roll No *'
                      value={member.rollNo}
                      onChange={(e) =>
                        updateTeamMember(member.id, 'rollNo', e.target.value)
                      }
                      className='h-12'
                    />
                  </div>

                  {/* Remove Button */}
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => removeTeamMember(member.id)}
                    className='h-12 w-12 p-0 text-red-600 hover:bg-red-50 hover:text-red-700'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
            <div className='flex justify-end'>
              <Button
                type='button'
                onClick={addTeamMember}
                className='flex items-center gap-2'
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
