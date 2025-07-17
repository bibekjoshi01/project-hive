'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, FolderOpen, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutSuccess } from '../redux/auth.slice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    router.push('/login');
    window.location.reload();
  };

  const menuItems = [
    {
      id: 'information',
      label: 'My Information',
      icon: User,
    },
    {
      id: 'projects',
      label: 'My Projects',
      icon: FolderOpen,
    },
  ];

  return (
    <Card className='sticky top-8'>
      <CardHeader>
        <div className='flex flex-col items-center text-center'>
          <Avatar className='mb-4 h-20 w-20'>
            <AvatarImage
              src='/placeholder.svg?height=80&width=80'
              alt='Profile'
            />
            <AvatarFallback className='text-lg'>JD</AvatarFallback>
          </Avatar>
          <h2 className='text-xl font-semibold'>John Doe</h2>
          <p className='text-sm text-gray-500'>Computer Science</p>
          <p className='text-sm text-gray-500'>Batch 2024</p>
        </div>
      </CardHeader>

      <CardContent className='space-y-2'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant='ghost'
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'h-auto w-full cursor-pointer justify-start p-3 text-left',
                activeTab === item.id && 'bg-gray-100 text-gray-900',
              )}
            >
              <Icon className='mr-3 h-5 w-5' />
              <div>
                <div className='font-medium'>{item.label}</div>
              </div>
            </Button>
          );
        })}

        <div className='border-t pt-4'>
          <Button
            variant='outline'
            onClick={handleLogout}
            className='w-full cursor-pointer justify-start border-none text-red-600 shadow-none hover:text-red-700'
          >
            <LogOut className='mr-3 h-5 w-5' />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
