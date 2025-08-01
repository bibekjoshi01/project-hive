'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

// Define the Project type (should ideally be shared from a common types file)
type ProjectStatus = 'Pending' | 'Accepted' | 'Rejected';

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  submittedAt: string;
  submittedBy: string;
  files: string[];
}

// Mock data for demonstration purposes
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign Phase 1',
    description:
      'Complete overhaul of the company website, focusing on modern UI/UX and improved performance. Includes new landing pages and blog integration.',
    status: 'Pending',
    submittedAt: '2023-10-26',
    submittedBy: 'Alice Johnson',
    files: ['design_mockups.zip', 'content_plan.pdf'],
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    description:
      'Development of a Minimum Viable Product for the new mobile application, targeting iOS and Android platforms. Core features include user authentication and basic data display.',
    status: 'Pending',
    submittedAt: '2023-10-25',
    submittedBy: 'Bob Smith',
    files: ['app_spec.docx', 'wireframes.sketch'],
  },
  {
    id: '3',
    name: 'E-commerce Platform Integration',
    description:
      'Integration of a new e-commerce platform with existing inventory and CRM systems. Focus on seamless data flow and order processing.',
    status: 'Accepted',
    submittedAt: '2023-10-24',
    submittedBy: 'Charlie Brown',
    files: ['integration_plan.pdf', 'api_docs.zip'],
  },
  {
    id: '4',
    name: 'Internal CRM Development',
    description:
      'Building a custom CRM system for internal sales and customer support teams. Features include lead tracking, customer history, and reporting.',
    status: 'Rejected',
    submittedAt: '2023-10-23',
    submittedBy: 'Diana Prince',
    files: ['crm_requirements.pdf'],
  },
  {
    id: '5',
    name: 'Marketing Campaign Analytics',
    description:
      'Development of a dashboard to track and analyze the performance of ongoing marketing campaigns. Includes data visualization and custom reporting features.',
    status: 'Pending',
    submittedAt: '2023-10-22',
    submittedBy: 'Eve Adams',
    files: ['analytics_spec.xlsx', 'dashboard_mockups.png'],
  },
];

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const project = mockProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-950'>
        <Card className='w-full max-w-2xl'>
          <CardHeader>
            <CardTitle>Project Not Found</CardTitle>
            <CardDescription>
              The project with ID &quot;{projectId}&quot; could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()}>
              <ArrowLeftIcon className='mr-2 h-4 w-4' />
              Go Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-gray-100 p-4 md:p-6 dark:bg-gray-950'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 dark:bg-gray-900'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.back()}
          className='mr-2'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span className='sr-only'>Go back</span>
        </Button>
        <h1 className='text-lg font-semibold md:text-xl'>Project Details</h1>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
        <Card>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>
              Details for the submitted project.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Submitted By
                </p>
                <p className='text-base font-semibold'>{project.submittedBy}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Submitted At
                </p>
                <p className='text-base font-semibold'>{project.submittedAt}</p>
              </div>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Status
              </p>
              <Badge
                variant={
                  project.status === 'Accepted'
                    ? 'default'
                    : project.status === 'Rejected'
                      ? 'destructive'
                      : 'secondary'
                }
              >
                {project.status}
              </Badge>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Description
              </p>
              <p className='text-base'>{project.description}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Attached Files
              </p>
              {project.files.length > 0 ? (
                <ul className='list-disc pl-5'>
                  {project.files.map((file, index) => (
                    <li key={index} className='text-base'>
                      {file}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-base text-gray-500 dark:text-gray-400'>
                  No files attached.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
