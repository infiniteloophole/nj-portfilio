import React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import ProjectList from './ProjectList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import ChevronDown from '../components/icons/ChevronDown';
import ProjectFilters from './ProjectFilters';
import { usePerformanceMetrics } from '../hooks/usePerformanceMetrics';

// Updated Project type:
type Project = {
  id: string | number;
  title: string;
  description: string;
  meta: {
    image: string;
    year: string | number;
    status?: 'active' | 'completed' | 'archived';
    category?: string;
    type?: string;
  };
  links: {
    github: string;
    demo?: string;
    live?: string;
    demoVideo?: string;
  };
  tech: {
    technologies: string[];
    role?: string;
  };
  content?: {
    longDescription?: string;
    features?: string[];
    challenges?: string[];
    results?: string[];
    screenshots?: string[];
    testimonials?: Array<{
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }>;
  };
  metrics?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
};

// Enhanced metrics object
const projectsMetrics = {
  // Existing metrics
  renderCount: 0,
  lastRenderTime: 0,
  filterOperations: 0,
  projectLoadTime: 0,
  
  // New metrics
  firstPaint: 0,
  avgFrameRate: 0,
  frameCount: 0,
  lastFrameTime: performance.now(),
  domUpdateTime: 0,
  effectRuns: 0
};

// Memoized projects data
const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Health App',
    description: 'Personalized patient support and habit tracking',
    meta: {
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      year: '2024',
      category: 'mobile',
      type: 'AI'
    },
    links: {
      github: 'https://github.com/nsaquib22/health-app',
      live: 'https://healthapp.example.com',
      demoVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    tech: {
      technologies: ['React Native', 'OpenAI', 'Convex', 'Razorpay', 'TypeScript', 'Node.js'],
      role: 'Full-stack Developer & AI Engineer'
    },
    content: {
      longDescription: 'A cross-platform mobile application that provides personalized health recommendations, real-time habit tracking, and secure payment integration. The app uses AI to analyze user behavior and suggest improvements.',
      features: [
        'Personalized health recommendations using AI',
        'Real-time habit tracking and analytics',
        'Secure payment integration with Razorpay',
        'Offline-first functionality',
        'Cross-platform compatibility (iOS & Android)'
      ],
      challenges: [
        'Implementing real-time data sync across devices',
        'Optimizing AI model for mobile performance',
        'Ensuring HIPAA compliance for health data'
      ],
      results: [
        'Reduced user onboarding time by 40%',
        'Achieved 4.8/5 rating on app stores',
        'Processed 10,000+ secure payments'
      ],
      screenshots: [
        'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      testimonials: [
        {
          name: 'John Doe',
          role: 'CEO, Health Inc.',
          content: 'The AI-powered health app has been a game-changer for our business.',
          avatar: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    },
    metrics: [
      {
        value: '10,000+',
        label: 'Secure Payments',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 8v2a1 1 0 00.293.707l.646.647a1 1 0 001.414-.21l.646.647a1 1 0 000 1.414l-.646.647a1 1 0 00-.293.707V19a1 1 0 01-1 1h-2a1 1 0 01-1-1V8a1 1 0 00-.293-.707L4 6.586A1 1 0 013.707 6l.646-.647a1 1 0 000-.414l-.646-.647a1 1 0 00-.414-.21V2a1 1 0 013-1h4a1 1 0 013 1v1.586l.707.707A1 1 0 0010 2z" />
        </svg>
      }
    ]
  }
] as const;

// Lazy loaded motion components
const MotionDiv = React.lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })));

const containerVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sort: 'newest'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Track render performance
  projectsMetrics.renderCount++;
  projectsMetrics.lastRenderTime = Date.now();

  // Memoized project loading
  const loadProjects = useCallback(async () => {
    const startTime = Date.now();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProjects(PROJECTS_DATA);
      projectsMetrics.projectLoadTime = Date.now() - startTime;
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    projectsMetrics.firstPaint = performance.now();
    projectsMetrics.effectRuns++;
    
    const frameTracker = () => {
      const now = performance.now();
      projectsMetrics.frameCount++;
      
      if (now - projectsMetrics.lastFrameTime > 100) { // Sample every 100ms
        projectsMetrics.avgFrameRate = 
          (projectsMetrics.frameCount * 1000) / (now - projectsMetrics.lastFrameTime);
        projectsMetrics.frameCount = 0;
        projectsMetrics.lastFrameTime = now;
      }
      
      requestAnimationFrame(frameTracker);
    };
    
    frameTracker();
    
    return () => {
      projectsMetrics.domUpdateTime = performance.now() - projectsMetrics.firstPaint;
    };
  }, []);

  if (import.meta.env.DEV) {
    useEffect(() => {
      const interval = setInterval(() => {
        const memoryUsage = 'memory' in performance ? 
          (performance as any).memory.usedJSHeapSize / 1024 / 1024 : 
          null;
        console.log('Projects Performance:', {
          ...projectsMetrics,
          fps: projectsMetrics.avgFrameRate.toFixed(1),
          memory: memoryUsage !== null ? memoryUsage.toFixed(2) + 'MB' : 'N/A'
        });
      }, 20000);
      return () => clearInterval(interval);
    }, []);
  }

  const { metrics } = usePerformanceMetrics(() => {
    console.log('Performance metrics collected');
  });

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];
    
    let result = [...projects];
    
    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(project => 
        project.meta.type === filters.category ||
        project.tech.technologies.some(tech => tech.toLowerCase() === filters.category.toLowerCase())
      );
    }
    
    // Apply search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tech.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.meta.year).getTime() - new Date(a.meta.year).getTime();
        case 'oldest':
          return new Date(a.meta.year).getTime() - new Date(b.meta.year).getTime();
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    return result;
  }, [projects, filters.category, filters.search, filters.sort]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({...prev, search: searchTerm}));
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button 
            className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <span>Filters</span>
            <ChevronDown className={`w-5 h-5 transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Filters Sidebar - Mobile */}
        {isFiltersOpen && (
          <div className="lg:hidden col-span-1">
            <ProjectFilters 
              filters={['all', 'web', 'mobile', 'ai']}
              activeFilter={filters.category}
              onFilterChange={(category) => setFilters(prev => ({...prev, category}))}
              onClearFilters={() => setFilters(prev => ({...prev, category: 'all'}))}
            />
          </div>
        )}
        
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <ProjectFilters 
            filters={['all', 'web', 'mobile', 'ai']}
            activeFilter={filters.category}
            onFilterChange={(category) => setFilters(prev => ({...prev, category}))}
            onClearFilters={() => setFilters(prev => ({...prev, category: 'all'}))}
          />
        </div>
        
        {/* Projects Grid */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:max-w-md">
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search projects"
                />
              </div>
            </div>
            
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
            >
              {loading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
                </div>
              ) : (
                <ProjectList projects={filteredProjects} />
              )}
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;