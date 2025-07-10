import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <p className="text-gray-700 mb-6">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to my portfolio website. By accessing or using this website, you agree to be bound by these 
              Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily view the materials on this website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
            <p className="text-gray-700">
              This license shall automatically terminate if you violate any of these restrictions and may be 
              terminated at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-gray-700">
              The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or 
              implied, and hereby disclaim and negate all other warranties including, without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or 
              non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p className="text-gray-700">
              In no event shall I be liable for any damages (including, without limitation, damages for loss of 
              data or profit, or due to business interruption) arising out of the use or inability to use the 
              materials on this website, even if I have been notified orally or in writing of the possibility 
              of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Revisions and Errata</h2>
            <p className="text-gray-700">
              The materials appearing on this website could include technical, typographical, or photographic 
              errors. I do not warrant that any of the materials on its website are accurate, complete, or 
              current. I may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
            <p className="text-gray-700">
              I have not reviewed all of the sites linked to this website and am not responsible for the 
              contents of any such linked site. The inclusion of any link does not imply endorsement of the site. 
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Site Terms of Use Modifications</h2>
            <p className="text-gray-700">
              I may revise these terms of service at any time without notice. By using this website you are 
              agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact me at{' '}
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

export default TermsOfService;
