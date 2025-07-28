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
        <div className='flex flex-wrap items-center justify-between gap-3'>
          {/* Left: Tabs */}
          <div className='flex flex-1 flex-wrap gap-2 sm:gap-4'>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  'min-w-0 flex-1 cursor-pointer px-3 py-2 text-sm sm:flex-none sm:px-6 sm:text-base',
                  'sm:min-w-[auto]',
                )}
              >
                <span className='truncate'>{tab.label}</span>
              </Button>
            ))}
          </div>

          {/* Right: Logout */}
          <div className='flex justify-end sm:justify-start'>
            <Button
              variant='outline'
              onClick={handleLogout}
              className='w-full cursor-pointer justify-center border-none bg-transparent px-3 text-red-600 shadow-none hover:text-red-700 sm:w-auto sm:justify-start sm:px-4'
            >
              <LogOut className='mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5' />
              <span className='xs:inline hidden sm:inline'>Logout</span>
            </Button>
          </div>
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
