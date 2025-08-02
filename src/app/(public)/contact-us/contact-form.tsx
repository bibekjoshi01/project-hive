'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactMutation } from './redux/contact.api';
import ContactInfo from './contact-info';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const subjects = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'projects', label: 'Project Related' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(50, 'First Name cannot exceed 50 characters'),
  middleName: z
    .string()
    .max(50, 'Middle Name cannot exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(50, 'Last Name cannot exceed 50 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .max(20, 'Phone Number cannot exceed 20 characters')
    .optional(),
  subject: z.string().optional(),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const [contact, { isLoading }] = useContactMutation();

  const onSubmit = async (data: ContactFormInputs) => {
    setStatus('idle'); // Reset status before new submission
    setMessage(''); // Clear previous message

    const full_name =
      `${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim();

    try {
      const response = await contact({
        full_name,
        email: data.email,
        phone_no: data.phone,
        subject: data.subject,
        message: data.message,
      }).unwrap();
      setStatus('success');
      setMessage(response.message);
      reset(); // Reset form fields after successful submission
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-white'>
      {/* Main Content */}
      <div className='container mx-auto px-4 py-12 lg:px-6'>
        <div className='mx-auto max-w-7xl'>
          {/* Title Section */}
          <div className='mb-12 text-center lg:mb-16'>
            <h1 className='mb-4 text-4xl font-bold text-gray-900'>
              Contact Us
            </h1>
            <p className='text-sm text-gray-600 md:text-lg'>
              Have a question or need assistance? We&apos;re here to help. Get
              in touch with us and we&apos;ll respond as soon as possible.
            </p>
          </div>
          <div className='grid'>
            {/* Contact Form */}
            <div className='rounded-2xl bg-gray-50 p-4 py-6 lg:p-8'>
              <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Name Fields */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      First Name *
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      {...register('firstName')}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor='middleName'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      Middle Name
                    </label>
                    <input
                      type='text'
                      id='middleName'
                      {...register('middleName')}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
                    {errors.middleName && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.middleName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor='lastName'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      Last Name *
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      {...register('lastName')}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Email, Phone, and Subject */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <label
                      htmlFor='email'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      {...register('email')}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      {...register('phone')}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
                    {errors.phone && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor='subject'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      Subject
                    </label>
                    <select
                      id='subject'
                      {...register('subject')}
                      className='w-full appearance-none rounded-lg border border-gray-300 bg-white/80 px-4 py-3 pr-10 text-gray-900 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    >
                      {subjects.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Message */}
                <div>
                  <label
                    htmlFor='message'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    rows={6}
                    placeholder='Tell us how we can help you...'
                    {...register('message')}
                    className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                    disabled={isLoading}
                  />
                  {errors.message && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.message.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {isLoading ? (
                    <>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='h-4 w-4' />
                      Send Message
                    </>
                  )}
                </button>
                {/* Status Message */}
                {message && (
                  <div
                    className={`flex items-center justify-center gap-2 rounded-lg p-3 ${
                      status === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle className='h-5 w-5' />
                    ) : (
                      <AlertCircle className='h-5 w-5' />
                    )}
                    <span className='text-sm font-medium'>{message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
          {/* Contact Information */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
