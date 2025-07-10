import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-black/10 py-12 blur-morph">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 animate-slide-left">
            <p className="text-black/60 text-sm">
              © {currentYear} Najmus Saquib. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-8 text-sm text-black/60 animate-slide-right">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // Add your privacy modal or page navigation logic here
                console.log('Privacy policy clicked');
              }}
              className="hover:text-black transition-all duration-300 hover:scale-105 blur-glass-dark px-3 py-1 rounded"
            >
              Privacy
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // Add your terms modal or page navigation logic here
                console.log('Terms of service clicked');
              }}
              className="hover:text-black transition-all duration-300 hover:scale-105 blur-glass-dark px-3 py-1 rounded"
            >
              Terms
            </a>
            <a 
              href="mailto:nsaquib22@gmail.com" 
              className="hover:text-black transition-all duration-300 hover:scale-105 blur-glass-dark px-3 py-1 rounded"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;