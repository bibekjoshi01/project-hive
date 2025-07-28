'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { EyeIcon } from 'lucide-react';

type ProjectStatus = 'Pending' | 'Accepted' | 'Rejected';

interface Project {
  id: string;
  name: string;
  description: string; // Added description for detail view
  status: ProjectStatus;
  submittedAt: string;
  submittedBy: string; // Added submittedBy for detail view
  files: string[]; // Added files for detail view
}

const initialProjects: Project[] = [
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

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const router = useRouter();

  const updateProjectStatus = (id: string, newStatus: ProjectStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project,
      ),
    );
  };

  const handleAccept = (id: string) => {
    updateProjectStatus(id, 'Accepted');
  };

  const handleReject = (id: string) => {
    updateProjectStatus(id, 'Rejected');
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  const handleLogout = () => {
    // In a real app, you'd clear session/token here
    router.push('/login');
  };

  return (
    <div className='flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
        <Card>
          <CardHeader>
            <CardTitle>Submitted Projects</CardTitle>
            <CardDescription>
              Manage and review projects submitted to the archive system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Submitted At
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className='font-medium'>
                      {project.name}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {project.submittedAt}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleView(project.id)}
                        >
                          <EyeIcon className='h-4 w-4' />
                          <span className='sr-only'>View</span>
                        </Button>
                        {project.status === 'Pending' && (
                          <>
                            <Button
                              size='sm'
                              onClick={() => handleAccept(project.id)}
                            >
                              Accept
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handleReject(project.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
