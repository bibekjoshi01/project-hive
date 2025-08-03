'use client';

import { useState } from 'react';
import { useDebounce } from '@/utils/debounce';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useGetContactsQuery } from '../redux/api';
import { IContactResponse } from '../redux/types';

const LIMIT = 5;

export default function ContactRequestsPage() {
  const [selectedRequest, setSelectedRequest] =
    useState<IContactResponse | null>(null);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useGetContactsQuery({
    search: debouncedSearch || undefined,
    limit: LIMIT,
    offset,
  });

  const contacts = data?.results ?? [];
  const count = data?.count ?? 0;
  const hasNext = offset + LIMIT < count;
  const hasPrev = offset > 0;

  const handleViewRequest = (request: IContactResponse) => {
    setSelectedRequest(request);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setOffset(0); // Reset pagination on new search
  };

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='grid gap-4 md:grid-cols-3'>
        {/* Table & Search */}
        <div className='space-y-4 md:col-span-2'>
          <Card className='shadow-none'>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle className='text-2xl'>Contact Requests</CardTitle>
              <Input
                placeholder='Search by name...'
                value={search}
                onChange={handleSearchChange}
                className='max-w-xs'
              />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className='text-muted-foreground'>Loading...</p>
              ) : isError ? (
                <p className='text-red-500'>Failed to load data.</p>
              ) : contacts.length === 0 ? (
                <p className='text-muted-foreground'>
                  No contact requests found.
                </p>
              ) : (
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
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className='flex flex-col'>
                            <span className='font-medium'>
                              {request.fullName}
                            </span>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>
                              {request.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className='hidden md:table-cell'>
                          {request.subject}
                        </TableCell>
                        <TableCell className='hidden lg:table-cell'>
                          {new Date(request.createdAt).toLocaleString()}
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
              )}
            </CardContent>
            {/* Pagination */}
            {contacts.length > 0 && (
              <CardContent className='flex justify-end gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setOffset((o) => o - LIMIT)}
                  disabled={!hasPrev}
                >
                  Previous
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setOffset((o) => o + LIMIT)}
                  disabled={!hasNext}
                >
                  Next
                </Button>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Detail View */}
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
                      {selectedRequest.fullName}
                    </h3>
                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                      <MailIcon className='h-4 w-4' />
                      <span>{selectedRequest.email}</span>
                    </div>
                    {selectedRequest.phoneNo && (
                      <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                        <PhoneIcon className='h-4 w-4' />
                        <span>{selectedRequest.phoneNo}</span>
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
                      Submitted At
                    </p>
                    <p className='text-sm'>
                      {new Date(selectedRequest.createdAt).toLocaleString()}
                    </p>
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
