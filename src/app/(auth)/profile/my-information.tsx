'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, Edit } from 'lucide-react';
import { batches, departments, levels } from '../../browse/data';

export default function MyInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@university.edu',
    rollNo: 'CS2024001',
    batch: '2024',
    department: 'Computer Science',
    level: 'Undergraduate',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate computer science student with interests in web development and machine learning.',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev',
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>My Information</h1>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className='flex items-center gap-2'
          >
            <Edit className='h-4 w-4' />
            Edit Profile
          </Button>
        ) : (
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className='flex items-center gap-2'
            >
              <Save className='h-4 w-4' />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Profile Picture */}
          <div className='flex items-center gap-6'>
            <div className='relative'>
              <Avatar className='h-24 w-24'>
                <AvatarImage
                  src='/placeholder.svg?height=96&width=96'
                  alt='Profile'
                />
                <AvatarFallback className='text-xl'>JD</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size='sm'
                  className='absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0'
                  onClick={() => console.log('Change photo')}
                >
                  <Camera className='h-4 w-4' />
                </Button>
              )}
            </div>
            <div>
              <h3 className='text-lg font-semibold'>{formData.fullName}</h3>
              <p className='text-gray-500'>{formData.department}</p>
              <p className='text-gray-500'>Roll No: {formData.rollNo}</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='fullName'>Full Name *</Label>
              <Input
                id='fullName'
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                disabled={!isEditing}
                className='focus:ring-0 focus:ring-offset-0'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address *</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className='focus:ring-0 focus:ring-offset-0'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='rollNo'>Roll Number *</Label>
              <Input
                id='rollNo'
                value={formData.rollNo}
                onChange={(e) => handleInputChange('rollNo', e.target.value)}
                disabled={!isEditing}
                className='focus:ring-0 focus:ring-offset-0'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className='focus:ring-0 focus:ring-offset-0'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='batch'>Batch Year *</Label>
              {isEditing ? (
                <Select
                  value={formData.batch}
                  onValueChange={(value) => handleInputChange('batch', value)}
                >
                  <SelectTrigger className='focus:ring-0 focus:ring-offset-0'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={formData.batch}
                  disabled
                  className='focus:ring-0 focus:ring-offset-0'
                />
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='department'>Department *</Label>
              {isEditing ? (
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleInputChange('department', value)
                  }
                >
                  <SelectTrigger className='focus:ring-0 focus:ring-offset-0'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={formData.department}
                  disabled
                  className='focus:ring-0 focus:ring-offset-0'
                />
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='level'>Academic Level *</Label>
              {isEditing ? (
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange('level', value)}
                >
                  <SelectTrigger className='focus:ring-0 focus:ring-offset-0'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={formData.level}
                  disabled
                  className='focus:ring-0 focus:ring-offset-0'
                />
              )}
            </div>
          </div>

          {/* Bio */}
          <div className='space-y-2'>
            <Label htmlFor='bio'>Bio</Label>
            <Textarea
              id='bio'
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              className='min-h-[100px] resize-none focus:ring-0 focus:ring-offset-0'
              placeholder='Tell us about yourself...'
            />
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-medium'>Social Links</h4>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='linkedin'>LinkedIn</Label>
                <Input
                  id='linkedin'
                  value={formData.linkedin}
                  onChange={(e) =>
                    handleInputChange('linkedin', e.target.value)
                  }
                  disabled={!isEditing}
                  className='focus:ring-0 focus:ring-offset-0'
                  placeholder='https://linkedin.com/in/username'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='github'>GitHub</Label>
                <Input
                  id='github'
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  disabled={!isEditing}
                  className='focus:ring-0 focus:ring-offset-0'
                  placeholder='https://github.com/username'
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='portfolio'>Portfolio Website</Label>
                <Input
                  id='portfolio'
                  value={formData.portfolio}
                  onChange={(e) =>
                    handleInputChange('portfolio', e.target.value)
                  }
                  disabled={!isEditing}
                  className='focus:ring-0 focus:ring-offset-0'
                  placeholder='https://yourportfolio.com'
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
