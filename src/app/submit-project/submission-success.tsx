'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SubmissionSuccess = () => {
  return (
    <Card className='mx-auto mt-20 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl'>
      <CardContent className='p-6 text-center sm:p-8'>
        <CheckCircle className='mx-auto mb-4 h-14 w-full text-green-500 sm:h-16' />
        <h2 className='mb-2 text-xl font-bold text-gray-900 sm:text-2xl'>
          Project Submitted Successfully!
        </h2>
        <p className='mb-6 text-sm text-gray-600 sm:text-base'>
          Thank you for sharing your project. It will be reviewed and published
          soon.
        </p>
        <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
          <Button
            onClick={() => (window.location.href = '/browse')}
            className='w-full flex-1 cursor-pointer'
          >
            Browse Projects
          </Button>
          <Button
            variant='outline'
            onClick={() => window.location.reload()}
            className='w-full flex-1 cursor-pointer'
          >
            Submit Another Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionSuccess;
