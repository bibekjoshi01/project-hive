import SubmitProjectForm from './submit-project-form';

export default function SubmitProjectPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Submit Your Project
          </h1>
          <p className='mt-2 text-gray-600'>
            Share your amazing work with the community
          </p>
        </div>
        <SubmitProjectForm />
      </div>
    </div>
  );
}
