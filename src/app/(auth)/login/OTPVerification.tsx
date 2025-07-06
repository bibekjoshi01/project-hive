import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface IOtpVerificationProps {
  email: string;
}

const OtpVerification = ({ email }: IOtpVerificationProps) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedData = e.clipboardData.getData('Text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return; // ignore non-numeric paste
    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')].slice(0, 6));
    if (newOtp.length < 6) {
      inputRefs.current[newOtp.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = () => {};

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white p-6'>
      <div className='w-full max-w-sm text-center'>
        <h1 className='mb-4 text-3xl font-bold'>Verification</h1>
        <p className='mb-6 text-gray-600'>
          If you have an account, we have sent a code to{' '}
          <span className='font-semibold text-gray-800'>{email}</span>. Enter it
          below.
        </p>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center space-y-6'
        >
          <div className='flex space-x-2' onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type='text'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className='h-14 w-12 rounded-md border border-gray-300 text-center text-2xl focus:border-black focus:outline-none'
              />
            ))}
          </div>

          <button
            type='submit'
            className='flex w-full cursor-pointer justify-center items-center gap-2 rounded-md bg-black py-3 text-base font-medium text-white transition-all duration-200 hover:bg-gray-800'
          >
            Verify Code
            <ArrowRight size={'20px'} />
          </button>
        </form>
        <div className='mt-6 flex justify-center'>
          <button
            type='button'
            className='flex cursor-pointer items-center gap-1 text-base text-blue-600 hover:underline'
          >
            <ArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
