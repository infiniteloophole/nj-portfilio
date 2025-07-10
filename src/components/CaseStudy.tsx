import * as React from 'react';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Project } from '../types/project';

interface CaseStudyProps {
  projects: Project[];
}

const CaseStudy: React.FC<CaseStudyProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id.toString() === id);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h2>
          <p className="text-gray-600 mb-6">The requested case study could not be found.</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 mb-4">
              {project.category === 'ai' ? 'AI/ML Project' : 
               project.category === 'mobile' ? 'Mobile App' : 
               project.category === 'data' ? 'Data Analytics' : 'Web App'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-lg text-gray-600">{project.description}</p>
          </div>
          
          <div className="flex gap-3">
            {project.links?.github && (
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
            {project.links?.live && (
              <a 
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.links?.video && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Video Walkthrough
              </a>
            )}
          </div>
        </div>
        
        <div className="relative rounded-xl overflow-hidden mb-8 h-96 bg-gray-100">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
            <p className="text-gray-700 mb-8">{project.longDescription || project.description}</p>
            
            {project.role && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Role</h3>
                <p className="text-gray-700">{project.role}</p>
              </div>
            )}
            
            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.challenges && project.challenges.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenges & Solutions</h3>
                <ul className="space-y-4">
                  {project.challenges?.map((challenge: string, index: number) => (
                    <li key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700">{challenge}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies && project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.year && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Year</h4>
                  <p className="text-gray-900">{project.year}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Type</h4>
                <p className="text-gray-900 capitalize">{project.type}</p>
              </div>
              
              {(project.links?.github || project.links?.live) && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Project Links</h4>
                  <div className="space-y-2">
                    {project.links?.github && (
                      <a 
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    )}
                    {project.links?.live && (
                      <a 
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                    {project.links?.video && (
                      <a 
                        href={project.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Video Walkthrough
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {project.results && project.results.length > 0 && (
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-6">Results & Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.results?.map((result: string, index: number) => (
              <div key={index} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  {index === 0 ? '01' : index === 1 ? '02' : '03'}
                </div>
                <p className="text-gray-200">{result}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Have a project in mind?</h3>
            <p className="text-gray-600">Let's work together to bring your ideas to life.</p>
          </div>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
