import * as React from 'react';
import { useEffect, useCallback, useMemo } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Twitter, ArrowRight } from 'lucide-react';
import '../index.css';

type Section = 'home' | 'about' | 'projects' | 'skills' | 'contact';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

const heroMetrics = {
  renders: 0,
  animations: 0,
  titleChanges: 0
};

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  heroMetrics.renders++;
  
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const socialLinks = useMemo(() => [
    {
      name: 'GitHub',
      url: 'https://github.com/nsaquib22',
      icon: <Github size={20} aria-hidden="true" />,
      ariaLabel: 'GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: <Linkedin size={20} aria-hidden="true" />,
      ariaLabel: 'LinkedIn profile'
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: <Mail size={20} aria-hidden="true" />,
      ariaLabel: 'Send email'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: <Twitter size={20} aria-hidden="true" />,
      ariaLabel: 'Twitter profile'
    }
  ], []);

  // Optimized title rotation
  useEffect(() => {
    heroMetrics.titleChanges++;
    let mounted = true;
    const interval = setInterval(() => {
      if (mounted) {
        // Removed the unused state update
      }
    }, 3500);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Metrics logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        console.log('Hero Metrics:', heroMetrics);
      }, 15000);
      return () => {
        clearInterval(interval);
        return undefined; // Explicit return
      };
    }
    return undefined; // Explicit return
  }, []);

  // Animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const scrollToSection = useCallback((sectionId: Section) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      onNavigate(sectionId);
      // Update URL without page reload
      window.history.pushState({}, '', `#${sectionId}`);
    }
  }, [onNavigate]);

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24 py-20 md:py-32 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="inline-block mb-6 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium"
            variants={itemVariants}
          >
            Full Stack Developer
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Hi, I'm <span className="text-primary-600 dark:text-primary-400">Najmus Saquib</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I build exceptional digital experiences with modern web technologies, focusing on performance, accessibility, and user-centered design.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </motion.a>
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </motion.a>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4 mb-12"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 group"
              aria-label="Scroll to about section"
              whileHover={{ y: 5 }}
            >
              <span className="text-sm font-medium mb-3">Scroll to explore</span>
              <motion.div 
                className="w-10 h-16 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-start justify-center p-1 group-hover:border-primary-500 dark:group-hover:border-primary-400 transition-colors duration-300"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <div className="w-1 h-4 bg-gray-400 dark:bg-gray-500 rounded-full group-hover:bg-primary-500 dark:group-hover:bg-primary-400 transition-colors duration-300"></div>
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.1 + 0.05,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 10,
        })).map((circle) => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full bg-primary-500 dark:bg-primary-400"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              opacity: circle.opacity,
            }}
            animate={{
              y: [0, 20, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: circle.duration,
              delay: circle.delay,
              repeat: Infinity,
              repeatType: 'reverse' as const,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;