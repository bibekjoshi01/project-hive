export default function Loading({ text = 'Loading' }) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-6'>
        {/* Large, clean spinner */}
        <div className='relative'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900' />
          {/* Optional inner ring for more visual interest */}
          <div className='absolute inset-2 h-12 w-12 animate-spin rounded-full border-4 border-gray-100 border-t-gray-600 [animation-direction:reverse] [animation-duration:1.5s]' />
        </div>

        {/* Loading text */}
        <div className='text-center'>
          <p className='text-lg font-medium text-gray-900'>{text}</p>
          <p className='text-sm text-gray-500'>Please wait a moment...</p>
        </div>
      </div>
    </div>
  );
}
