import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInformation = {
  email: 'help@tcioe.edu.np',
  contactNo: '+977 9800000000',
  address: 'Maitighar, Kathmandu, Nepal',
};

const ContactInfo = () => {
  return (
    <div className='mt-12 mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {/* Email */}
      <div className='flex items-start gap-4 rounded-lg border border-gray-200 p-6'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
          <Mail className='h-6 w-6 text-gray-600' />
        </div>
        <div>
          <h3 className='mb-1 font-semibold text-gray-900'>Email Us</h3>
          {contactInformation?.email}
          <a
            href='mailto:contact@yourcompany.com'
            className='text-gray-900 hover:underline'
          ></a>
        </div>
      </div>

      {/* Phone */}
      <div className='flex items-start gap-4 rounded-lg border border-gray-200 p-6'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
          <Phone className='h-6 w-6 text-gray-600' />
        </div>
        <div>
          <h3 className='mb-1 font-semibold text-gray-900'>Call Us</h3>
          <a href='tel:+15551234567' className='text-gray-900 hover:underline'>
            {contactInformation?.contactNo}
          </a>
        </div>
      </div>

      {/* Address */}
      <div className='flex items-start gap-4 rounded-lg border border-gray-200 p-6'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
          <MapPin className='h-6 w-6 text-gray-600' />
        </div>
        <div>
          <h3 className='mb-1 font-semibold text-gray-900'>Visit Us</h3>
          <address className='text-gray-900 not-italic'>
            {contactInformation?.address}
          </address>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
