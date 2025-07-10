import { Suspense, lazy, useEffect, useState, useRef, useCallback } from 'react';
import { startTransition } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import projectShowcaseData from './data/projectShowcaseData';
import projectsData from './data/projects';

// Lazy load components with preloading
const Cursor = lazy(() => import('./components/Cursor'));
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const EnhancedAbout = lazy(() => import('./components/EnhancedAbout'));
const Projects = lazy(() => import('./components/Projects'));
const CaseStudy = lazy(() => import('./components/CaseStudy'));
const ProjectShowcase = lazy(() => import('./components/ProjectShowcase'));
const Contact = lazy(() => import('./components/Contact'));
const Resume = lazy(() => import('./components/resume/Resume'));
const TechStack = lazy(() => import('./components/tech-stack/TechStack'));
const CodeSnippets = lazy(() => import('./components/code-snippets/CodeSnippets'));
const Footer = lazy(() => import('./components/Footer'));
const GitHubStats = lazy(() => 
  import('./components/GitHubStats').then(module => ({ default: module.default }))
);

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Main App component
export function App() {
  const [activeSection, setActiveSection] = useState('home');
  
  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }, []);

  // Client-side initialization
  useEffect(() => {
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.overflow = 'auto';
    
    return () => {
      document.body.style.opacity = '1';
      document.body.style.visibility = 'visible';
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Router>
            <div className="cursor-none min-h-screen flex flex-col">
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <Cursor />
                </Suspense>
              </ErrorBoundary>
              <Header activeSection={activeSection} onNavigate={handleNavigate} />
              <main className="flex-grow">
                <AppContent 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection}
                  onNavigate={handleNavigate}
                />
              </main>
              <Footer />
            </div>
          </Router>
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

// Add type definition before AppContent component
interface AppContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onNavigate: (sectionId: string) => void;
}

// Content component that handles the main app logic
function AppContent({ activeSection, setActiveSection, onNavigate }: AppContentProps) {
  const [isLoading] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const codeSnippetsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const githubStatsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup intersection observer for sections
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            startTransition(() => {
              setActiveSection(sectionId);
            });
            
            if (history.replaceState) {
              const url = sectionId === 'home' 
                ? window.location.pathname 
                : `#${sectionId}`;
              history.replaceState(null, '', url);
            }
          }
        }
      });
    };
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    
    observerRef.current = new IntersectionObserver(handleIntersection, options);
    
    // Observe all sections
    const sections = [
      heroRef.current,
      aboutRef.current,
      projectsRef.current,
      techStackRef.current,
      codeSnippetsRef.current,
      resumeRef.current,
      contactRef.current,
    ].filter(Boolean) as Element[];
    
    sections.forEach(section => {
      if (section) observerRef.current?.observe(section);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Loading state
  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Portfolio | {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</title>
        <meta name="description" content={`Najmus Saquib - ${activeSection} section`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      
      <ErrorBoundary fallback={<div>Header failed to load</div>}>
        <Suspense fallback={null}>
          <Header activeSection={activeSection} onNavigate={onNavigate} />
        </Suspense>
      </ErrorBoundary>
      
      <main>
        <ErrorBoundary>
          <div ref={heroRef} id="home">
            <Suspense fallback={<div className="h-screen" />}>
              <Hero onNavigate={onNavigate} />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <div ref={aboutRef} id="about">
          <Suspense fallback={<div className="min-h-screen" />}>
            <EnhancedAbout />
          </Suspense>
        </div>
        
        <ErrorBoundary>
          <div ref={projectsRef} id="projects" className="py-16 md:py-24 lg:py-32">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Projects />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div ref={techStackRef} id="tech-stack" className="py-16 md:py-24 lg:py-32 bg-gray-50">
            <Suspense fallback={<div className="min-h-screen" />}>
              <TechStack />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div ref={codeSnippetsRef} id="code-snippets" className="py-16 md:py-24 lg:py-32 bg-gray-50">
            <Suspense fallback={<div className="min-h-screen" />}>
              <CodeSnippets />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div ref={resumeRef} id="resume" className="py-16 md:py-24 lg:py-32">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Resume />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div id="showcase" className="py-16 md:py-24 lg:py-32 bg-gray-50">
            <Suspense fallback={<div className="min-h-screen" />}>
              <ProjectShowcase projects={projectShowcaseData || []} />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section id="github-stats" className="py-16 md:py-24 lg:py-32 bg-gray-50">
            <div ref={githubStatsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  GitHub <span className="text-gray-800">Contributions</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Check out my open-source contributions on{' '}
                  <a 
                    href="https://github.com/nsaquib22" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-900 hover:text-black font-medium underline"
                  >
                    GitHub
                  </a>
                </p>
              </div>
              <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading GitHub stats...</div>}>
                  <GitHubStats username="nsaquib22" className="w-full" />
                </Suspense>
              </div>
            </div>
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div ref={contactRef} id="contact">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Contact />
            </Suspense>
          </div>
        </ErrorBoundary>
      </main>
      
      <Routes>
        <Route path="/privacy" element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Suspense fallback={<div>Loading...</div>}>
              <PrivacyPolicy />
            </Suspense>
          </div>
        } />
        
        <Route path="/terms" element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Suspense fallback={<div>Loading...</div>}>
              <TermsOfService />
            </Suspense>
          </div>
        } />
        
        <Route path="/case-studies/:id" element={
          <div className="min-h-screen bg-white py-16">
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <CaseStudy projects={projectsData} />
              </Suspense>
            </ErrorBoundary>
          </div>
        } />
        
        <Route path="/tech-stack" element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Suspense fallback={<div>Loading...</div>}>
              <TechStack />
            </Suspense>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
