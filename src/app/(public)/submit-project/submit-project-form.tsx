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
import { useSnackbar } from 'notistack';
import { preparePayload } from './preparePayload';

type Step = (typeof STEPS)[number]['id'];

export default function SubmitProjectForm() {
  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Basic Info
      title: '',
      abstract: '',
      batch: null,
      department: null,
      level: ELevels.Bachelors,
      category: null,
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
    },
    mode: 'onBlur',
  });

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const [submitProject] = useSubmitProjectMutation();

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    setIsLoading(true);
    try {
      const payload = await preparePayload(data);
      await submitProject(payload).unwrap();
      enqueueSnackbar('Project submitted successfully!', {
        variant: 'success',
      });
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      enqueueSnackbar('Failed to submit project. Please check your data.', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  if (isSubmitted) return <SubmissionSuccess />;

  return (
    <>
      {!isSubmitted && (
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Submit Your Project
          </h1>
          <p className='mt-2 text-gray-600'>
            Share your amazing work with the community
          </p>
        </div>
      )}

      <FormProvider {...methods}>
        {/* Progress Header */}
        <Card className='mb-4 shadow-none'>
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
        <Card className='mb-4 shadow-none'>
          <CardContent className='px-6 py-2'>
            {currentStep === 2 && <BasicInfoStep />}
            {currentStep === 2 && <ProjectDetailsStep />}
            {currentStep === 1 && <TechnicalDetailsStep />}
            {currentStep === 4 && <ReviewStep />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className='mb-4 shadow-none'>
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
                  <span className='sm:hidden'>Prev</span>
                  <span className='hidden sm:inline'>Previous</span>
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
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Button
                    type='submit'
                    disabled={isLoading}
                    className='flex cursor-pointer items-center gap-2'
                  >
                    {isLoading ? 'Submitting...' : 'Submit Project'}
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </FormProvider>
    </>
  );
}
