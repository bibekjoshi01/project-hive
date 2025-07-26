'use client';

import { useState, useEffect } from 'react';
import MyInformation from './my-information';
import MyProjects from './my-projects';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logoutSuccess } from '../redux/auth.slice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'information');

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs = [
    { id: 'information', label: 'My Information' },
    { id: 'projects', label: 'My Projects' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Update the URL query param without page reload
    router.replace(`?tab=${tabId}`, { scroll: false });
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    router.push('/login');
    window.location.reload();
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='mx-auto w-full max-w-4xl space-y-6 px-4'>
        {/* Header with Tabs and Logout */}
        <div className='flex items-center justify-between'>
          {/* Left: Tabs */}
          <div className='flex gap-4'>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => handleTabClick(tab.id)}
                className={cn('cursor-pointer px-6 py-2')}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Right: Logout */}
          <Button
            variant='outline'
            onClick={handleLogout}
            className='cursor-pointer border-none text-red-600 shadow-none hover:text-red-700'
          >
            <LogOut className='mr-2 h-5 w-5' />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          {activeTab === 'information' && <MyInformation />}
          {activeTab === 'projects' && <MyProjects />}
        </div>
      </div>
    </div>
  );
}
