'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useRouter } from 'next/navigation';
import { MailIcon, FolderIcon, ClockIcon, TrendingUpIcon } from 'lucide-react';

// Mock data for stats
const statsData = {
  contactRequests: {
    total: 12,
    new: 5,
    read: 4,
    replied: 3,
  },
  projects: {
    total: 28,
    pending: 8,
    accepted: 15,
    rejected: 5,
  },
};

export default function DashboardPage() {
  const router = useRouter();

  const handleViewAllProjects = () => {
    router.push('/dashboard/projects');
  };

  const handleViewAllContacts = () => {
    router.push('/dashboard/contact-requests');
  };

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'default';
      case 'Read':
        return 'secondary';
      case 'Replied':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'Pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      {/* Welcome Section */}
      <div>
        <h2 className='text-3xl font-bold tracking-tight'>
          Dashboard Overview
        </h2>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Total Contact Requests */}
        <Card className='shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Contact Requests
            </CardTitle>
            <MailIcon className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {statsData.contactRequests.total}
            </div>
            <p className='text-muted-foreground text-xs'>
              <span className='text-green-600'>
                {statsData.contactRequests.new} new
              </span>{' '}
              this week
            </p>
          </CardContent>
        </Card>

        {/* Pending Projects */}
        <Card className='shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Projects
            </CardTitle>
            <ClockIcon className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {statsData.projects.pending}
            </div>
            <p className='text-muted-foreground text-xs'>Awaiting review</p>
          </CardContent>
        </Card>

        {/* Total Projects */}
        <Card className='shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Projects
            </CardTitle>
            <FolderIcon className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{statsData.projects.total}</div>
            <p className='text-muted-foreground text-xs'>
              <span className='text-green-600'>
                {statsData.projects.accepted} accepted
              </span>
              ,{' '}
              <span className='text-red-600'>
                {statsData.projects.rejected} rejected
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className='shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Success Rate</CardTitle>
            <TrendingUpIcon className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {Math.round(
                (statsData.projects.accepted /
                  (statsData.projects.accepted + statsData.projects.rejected)) *
                  100,
              )}
              %
            </div>
            <p className='text-muted-foreground text-xs'>
              Project approval rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
