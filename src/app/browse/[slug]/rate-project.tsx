'use client';

import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRateProjectMutation } from '../redux/project.api';
import { useSnackbar } from 'notistack';
import { useAppSelector } from '@/lib/hooks';
import { authState } from '@/app/(auth)/redux/selector';

interface ProjectRatingProps {
  projectId: number;
}

export default function ProjectRating({ projectId }: ProjectRatingProps) {
  const [rating, setRating] = useState(0);
  const [rateProject, { isLoading }] = useRateProjectMutation();
  const { isAuthenticated } = useAppSelector(authState);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (rating === 0) return;

    try {
      await rateProject({ projectId, rating }).unwrap();

      enqueueSnackbar('Rating submitted successfully!', { variant: 'success' });
      setRating(0);
    } catch (error) {
      enqueueSnackbar('Failed to submit rating. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <div className='max-w-md space-y-4 rounded-lg border p-6'>
      <h3 className='text-lg font-semibold'>Rate this project</h3>
      {/* Stars */}
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      {isAuthenticated ? (
        <>
          {/* Send Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isLoading}
            className='w-full cursor-pointer gap-2'
          >
            <Send className='h-4 w-4' />
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </>
      ) : (
        <h4>Please login to rate the project.</h4>
      )}
    </div>
  );
}
