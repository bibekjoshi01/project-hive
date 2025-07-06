import { Calendar } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Main Content */}
      <div className='container mx-auto px-4 py-12 lg:px-6'>
        <div className='mx-auto max-w-4xl'>
          {/* Title Section */}
          <div className='mb-12 text-center'>
            <h1 className='mb-4 text-4xl font-bold text-gray-900'>
              Privacy Policies
            </h1>
            <div className='flex items-center justify-center gap-2 text-gray-600'>
              <Calendar className='h-4 w-4' />
              <span>Last updated: January 6, 2025</span>
            </div>
          </div>

          {/* Content */}
          <div className='prose prose-gray max-w-none'>
            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                1. Information We Collect
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We collect information you provide directly to us, such as when
                you create an account, subscribe to our newsletter, or contact
                us for support.
              </p>

              <h3 className='mb-3 text-xl font-medium text-gray-900'>
                Personal Information
              </h3>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className='mb-3 text-xl font-medium text-gray-900'>
                Usage Information
              </h3>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>Pages visited and time spent on our website</li>
                <li>Projects downloaded or viewed</li>
                <li>Search queries and interactions</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                2. How We Use Your Information
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We use the information we collect to:
              </p>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>Provide, maintain, and improve our services</li>
                <li>
                  Send you newsletters and project updates (with your consent)
                </li>
                <li>
                  Respond to your comments, questions, and customer service
                  requests
                </li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>
                  Detect, investigate, and prevent fraudulent transactions and
                  other illegal activities
                </li>
                <li>Personalize your experience on our platform</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                3. Information Sharing and Disclosure
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except in the
                following circumstances:
              </p>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, property, or safety</li>
                <li>
                  In connection with a merger, acquisition, or sale of assets
                </li>
                <li>
                  With service providers who assist us in operating our website
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                4. Data Security
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet or
                electronic storage is 100% secure.
              </p>
              <div className='rounded-lg bg-gray-50 p-4'>
                <p className='text-gray-600'>
                  <strong>Security measures include:</strong> SSL encryption,
                  secure servers, regular security audits, and access controls
                  for our team members.
                </p>
              </div>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                5. Cookies and Tracking Technologies
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We use cookies and similar tracking technologies to collect and
                use personal information about you. You can control cookies
                through your browser settings.
              </p>

              <h3 className='mb-3 text-xl font-medium text-gray-900'>
                Types of Cookies We Use
              </h3>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>
                  <strong>Essential Cookies:</strong> Required for the website
                  to function properly
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors use our website
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                6. Your Rights and Choices
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                You have the following rights regarding your personal
                information:
              </p>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>
                  <strong>Access:</strong> Request a copy of the personal
                  information we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to
                  another service
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications at any time
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                7. Children&apos;s Privacy
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Our service is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                8. International Data Transfers
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers are
                made in accordance with applicable data protection laws and with
                appropriate safeguards in place.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                9. Changes to This Privacy Policy
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                10. Contact Us
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>
              <div className='rounded-lg bg-gray-50 p-4'>
                <p className='text-gray-600'>
                  <strong>Email:</strong> privacy@yourcompany.com
                  <br />
                  <strong>Address:</strong> Your Company Address
                  <br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                  <br />
                  <strong>Data Protection Officer:</strong> dpo@yourcompany.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
