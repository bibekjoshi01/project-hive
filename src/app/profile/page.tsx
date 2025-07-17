'use client';

import { useState } from 'react';
import ProfileSidebar from './profile-sidebar';
import MyInformation from './my-information';
import MyProjects from './my-projects';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('information');

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            {activeTab === 'information' && <MyInformation />}
            {activeTab === 'projects' && <MyProjects />}
          </div>
        </div>
      </div>
    </div>
  );
}
