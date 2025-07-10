export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-4'>
        {/* Simple spinner */}
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black' />

        {/* Optional loading text */}
        <p className='text-sm text-gray-600'>Loading...</p>
      </div>
    </div>
  );
}
