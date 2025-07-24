'use client';

import { useState } from 'react';
import { z } from 'zod';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldPath,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BasicInfoStep from './steps/basic-info-step';
import ProjectDetailsStep from './steps/project-details-step';
import TechnicalDetailsStep from './steps/technical-details-step';
import ReviewStep from './steps/review-step';
import SubmissionSuccess from './submission-success';
import {
  basicInfoSchema,
  formSchema,
  projectDetailsSchema,
  ProjectFormData,
  STEPS,
  technicalDetailsSchema,
} from './config';
import { useSubmitProjectMutation } from './redux/api.project';
import { ELevels } from './types';

type Step = (typeof STEPS)[number]['id'];

export default function SubmitProjectForm() {
  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Basic Info
      title: '',
      abstract: '',
      batch: {},
      department: {},
      level: ELevels.UNDERGRADUATE,
      category: {},
      supervisor: '',
      teamMembers: [
        { id: Date.now().toString(), fullName: '', rollNo: '', photo: null },
      ],
      // Project Details
      description: '',
      // Technical Details
      technologies: '',
      githubUrl: '',
      documentationUrl: '',
      files: [{ id: Date.now().toString(), type: 'Other Info', file: null }],
      // Additional
      isPublic: true,
      allowDownloads: true,
    },
    mode: 'onBlur',
  });

  const [currentStep, setCurrentStep] = useState<Step>(1);

  const validateStep = async () => {
    let stepSchema: z.ZodTypeAny;
    switch (currentStep) {
      case 1:
        stepSchema = basicInfoSchema;
        break;
      case 2:
        stepSchema = projectDetailsSchema;
        break;
      case 3:
        stepSchema = technicalDetailsSchema;
        break;
      default:
        stepSchema = formSchema;
    }
    const values = methods.getValues();
    const result = stepSchema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (issue.path.length) {
          const path = issue.path.join('.') as FieldPath<ProjectFormData>;
          methods.setError(path, { message: issue.message });
        }
      });
    }
    return result.success;
  };

  const nextStep = async () => {
    const valid = await validateStep();
    if (!valid) return;
    setCurrentStep((s): Step => (s < STEPS.length ? ((s + 1) as Step) : s));
  };

  const prevStep = () =>
    setCurrentStep((s): Step => (s > 1 ? ((s - 1) as Step) : s));

  const [submitProject, { isLoading }] = useSubmitProjectMutation();

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    
  };

  const progress = (currentStep / STEPS.length) * 100;

  // if (isSubmitted) return <SubmissionSuccess />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
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
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className='px-6 py-2'>
            {currentStep === 1 && <BasicInfoStep />}
            {currentStep === 2 && <ProjectDetailsStep />}
            {currentStep === 3 && <TechnicalDetailsStep />}
            {currentStep === 4 && <ReviewStep />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              {currentStep !== 1 ? (
                <Button
                  variant='outline'
                  onClick={prevStep}
                  type='button'
                  className='flex cursor-pointer items-center gap-2'
                >
                  <ChevronLeft className='h-4 w-4' />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              <div className='text-sm text-gray-500'>
                Step {currentStep} of {STEPS.length}
              </div>

              {currentStep < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  type='button'
                  className='flex cursor-pointer items-center gap-2'
                >
                  Next
                  <ChevronRight className='h-4 w-4' />
                </Button>
              ) : (
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='flex cursor-pointer items-center gap-2'
                >
                  {isLoading ? 'Submitting...' : 'Submit Project'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
