'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { MailIcon, FolderIcon, ClockIcon, TrendingUpIcon } from 'lucide-react';
import { useGetDashboardStatsQuery } from './redux/api';

export default function DashboardPage() {
  const { data: statsData } = useGetDashboardStatsQuery();

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
              {statsData?.contactRequests.total || 0}
            </div>
            <p className='text-muted-foreground text-xs'>
              <span className='text-green-600'>
                {statsData?.contactRequests.new || 0} new
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
              {statsData?.projects.pending || 0}
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
            <div className='text-2xl font-bold'>
              {statsData?.projects.total || 0}
            </div>
            <p className='text-muted-foreground text-xs'>
              <span className='text-green-600'>
                {statsData?.projects.accepted || 0} accepted
              </span>
              ,{' '}
              <span className='text-red-600'>
                {statsData?.projects.rejected || 0} rejected
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
              {Math.round(statsData?.projects.successRate || 0)}%
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
