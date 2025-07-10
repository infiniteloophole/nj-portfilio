import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from './Projects';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.2,
      ease: 'easeOut'
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  },
  hover: {
    y: -2,
    transition: { duration: 0.1 }
  }
};

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = React.memo(({ projects }) => {
  const [expandedProject, setExpandedProject] = React.useState<string | number | null>(null);

  const handleToggleExpand = React.useCallback((id: string | number) => {
    setExpandedProject(prev => prev === id ? null : id);
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent, id: string | number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleExpand(id);
    }
  }, [handleToggleExpand]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      style={{ willChange: 'transform, opacity' }}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            layout="position"
            exit="exit"
            whileHover="hover"
            layoutId={`project-${project.id}`}
          >
            <ProjectCard 
              project={project}
              isExpanded={expandedProject === project.id}
              onToggleExpand={() => handleToggleExpand(project.id)}
              onKeyDown={(e) => handleKeyDown(e, project.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});

export default ProjectList;
