'use client';

import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProgrammaticDownloadProps {
  fileUrl: string;
  fileName: string;
  className?: string;
}

export default function ProgrammaticDownload({
  fileUrl,
  fileName,
  className = '',
}: ProgrammaticDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Fetch the file
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Download failed');

      // Create blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant='outline'
      size='sm'
      className={`h-8 w-8 cursor-pointer p-0 ${className}`}
      title={isDownloading ? 'Downloading...' : 'Download file'}
    >
      {isDownloading ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <Download className='h-4 w-4' />
      )}
    </Button>
  );
}
