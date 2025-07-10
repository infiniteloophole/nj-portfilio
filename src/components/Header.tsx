import * as React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
}

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavigationItem[];
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

// Performance metrics
const headerMetrics = {
  renderCount: 0,
  lastRenderTime: 0,
  scrollEvents: 0,
  menuToggleCount: 0,
};

// Mobile Menu Component
const MobileMenu: React.FC<MobileMenuProps> = React.memo(({ 
  isOpen, 
  navItems, 
  activeSection, 
  onNavClick 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(item.id);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.id
                      ? 'bg-gray-100 text-black font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="mt-4"
            >
              <a
                href="#contact"
                className="block w-full text-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('contact');
                }}
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Memoized navigation items
  const navItems = useMemo<NavigationItem[]>(() => [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'code-snippets', label: 'Code Snippets' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ], []);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    headerMetrics.scrollEvents++;
    const scrolled = window.scrollY > (headerRef.current?.offsetHeight || 0);
    setIsScrolled(scrolled);
  }, []);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Handle navigation click
  const handleNavClick = useCallback((sectionId: string) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
  }, [onNavigate]);

  // Memoized desktop nav links
  const desktopNavLinks = useMemo(() => {
    return navItems.map((item) => (
      <a
        key={item.id}
        href={`#${item.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.id);
        }}
        className={`text-sm font-medium transition-colors ${
          activeSection === item.id
            ? 'text-black font-semibold'
            : 'text-gray-600 hover:text-black'
        }`}
      >
        {item.label}
      </a>
    ));
  }, [navItems, activeSection, handleNavClick]);

  // Toggle menu with metrics
  const toggleMenu = useCallback(() => {
    headerMetrics.menuToggleCount++;
    setIsMenuOpen(prev => !prev);
  }, []);

  // Track render performance
  headerMetrics.renderCount++;
  headerMetrics.lastRenderTime = Date.now();

  // Log metrics in development
  if (import.meta.env.DEV) {
    useEffect(() => {
      const interval = setInterval(() => {
        console.log('Header Metrics:', headerMetrics);
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                NS
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {desktopNavLinks}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-5 h-0.5 bg-current rounded-full relative before:absolute before:w-5 before:h-0.5 before:bg-current before:rounded-full before:-translate-y-1.5 after:absolute after:w-5 after:h-0.5 after:bg-current after:rounded-full after:translate-y-1.5" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        navItems={navItems} 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
      />
    </header>
  );
};

// Throttle function
function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
}

export default Header;
