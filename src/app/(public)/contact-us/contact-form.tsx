'use client';

import type React from 'react';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactMutation } from './redux/contact.api';
import ContactInfo from './contact-info';

const subjects = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'projects', label: 'Project Related' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [contact, { isLoading }] = useContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setStatus('error');
      setMessage('Please fill in all required fields');
      return;
    }

    const full_name =
      `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();

    try {
      const response = await contact({
        full_name,
        email: formData.email,
        phone_no: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }).unwrap();

      setStatus('success');
      setMessage(response.message);

      // Reset form
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
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

              <form onSubmit={handleSubmit} className='space-y-6'>
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
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                      required
                    />
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
                      name='middleName'
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
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
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                      required
                    />
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
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                      required
                    />
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
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    />
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
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      className='w-full appearance-none rounded-lg border border-gray-300 bg-white/80 px-4 py-3 pr-10 text-gray-900 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                      disabled={isLoading}
                    >
                      {subjects.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
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
                    name='message'
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder='Tell us how we can help you...'
                    className='w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 focus:outline-none'
                    disabled={isLoading}
                    required
                  />
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

          {/* Contact Inforation */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
