import * as React from 'react';
import { ExternalLink, Github, Youtube, Code, Smartphone, Monitor } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Monitor className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'api':
        return <Code className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Project <span className="text-gray-800">Showcase</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my projects with live demos, GitHub repositories, and video walkthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {project.image && (
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getProjectTypeIcon(project.type)}
                    <span className="ml-1 capitalize">{project.type}</span>
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1.5" />
                      Code
                    </a>
                  )}
                  
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Live Demo
                    </a>
                  )}
                  
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Youtube className="w-4 h-4 mr-1.5 text-red-500" />
                      Video
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="https://github.com/nsaquib22"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
