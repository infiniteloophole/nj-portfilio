import * as React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, GraduationCap, Briefcase } from 'lucide-react';
import Skills from './Skills';

// Type definitions
interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

interface Education {
  degree: string;
  university: string;
  period: string;
  highlights: string[];
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

const EnhancedAbout: React.FC = () => {
  const containerVariants = React.useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }), []);

  const itemVariants = React.useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      y: 8,
      scale: 0.98
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.5, 0, 0, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.18
      }
    }
  }), []);

  const { ref, inView } = useInView({
    threshold: 0.03,
    triggerOnce: true,
    initialInView: false
  });

  // Experience data
  const experiences: Experience[] = [
    {
      role: 'Frontend Developer',
      company: 'Infobool Inc.',
      location: 'Remote',
      period: 'Jan 2024 – Jul 2024',
      highlights: [
        'Led the development of reusable React components that reduced development time by 30%',
        'Implemented responsive designs using Tailwind CSS, improving mobile experience for 50,000+ users',
        'Optimized frontend performance, resulting in 40% faster page load times'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'SVIHS Pvt Ltd',
      location: 'Remote',
      period: 'Aug 2024 – Jun 2025',
      highlights: [
        'Developed a cross-platform health app with React Native and Convex',
        'Integrated Clerk Auth and Razorpay for secure authentication and payments',
        'Built a WhatsApp commerce bot using Django, Celery, and Redis',
        'Created real-time dashboards with Supabase and Deno Edge Functions'
      ]
    }
  ];

  // Education data
  const education: Education = {
    degree: 'Master of Computer Applications (MCA)',
    university: 'Banaras Hindu University',
    period: '2021 - 2024',
    highlights: [
      'Specialized in Software Engineering and Data Structures',
      'Thesis on "AI-Powered Healthcare Solutions"',
      'GPA: 8.5/10 (Top 10% of class)'
    ]
  };

  // Certifications data
  const certifications: Certification[] = [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      year: '2024'
    },
    {
      name: 'React Native - The Practical Guide',
      issuer: 'Udemy',
      year: '2023'
    },
    {
      name: 'Machine Learning Specialization',
      issuer: 'Stanford Online',
      year: '2023'
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 lg:py-36 bg-white dark:bg-gray-900 transition-colors duration-300"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={containerVariants}
          style={{ willChange: 'opacity, transform, height' }}
        >
          {/* Header */}
          <motion.header 
            variants={itemVariants} 
            className="text-center mb-16"
            aria-labelledby="about-heading"
          >
            <h2 
              id="about-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            >
              About Me
            </h2>
            <div 
              className="w-24 h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mx-auto rounded-full"
              aria-hidden="true"
            />
          </motion.header>

          {/* Introduction */}
          <motion.section 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-16 border border-gray-100 dark:border-gray-700"
            aria-labelledby="introduction-heading"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 
                  id="introduction-heading"
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Full-Stack & Mobile Engineer
                </h3>
                <motion.p variants={itemVariants} className="text-lg mb-6">
                  Full-stack developer with 5+ years experience building scalable web applications.
                  Specializing in React, TypeScript, and Node.js with a focus on performance optimization
                  and accessible user experiences. Passionate about open source and mentoring.
                </motion.p>
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Notable Achievements</h3>
                  <ul className="space-y-2">
                    <li>• Built health app with 10k+ users</li>
                    <li>• Contributed to React core documentation</li>
                    <li>• Speaker at JSConf 2023</li>
                  </ul>
                </motion.div>
                <motion.div variants={itemVariants} className="mb-12">
                  <h3 className="text-xl font-bold mb-6">Professional Timeline</h3>
                  <div className="space-y-8">
                    {experiences.map((exp, i) => (
                      <motion.div 
                        key={i}
                        variants={itemVariants}
                        className="pl-6 border-l-2 border-blue-400 relative"
                        whileHover={{ x: 5 }}
                      >
                        <div className="absolute -left-2 w-4 h-4 rounded-full bg-blue-500" />
                        <h4 className="font-bold">{exp.role} @ {exp.company}</h4>
                        <p className="text-gray-500 text-sm">{exp.period}</p>
                        <ul className="mt-2 space-y-1">
                          {exp.highlights.map((h, j) => (
                            <li key={j} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <div className="prose prose-lg text-gray-600 dark:text-gray-300 max-w-none space-y-4">
                  <p>
                    My journey in software development has led me to work on diverse projects, from 
                    healthcare applications to e-commerce solutions, always focusing on writing clean, 
                    maintainable code that solves real-world problems.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div 
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gray-100 dark:bg-gray-700 mb-6 overflow-hidden"
                  aria-hidden="true"
                >
                  {/* Profile Image Placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg 
                      className="w-20 h-20 sm:w-24 sm:h-24" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <a 
                  href="/resume.pdf" 
                  download="Nazmus_Sakib_CV.pdf"
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                  aria-label="Download Resume"
                >
                  <Download size={18} aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section 
            variants={itemVariants} 
            className="mb-16"
            aria-labelledby="experience-heading"
          >
            <h3 
              id="experience-heading"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
            >
              <Briefcase className="text-gray-700 dark:text-gray-300" aria-hidden="true" />
              Professional Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.article 
                  key={`${exp.company}-${index}`}
                  variants={itemVariants}
                  className="group relative pl-8 border-l-2 border-gray-200 dark:border-gray-700 pb-8 last:pb-0 last:border-l-0"
                  itemScope
                  itemType="https://schema.org/JobPosting"
                >
                  <div 
                    className="absolute w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full -left-2 top-1 group-hover:bg-black dark:group-hover:bg-white transition-colors"
                    aria-hidden="true"
                  />
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 
                          className="text-xl font-bold text-gray-900 dark:text-white"
                          itemProp="title"
                        >
                          {exp.role}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span itemProp="hiringOrganization" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">{exp.company}</span>
                          </span>
                          {' • '}
                          <span itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
                            <span itemProp="address">{exp.location}</span>
                          </span>
                        </p>
                      </div>
                      <time 
                        className="text-sm font-medium text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-800 px-3 py-1 rounded-full self-start sm:self-center"
                        dateTime={exp.period.replace(/–/g, '/')}
                        itemProp="datePosted"
                      >
                        {exp.period}
                      </time>
                    </header>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-500 dark:text-gray-500 mr-2 mt-1" aria-hidden="true">•</span>
                          <span itemProp="responsibilities">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Education & Certifications */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {/* Education */}
            <motion.section 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              aria-labelledby="education-heading"
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <h3 
                id="education-heading"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
              >
                <GraduationCap className="text-gray-700 dark:text-gray-300" aria-hidden="true" />
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 
                    className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                    itemProp="name"
                  >
                    {education.degree}
                  </h4>
                  <p 
                    className="text-gray-600 dark:text-gray-400"
                    itemProp="educationalCredentialAwarded"
                  >
                    {education.university}
                  </p>
                  <time 
                    className="text-sm text-gray-500 dark:text-gray-500"
                    dateTime={education.period.replace(/-/g, '/')}
                    itemProp="awardDate"
                  >
                    {education.period}
                  </time>
                  <ul className="mt-3 space-y-2">
                    {education.highlights.map((item, i) => (
                      <li 
                        key={i} 
                        className="flex items-start text-gray-700 dark:text-gray-300"
                        itemProp="description"
                      >
                        <span className="text-gray-500 dark:text-gray-500 mr-2 mt-1" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              aria-labelledby="certifications-heading"
            >
              <h3 
                id="certifications-heading"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
              >
                <Award className="text-gray-700 dark:text-gray-300" aria-hidden="true" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <article 
                    key={`${cert.issuer}-${i}`}
                    className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1"
                    itemScope
                    itemType="https://schema.org/EducationalOccupationalCredential"
                  >
                    <h4 
                      className="font-medium text-gray-800 dark:text-gray-200"
                      itemProp="name"
                    >
                      {cert.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span itemProp="recognizedBy">{cert.issuer}</span>
                      {' • '}
                      <time dateTime={cert.year} itemProp="awardDate">{cert.year}</time>
                    </p>
                  </article>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Skills Section */}
          <motion.section 
            variants={itemVariants} 
            className="mb-16"
            aria-labelledby="skills-heading"
          >
            <h3 
              id="skills-heading"
              className="sr-only"
            >
              Technical Skills
            </h3>
            <Skills />
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-2xl"
            aria-labelledby="cta-heading"
          >
            <h3 
              id="cta-heading"
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-3 sm:px-8 sm:py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
              aria-label="Get in touch via contact form"
            >
              Get In Touch
            </a>
          </motion.section>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedAbout;
