'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import BasicInfoStep from './steps/basic-info-step';
import ProjectDetailsStep from './steps/project-details-step';
import TechnicalDetailsStep from './steps/technical-details-step';
import ReviewStep from './steps/review-step';
import type { ProjectFormData } from './types';

const STEPS = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Project title, author, and category',
  },
  {
    id: 2,
    title: 'Project Details',
    description: 'Description, objectives, and features',
  },
  {
    id: 3,
    title: 'Technical Details',
    description: 'Technologies, files, and documentation',
  },
  {
    id: 4,
    title: 'Review & Submit',
    description: 'Review your information and submit',
  },
];

export default function SubmitProjectForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
    // Basic Info
    title: '',
    abstract: '',
    batch: '',
    department: '',
    level: '',
    category: '',
    supervisor: '',
    teamMembers: [],

    // Project Details
    description: '',
    objectives: '',
    features: [''],
    challenges: '',
    outcomes: '',

    // Technical Details
    technologies: [''],
    githubUrl: '',
    liveUrl: '',
    documentationUrl: '',
    files: [],

    // Additional
    isPublic: true,
    allowDownloads: true,
  });

  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const progress = (currentStep / STEPS.length) * 100;

  if (isSubmitted) {
    return (
      <Card className='mx-auto max-w-2xl'>
        <CardContent className='p-8 text-center'>
          <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
          <h2 className='mb-2 text-2xl font-bold text-gray-900'>
            Project Submitted Successfully!
          </h2>
          <p className='mb-6 text-gray-600'>
            Thank you for sharing your project. It will be reviewed and
            published soon.
          </p>
          <div className='space-y-3'>
            <Button
              onClick={() => (window.location.href = '/browse-projects')}
              className='w-full'
            >
              Browse Projects
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  title: '',
                  abstract: '',
                  batch: '',
                  department: '',
                  level: '',
                  category: '',
                  supervisor: '',
                  teamMembers: [],
                  description: '',
                  objectives: '',
                  features: [''],
                  challenges: '',
                  outcomes: '',
                  technologies: [''],
                  githubUrl: '',
                  liveUrl: '',
                  documentationUrl: '',
                  files: [],
                  isPublic: true,
                  allowDownloads: true,
                });
              }}
              className='w-full'
            >
              Submit Another Project
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Progress Header */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='mb-4 flex items-center justify-between'>
            <CardTitle className='text-lg'>
              Step {currentStep} of {STEPS.length}
            </CardTitle>
            <span className='text-sm text-gray-500'>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className='mb-4' />
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`rounded-lg border-2 p-3 text-center transition-colors ${
                  step.id === currentStep
                    ? 'border-black bg-black text-white'
                    : step.id < currentStep
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                <div className='text-sm font-medium'>{step.title}</div>
                <div className='mt-1 text-xs opacity-80'>
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent className='p-6'>
          {currentStep === 1 && (
            <BasicInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 2 && (
            <ProjectDetailsStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 3 && (
            <TechnicalDetailsStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 4 && <ReviewStep formData={formData} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center justify-between'>
            <Button
              variant='outline'
              onClick={prevStep}
              disabled={currentStep === 1}
              className='flex items-center gap-2'
            >
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Button>

            <div className='text-sm text-gray-500'>
              Step {currentStep} of {STEPS.length}
            </div>

            {currentStep < STEPS.length ? (
              <Button onClick={nextStep} className='flex items-center gap-2'>
                Next
                <ChevronRight className='h-4 w-4' />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='flex items-center gap-2'
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
