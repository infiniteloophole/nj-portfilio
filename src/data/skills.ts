export const SKILLS_DATA = [
  { name: 'Next.js', category: 'Frontend', proficiency: 4, description: 'Full-stack React framework with SSR, SSG and API routes' },
  { name: 'GraphQL', category: 'API', proficiency: 4, description: 'Query language for APIs with strongly typed schema' },
  { name: 'React Native', category: 'Mobile Development', proficiency: 4, description: 'Building cross-platform mobile applications' },
  { name: 'React', category: 'Frontend', proficiency: 5, description: 'Component-based UI library with hooks and context API' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 4, description: 'Strongly typed JavaScript superset for better tooling' },
  { name: 'JavaScript', category: 'Frontend', proficiency: 5, description: 'Frontend and backend development' },
  { name: 'Node.js', category: 'Backend', proficiency: 4, description: 'JavaScript runtime for building scalable server-side applications' },
  { name: 'Python', category: 'Backend', proficiency: 5, description: 'Versatile language for backend, scripting, and data analysis' },
  { 
    name: 'FastAPI', 
    category: 'Backend', 
    proficiency: 4, 
    description: 'Modern, fast (high-performance) web framework for building APIs with Python',
    icon: 'fastapi',
    color: '#009688'
  },
  { name: 'FastAPI', category: 'Backend', proficiency: 4, description: 'Modern, fast web framework for APIs' },
  { name: 'Django', category: 'Backend', proficiency: 3, description: 'High-level Python web framework' },
  { name: 'PostgreSQL', category: 'Database', proficiency: 4, description: 'Relational database with advanced features and performance' },
  { name: 'MongoDB', category: 'Database', proficiency: 3, description: 'NoSQL database solutions' },
  { name: 'Docker', category: 'DevOps', proficiency: 4, description: 'Containerization platform for consistent development environments' },
  { name: 'AWS', category: 'DevOps', proficiency: 3, description: 'Cloud services including EC2, S3, Lambda, and RDS' },
  { name: 'Git', category: 'Version Control', proficiency: 5, description: 'Distributed version control system for collaboration' },
  { name: 'REST API', category: 'API', proficiency: 5, description: 'Designing and consuming RESTful services' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 5, description: 'Utility-first CSS framework for rapid UI development' },
  { name: 'Redux', category: 'State Management', proficiency: 4, description: 'Predictable state container' },
  { name: 'Jest', category: 'Testing', proficiency: 4, description: 'JavaScript testing framework with snapshot and coverage support' },
  { name: 'Cypress', category: 'Testing', proficiency: 3, description: 'End-to-end testing' },
  { name: 'CI/CD', category: 'DevOps', proficiency: 4, description: 'Continuous integration and deployment pipelines' },
] as const;

export type Skill = typeof SKILLS_DATA[number];
