import React, { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { Project } from './Projects';
import { Link } from 'react-router-dom';

// Tech icon mapping
const getTechIcon = (tech: string) => {
  const icons: Record<string, JSX.Element> = {
    'React': <span className="text-blue-500">⚛️</span>,
    'TypeScript': <span className="text-blue-600">TS</span>,
    'Node.js': <span className="text-green-600">Node</span>,
    'Next.js': <span className="text-black dark:text-white">Next.js</span>,
    'Tailwind': <span className="text-cyan-500">TW</span>,
    'JavaScript': <span className="text-yellow-500">JS</span>,
    'React Native': <span className="text-blue-500">📱</span>,
    'OpenAI': <span className="text-purple-500">AI</span>,
    'Convex': <span className="text-orange-500">CX</span>,
    'Razorpay': <span className="text-blue-700">₹</span>,
  };
  return icons[tech] || <span>{tech}</span>;
};

// Tech color mapping
const getTechColor = (tech: string) => {
  const colors: Record<string, string> = {
    'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Next.js': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'Tailwind': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'React Native': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'OpenAI': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Convex': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Razorpay': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };
  return colors[tech] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isExpanded,
  onToggleExpand
}) => {

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleExpand();
    } else if (e.key === 'Escape' && isExpanded) {
      e.preventDefault();
      onToggleExpand();
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        isExpanded ? 'ring-2 ring-blue-500' : ''
      }`}
      data-project-id={project.id}
    >
      <div className="md:flex">
        {/* Project Image */}
        <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.technologies.slice(0, 4).map((tech) => (
                  <div 
                    key={tech}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white"
                  >
                    {getTechIcon(tech)}
                    <span>{tech}</span>
                  </div>
                ))}
                {project.tech.technologies.length > 4 && (
                  <div className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white">
                    +{project.tech.technologies.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Details */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {project.category === 'ai' ? 'AI/ML' : 
               project.category === 'data' ? 'Data Analytics' : 
               project.category === 'mobile' ? 'Mobile App' : 'Web App'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
            {project.role && (
              <span className="ml-auto text-sm font-medium text-gray-700 dark:text-gray-300">
                {project.role}
              </span>
            )}
          </div>
          
          <div 
            className="cursor-pointer"
            onClick={onToggleExpand}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={`project-details-${project.id}`}
            id={`project-header-${project.id}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {isExpanded ? project.longDescription || project.description : project.description}
            </p>
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {isExpanded ? 'Show less' : 'Read more'}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id={`project-details-${project.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                aria-labelledby={`project-header-${project.id}`}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {project.features && project.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.challenges && project.challenges.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Challenges</h4>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span className="text-gray-600 dark:text-gray-300">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.results && project.results.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Results</h4>
                        <ul className="space-y-2">
                          {project.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-600 dark:text-gray-300">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.technologies.map((tech) => (
                        <div 
                          key={tech}
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getTechColor(tech)} bg-opacity-10 dark:bg-opacity-20`}
                        >
                          {getTechIcon(tech)}
                          <span className="text-gray-700 dark:text-gray-200">{tech}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-between items-center">
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      )}
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                      
                    {project.slug && (
                      <Link 
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        aria-label={`View ${project.title} case study`}
                      >
                        View case study
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ProjectCard);
