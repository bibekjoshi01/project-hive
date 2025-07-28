import { Calendar } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Main Content */}
      <div className='container mx-auto px-4 py-12 lg:px-6'>
        <div className='mx-auto max-w-4xl'>
          {/* Title Section */}
          <div className='mb-12 text-center'>
            <h1 className='mb-4 text-4xl font-bold text-gray-900'>
              Terms and Conditions
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
                1. Acceptance of Terms
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                2. Use License
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Permission is granted to temporarily download one copy of the
                materials on our website for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>modify or copy the materials</li>
                <li>
                  use the materials for any commercial purpose or for any public
                  display (commercial or non-commercial)
                </li>
                <li>
                  attempt to decompile or reverse engineer any software
                  contained on the website
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                3. Project Materials and Content
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                All project materials, code samples, documentation, and
                educational content provided on this website are for educational
                purposes only. Users are responsible for ensuring proper
                attribution when using any materials.
              </p>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We do not guarantee the accuracy, completeness, or reliability
                of any project materials. Users should verify all information
                before implementation in any production environment.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                4. User Accounts and Registration
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                When creating an account on our platform, you must provide
                accurate and complete information. You are responsible for
                maintaining the confidentiality of your account credentials and
                for all activities that occur under your account.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                5. Prohibited Uses
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                You may not use our service:
              </p>
              <ul className='mb-4 ml-6 list-disc text-gray-600'>
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                6. Disclaimer
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                The materials on our website are provided on an &apos;as is&apos; basis.
                We make no warranties, expressed or implied, and hereby disclaim
                and negate all other warranties including without limitation,
                implied warranties or conditions of merchantability, fitness for
                a particular purpose, or non-infringement of intellectual
                property or other violation of rights.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                7. Limitations
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                In no event shall our company or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on our website, even if we
                or our authorized representative has been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                8. Privacy Policy
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the website, to
                understand our practices.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                9. Changes to Terms
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                We reserve the right to revise these terms of service at any
                time without notice. By using this website, you are agreeing to
                be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                10. Contact Information
              </h2>
              <p className='mb-4 leading-relaxed text-gray-600'>
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <div className='rounded-lg bg-gray-50 p-4'>
                <p className='text-gray-600'>
                  <strong>Email:</strong> legal@yourcompany.com
                  <br />
                  <strong>Address:</strong> Your Company Address
                  <br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
