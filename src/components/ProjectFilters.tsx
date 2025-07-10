import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectFilter {
  id: string;
  name: string;
  count: number;
  icon?: React.ReactNode;
}

interface ProjectFiltersProps {
  filters: ProjectFilter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  onClearFilters: () => void;
  className?: string;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  onClearFilters,
  className = ''
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(true);

  const [isMounted, setIsMounted] = useState(false);

  // Track if component is mounted to handle animations
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  const toggleDesktopFilters = () => {
    setIsDesktopFiltersOpen(!isDesktopFiltersOpen);
  };

  const handleFilterClick = (filterId: string) => {
    onFilterChange(filterId);
    
    // Close mobile filters after selection
    if (window.innerWidth < 768) {
      setIsMobileFiltersOpen(false);
    }
  };

  const handleClearFilters = () => {
    onClearFilters();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  // Filter out filters with 0 count and sort by count (descending)
  const sortedFilters = React.useMemo(() => 
    [...filters]
      .filter(filter => filter.count > 0)
      .sort((a, b) => b.count - a.count),
    [filters]
  );

  // Check if any filter is active
  const isFilterActive = React.useMemo(() => activeFilter !== 'all', [activeFilter]);

  return (
    <div className={`${className} w-full`}>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={toggleMobileFilters}
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-expanded={isMobileFiltersOpen}
          aria-controls="mobile-filters"
        >
          <span className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            {isFilterActive 
              ? filters.find(f => f.id === activeFilter)?.name || 'Filter by category' 
              : 'Filter by category'}
          </span>
          {isMobileFiltersOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {(isMobileFiltersOpen || isMounted) && (
          <motion.div
            id="mobile-filters"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{
              opacity: isMobileFiltersOpen ? 1 : 0,
              height: isMobileFiltersOpen ? 'auto' : 0,
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Filter by category
                </h3>
                <button
                  type="button"
                  onClick={toggleMobileFilters}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isMobileFiltersOpen ? 'show' : 'hidden'}
                className="space-y-2"
              >
                {sortedFilters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    variants={itemVariants}
                    type="button"
                    onClick={() => handleFilterClick(filter.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-pressed={activeFilter === filter.id}
                  >
                    <span className="flex items-center">
                      {filter.icon && <span className="mr-2">{filter.icon}</span>}
                      {filter.name}
                    </span>
                    <span 
                      className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                        activeFilter === filter.id 
                          ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filter.count}
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              {isFilterActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear filters
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Filter by category
          </h3>
          <button
            type="button"
            onClick={toggleDesktopFilters}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-expanded={isDesktopFiltersOpen}
            aria-controls="desktop-filters"
          >
            {isDesktopFiltersOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isDesktopFiltersOpen && (
            <motion.div
              id="desktop-filters"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="space-y-2"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-1"
              >
                {sortedFilters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    variants={itemVariants}
                    type="button"
                    onClick={() => handleFilterClick(filter.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-pressed={activeFilter === filter.id}
                  >
                    <span className="flex items-center">
                      {filter.icon && <span className="mr-2">{filter.icon}</span>}
                      {filter.name}
                    </span>
                    <span 
                      className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                        activeFilter === filter.id 
                          ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filter.count}
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              {isFilterActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2"
                >
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear filter
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ProjectFilters);
