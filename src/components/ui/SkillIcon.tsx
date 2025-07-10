import * as React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import * as icons from 'simple-icons';

type SkillIconProps = {
  name: string;
  className?: string;
};

// Common icon mappings for skills with different names
const ICON_MAPPINGS: Record<string, string> = {
  'ci/cd': 'GitHubActions',
  'rest api': 'Swagger',
  'aws': 'AmazonAWS',
  'fastapi': 'FastApi'
};

const getIcon = (name: string, isDark: boolean) => {
  // Check custom mappings first
  const mappedName = ICON_MAPPINGS[name.toLowerCase()];
  const iconKey = mappedName || Object.keys(icons).find(
    key => key.toLowerCase() === name.toLowerCase().replace(/[^a-z0-9]/g, '')
  );
  
  if (iconKey && icons[iconKey as keyof typeof icons]) {
    const icon = icons[iconKey as keyof typeof icons] as { path: string, hex: string };
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <motion.path
          d={icon.path}
          fill={`#${icon.hex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </svg>
    );
  }
  
  // Fallback icon
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <motion.circle 
        cx="12" cy="12" r="10" 
        fill={isDark ? "#ffffff" : "#000000"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
};

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div 
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {getIcon(name, isDark)}
    </motion.div>
  );
};
