'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, Edit, Loader2 } from 'lucide-react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../redux/auth.api';
import { useSnackbar } from 'notistack';

interface FormData {
  fullName: string;
  phoneNo: string;
  photoFile: File | null;
  photoUrl: string;
  bio: string;
}

export default function MyInformation() {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const { enqueueSnackbar: toast } = useSnackbar();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNo: '',
    bio: '',
    photoFile: null,
    photoUrl: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: `${profile.firstName} ${profile.lastName}`.trim(),
        phoneNo: profile.phoneNo || '',
        photoFile: null,
        bio: profile.bio || '',
        photoUrl: profile.photo || '',
      });
    }
  }, [profile]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (formData.phoneNo && !/^\+?[\d\s\-]+$/.test(formData.phoneNo.trim())) {
      newErrors.phoneNo = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast('Please select an image file', { variant: 'error' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast('Please select an image smaller than 5MB', { variant: 'error' });
        return;
      }

      const photoUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        photoFile: file,
        photoUrl: photoUrl,
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast('Please fix the errors before saving', { variant: 'error' });
      return;
    }

    try {
      const [firstName, ...rest] = formData.fullName.trim().split(' ');
      const lastName = rest.join(' ');

      // Create FormData for file upload and normal fields
      const body = new FormData();
      body.append('firstName', firstName);
      body.append('lastName', lastName);
      body.append('bio', formData.bio);
      if (formData.phoneNo.trim()) {
        body.append('phoneNo', formData.phoneNo.trim());
      }
      if (formData.photoFile) {
        body.append('photo', formData.photoFile);
      }

      await updateProfile(body).unwrap();

      await refetch();

      setIsEditing(false);

      toast('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      toast('Failed to update profile. Please try again.', {
        variant: 'error',
      });
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        fullName: `${profile.firstName} ${profile.lastName}`.trim(),
        phoneNo: profile.phoneNo || '',
        photoFile: null,
        bio: profile.bio || '',
        photoUrl: profile.photo || '',
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const onPhotoButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='ml-2'>Loading profile...</span>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='text-center'>
          <p className='mb-4 text-red-500'>Failed to load profile</p>
          <Button
            className='cursor-pointer'
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <Card className='border-none px-0 shadow-none'>
        <CardHeader className='relative'>
          <CardTitle>Profile Information</CardTitle>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className='absolute top-4 right-4 flex cursor-pointer items-center gap-2 shadow-none'
              variant='outline'
            >
              <Edit className='h-4 w-4' />
              Edit Profile
            </Button>
          )}
          {isEditing && (
            <div className='absolute top-4 right-4 flex gap-2'>
              <Button
                variant='outline'
                onClick={handleCancel}
                disabled={isSaving}
                className='cursor-pointer'
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className='flex cursor-pointer items-center gap-2'
              >
                {isSaving ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='h-4 w-4' />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Profile Picture Section */}
          <div className='flex items-center gap-6'>
            <div className='relative'>
              <Avatar className='h-24 w-24'>
                <AvatarImage
                  src={
                    formData.photoUrl || '/placeholder.svg?height=96&width=96'
                  }
                  alt='Profile'
                />
                <AvatarFallback className='text-xl'>
                  {profile.firstName?.[0] || 'U'}
                  {profile.lastName?.[0] || 'S'}
                </AvatarFallback>
              </Avatar>

              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handlePhotoChange}
                className='hidden'
              />

              {isEditing && (
                <Button
                  size='sm'
                  className='absolute -right-2 -bottom-2 h-8 w-8 cursor-pointer rounded-full p-0'
                  onClick={onPhotoButtonClick}
                  type='button'
                >
                  <Camera className='h-4 w-4' />
                </Button>
              )}
            </div>

            <div>
              <h3 className='text-lg font-semibold'>
                {formData.fullName || 'Hello User'}
              </h3>
              <p className='text-gray-500'>{profile?.bio}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Full Name */}
            <div className='space-y-2'>
              <Label htmlFor='fullName'>
                Full Name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='fullName'
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                disabled={!isEditing}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className='text-sm text-red-500'>{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                value={profile.email}
                disabled
                className='bg-gray-50'
              />
            </div>

            {/* Username */}
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                value={profile.username}
                disabled
                className='bg-gray-50'
              />
            </div>

            {/* Phone Number */}
            <div className='space-y-2'>
              <Label htmlFor='phoneNo'>Phone Number</Label>
              <Input
                id='phoneNo'
                value={formData.phoneNo}
                onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                disabled={!isEditing}
                className={errors.phoneNo ? 'border-red-500' : ''}
              />
              {errors.phoneNo && (
                <p className='text-sm text-red-500'>{errors.phoneNo}</p>
              )}
            </div>

            {/* User Role */}
            <div className='space-y-2'>
              <Label htmlFor='userRole'>Role</Label>
              <Input
                id='userRole'
                value={profile.userRole}
                disabled
                className='bg-gray-50'
              />
            </div>

            {/* Date Joined */}
            <div className='space-y-2'>
              <Label htmlFor='dateJoined'>Joined On</Label>
              <Input
                id='dateJoined'
                value={new Date(profile.dateJoined).toLocaleDateString()}
                disabled
                className='bg-gray-50'
              />
            </div>
            {/* Bio */}
            <div className='space-y-2 md:col-span-2'>
              <Label htmlFor='bio'>Bio</Label>
              <textarea
                id='bio'
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                className={`w-full rounded-md border p-2 text-sm ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
              />
              {errors.bio && (
                <p className='text-sm text-red-500'>{errors.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
