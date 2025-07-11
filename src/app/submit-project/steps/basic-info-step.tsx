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
import type { ProjectFormData } from '../types';

interface BasicInfoStepProps {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ProjectFormData>) => void;
}

export default function BasicInfoStep({
  formData,
  updateFormData,
}: BasicInfoStepProps) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Basic Information</h2>
        <p className='mb-6 text-gray-600'>
          Let&apos;s start with the basic details about your project.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='title'>Project Title *</Label>
          <Input
            id='title'
            placeholder='Enter your project title'
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className='h-12'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='author'>Author Name *</Label>
          <Input
            id='author'
            placeholder='Your full name'
            value={formData.author}
            onChange={(e) => updateFormData({ author: e.target.value })}
            className='h-12'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email Address *</Label>
          <Input
            id='email'
            type='email'
            placeholder='your.email@example.com'
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className='h-12'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='batch'>Batch Year *</Label>
          <Select
            value={formData.batch}
            onValueChange={(value) => updateFormData({ batch: value })}
          >
            <SelectTrigger className='h-12'>
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
          <Label htmlFor='department'>Department *</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => updateFormData({ department: value })}
          >
            <SelectTrigger className='h-12'>
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
            <SelectTrigger className='h-12'>
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

        <div className='space-y-2 md:col-span-2'>
          <Label htmlFor='category'>Project Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData({ category: value })}
          >
            <SelectTrigger className='h-12'>
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
      </div>
    </div>
  );
}
