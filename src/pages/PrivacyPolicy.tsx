import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-gray-700 mb-6">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect information that you provide directly to us, such as when you fill out a contact form, 
              subscribe to our newsletter, or communicate with us. This may include your name, email address, 
              and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you updates and information about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-700">
              We do not sell or share your personal information with third parties except as described in this 
              privacy policy or with your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information. However, no 
              method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your personal information. Please contact us 
              at <a href="mailto:nsaquib22@gmail.com" className="text-blue-600 hover:underline">nsaquib22@gmail.com</a> 
              for any privacy-related requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new privacy policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this privacy policy, please contact us at{' '}
              <a href="mailto:nsaquib22@gmail.com" className="text-blue-600 hover:underline">
                nsaquib22@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
