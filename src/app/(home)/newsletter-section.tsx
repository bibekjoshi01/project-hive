'use client';

import type React from 'react';

import { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage(
        "Thank you for subscribing! You'll receive the latest project updates.",
      );
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-4 lg:px-6 py-12'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='mb-12'>
            <h2 className='mb-4 text-4xl font-bold text-gray-900'>
              Stay Updated with Latest Projects
            </h2>
            <p className='text-lg text-gray-600'>
              Subscribe to our newsletter and be the first to know about new
              project releases, updates, and educational resources across all
              categories.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='mx-auto max-w-lg'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className='relative flex-1'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <Mail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  className='w-full rounded-lg border border-gray-300 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type='submit'
                disabled={status === 'loading'}
                className='cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
              >
                {status === 'loading' ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                    Subscribing...
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 flex items-center justify-center gap-2 rounded-lg p-3 ${
                  status === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {status !== 'success' && <AlertCircle className='h-5 w-5' />}
                <span className='text-sm font-medium'>{message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
