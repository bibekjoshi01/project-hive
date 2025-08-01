'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EyeIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useState } from 'react';

type ContactStatus = 'New' | 'Read' | 'Replied';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  submittedAt: string;
}

const mockContactRequests: ContactRequest[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    subject: 'Project Inquiry',
    message:
      "Hi, I'm interested in discussing a potential web development project for my startup. Could we schedule a call to discuss the requirements and timeline?",
    status: 'New',
    submittedAt: '2023-10-26 14:30',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Partnership Opportunity',
    message:
      "Hello, I represent a marketing agency and we're looking for development partners. We have several clients who need custom web solutions.",
    status: 'Read',
    submittedAt: '2023-10-25 09:15',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@techcorp.com',
    phone: '+1 (555) 987-6543',
    subject: 'Technical Support',
    message:
      "We're experiencing some issues with our current website and need technical assistance. The contact form isn't working properly.",
    status: 'Replied',
    submittedAt: '2023-10-24 16:45',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@startup.io',
    subject: 'Quote Request',
    message:
      'Looking for a quote on developing a mobile-responsive e-commerce website. We need it to integrate with our existing inventory system.',
    status: 'New',
    submittedAt: '2023-10-23 11:20',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'd.wilson@nonprofit.org',
    phone: '+1 (555) 456-7890',
    subject: 'Non-profit Website',
    message:
      'Our non-profit organization needs a new website to better showcase our mission and accept donations online. We have a limited budget.',
    status: 'Read',
    submittedAt: '2023-10-22 13:10',
  },
];

export default function ContactRequestsPage() {
  const [requests, setRequests] =
    useState<ContactRequest[]>(mockContactRequests);
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(
    null,
  );

  const handleViewRequest = (request: ContactRequest) => {
    setSelectedRequest(request);
    // Mark as read if it was new
    if (request.status === 'New') {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === request.id
            ? { ...req, status: 'Read' as ContactStatus }
            : req,
        ),
      );
    }
  };

  const getStatusColor = (status: ContactStatus) => {
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

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='grid gap-4 md:grid-cols-3'>
        {/* Contact Requests Table */}
        <div className='md:col-span-2'>
          <Card className='shadow-none'>
            <CardHeader>
              <CardTitle className='text-3xl'>Contact Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Subject
                    </TableHead>
                    <TableHead className='hidden lg:table-cell'>
                      Submitted
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{request.name}</span>
                          <span className='text-sm text-gray-500 dark:text-gray-400'>
                            {request.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <span className='font-medium'>{request.subject}</span>
                      </TableCell>
                      <TableCell className='hidden lg:table-cell'>
                        {request.submittedAt}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button
                          size='sm'
                          variant='outline'
                          className='cursor-pointer'
                          onClick={() => handleViewRequest(request)}
                        >
                          <EyeIcon className='h-4 w-4' />
                          <span className='sr-only'>View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Contact Request Details */}
        <div className='md:col-span-1'>
          <Card className='shadow-none'>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRequest ? (
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-lg font-semibold'>
                      {selectedRequest.name}
                    </h3>
                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                      <MailIcon className='h-4 w-4' />
                      <span>{selectedRequest.email}</span>
                    </div>
                    {selectedRequest.phone && (
                      <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                        <PhoneIcon className='h-4 w-4' />
                        <span>{selectedRequest.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      Subject
                    </p>
                    <p className='font-medium'>{selectedRequest.subject}</p>
                  </div>

                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      Message
                    </p>
                    <p className='text-sm leading-relaxed'>
                      {selectedRequest.message}
                    </p>
                  </div>

                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      Submitted
                    </p>
                    <p className='text-sm'>{selectedRequest.submittedAt}</p>
                  </div>

                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      Status
                    </p>
                    <Badge variant={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Click on a contact request to view its details here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
