import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import React from 'react';

const SubmissionSuccess = () => {
  return (
    <Card className='mx-auto max-w-2xl'>
      <CardContent className='p-8 text-center'>
        <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>
          Project Submitted Successfully!
        </h2>
        <p className='mb-6 text-gray-600'>
          Thank you for sharing your project. It will be reviewed and published
          soon.
        </p>
        <div className='flex gap-4'>
          <Button
            onClick={() => (window.location.href = '/browse')}
            className='flex-1 cursor-pointer'
          >
            Browse Projects
          </Button>
          <Button
            variant='outline'
            onClick={() => window.location.reload()}
            className='flex-1 cursor-pointer'
          >
            Submit Another Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionSuccess;
