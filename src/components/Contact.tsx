import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Performance metrics
const contactMetrics = {
  renders: 0,
  lastRender: 0,
  validations: 0,
  submissions: 0,
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormError {
  field?: string;
  message: string;
}

const Contact = () => {
  // Track render performance
  contactMetrics.renders++;
  contactMetrics.lastRender = Date.now();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<FormError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Enhanced animation variants
  const formVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06,
        when: 'beforeChildren'
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.5, 0, 0, 1]
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.15 }
    }
  }), []);

  // Memoized form validation
  const validateForm = useCallback((): boolean => {
    contactMetrics.validations++;
    
    if (!formData.name.trim()) {
      setError({ field: 'name', message: 'Name is required' });
      return false;
    }
    
    if (!formData.email.trim()) {
      setError({ field: 'email', message: 'Email is required' });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError({ field: 'email', message: 'Please enter a valid email' });
      return false;
    }
    
    if (!formData.message.trim()) {
      setError({ field: 'message', message: 'Message is required' });
      return false;
    }
    
    return true;
  }, [formData]);

  // Real-time validation
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when typing
    if (error?.field === name) {
      setError(null);
    }
  }, [error]);

  // Optimized submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    contactMetrics.submissions++;
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced delay
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('idle');
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 3000);
      
    } catch (err) {
      setFormStatus('error');
      setError({ message: 'Submission failed. Please try again.' });
      
      setTimeout(() => {
        setFormStatus('idle');
        setError(null);
      }, 5000);
    }
  }, [validateForm]);

  // Log metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        console.log('Contact Form Metrics:', {
          ...contactMetrics,
          avgRenderTime: contactMetrics.renders > 0 
            ? (Date.now() - contactMetrics.lastRender) / contactMetrics.renders 
            : 0
        });
      }, 15000);
      return () => clearInterval(interval);
    }
  }, []);

  const socialLinks = [
    {
      icon: '✉️',
      href: 'mailto:nsaquib22@gmail.com',
      label: 'Email',
      color: 'bg-gray-800',
      hover: 'hover:bg-gray-700'
    },
    {
      icon: '💼',
      href: 'https://www.linkedin.com/in/najmussaquib9',
      label: 'LinkedIn',
      color: 'bg-blue-600',
      hover: 'hover:bg-blue-700'
    },
    {
      icon: '🐦',
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
      color: 'bg-blue-400',
      hover: 'hover:bg-blue-500'
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      href: 'https://github.com/nsaquib22',
      label: 'GitHub',
      color: 'bg-gray-800',
      hover: 'hover:bg-gray-900'
    }
  ];

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      title: 'Email',
      value: 'nsaquib22@gmail.com',
      href: 'mailto:nsaquib22@gmail.com',
      delay: 0.1
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: 'Location',
      value: 'Patna, Bihar, India',
      subValue: 'Open to Remote & Freelance',
      delay: 0.2
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      title: 'Availability',
      value: 'Available for new projects',
      subValue: 'Let\'s build something amazing!',
      delay: 0.3
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative py-28 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full mb-4 border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Let's <span className="text-gray-800">Work Together</span>
          </h2>
          <div className="w-20 h-0.5 bg-gray-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's talk about your project</h3>
              <p className="text-gray-700 leading-relaxed mb-8 font-normal">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a healthcare innovation in mind or want to discuss 
                AI-driven solutions, feel free to reach out.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                    style={{
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      animationDelay: `${item.delay}s`,
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 border border-gray-200">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{item.title}</h4>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="block text-gray-900 font-medium hover:text-gray-700 transition-colors duration-300 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium">{item.value}</p>
                      )}
                      {item.subValue && (
                        <p className="text-sm text-gray-600 mt-1">{item.subValue}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} text-white flex items-center justify-center shadow-lg ${link.hover} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform`}
                      style={{
                        animation: 'fadeIn 0.8s ease-out forwards',
                        animationDelay: `${0.4 + (index * 0.1)}s`,
                        opacity: 0
                      }}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <motion.div 
              className="space-y-6"
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-xl font-semibold text-gray-900"
                variants={itemVariants}
              >
                Send me a message
              </motion.h3>
              
              <AnimatePresence>
                {formStatus === 'success' ? (
                  <motion.div 
                    className={`p-6 bg-green-50 border border-green-200 rounded-lg text-center w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-gray-800 shadow-sm ${
                      error 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-black hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5'
                    } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 border border-gray-900`}
                  >
                    {error ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        Send Message
                      </>
                    )}
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields would go here */}
                    <motion.button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${formStatus === 'submitting' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {formStatus === 'submitting' ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </div>
                      ) : 'Send Message'}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Decorative element */}
          <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-purple-100 rounded-3xl"></div>
          <div className="absolute -z-20 -top-6 -left-6 w-40 h-40 bg-pink-100 rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;