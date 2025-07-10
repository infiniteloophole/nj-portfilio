import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Database, Server, Smartphone, Cloud, GitBranch, CpuIcon, Shield, Wifi } from 'lucide-react';

type TechCategory = 'frontend' | 'backend' | 'mobile' | 'devops' | 'database' | 'tools' | 'ai' | 'cloud';

interface TechItem {
  name: string;
  icon: JSX.Element;
  category: TechCategory;
  proficiency: number; // 1-5
}

const techItems: TechItem[] = [
  // Frontend
  { name: 'React', icon: <Code className="w-6 h-6" />, category: 'frontend', proficiency: 5 },
  { name: 'TypeScript', icon: <Code className="w-6 h-6" />, category: 'frontend', proficiency: 5 },
  { name: 'JavaScript', icon: <Code className="w-6 h-6" />, category: 'frontend', proficiency: 5 },
  { name: 'HTML5', icon: <Code className="w-6 h-6" />, category: 'frontend', proficiency: 5 },
  { name: 'CSS3', icon: <Code className="w-6 h-6" />, category: 'frontend', proficiency: 5 },
  { name: 'Tailwind CSS', icon: <Code className="w-6 h-6" />, category: 'frontend', proficiency: 5 },
  
  // Backend
  { name: 'Node.js', icon: <Server className="w-6 h-6" />, category: 'backend', proficiency: 5 },
  { name: 'Express', icon: <Server className="w-6 h-6" />, category: 'backend', proficiency: 5 },
  { name: 'Python', icon: <Server className="w-6 h-6" />, category: 'backend', proficiency: 4 },
  { name: 'Django', icon: <Server className="w-6 h-6" />, category: 'backend', proficiency: 4 },
  { name: 'GraphQL', icon: <Server className="w-6 h-6" />, category: 'backend', proficiency: 4 },
  
  // Mobile
  { name: 'React Native', icon: <Smartphone className="w-6 h-6" />, category: 'mobile', proficiency: 4 },
  { name: 'Flutter', icon: <Smartphone className="w-6 h-6" />, category: 'mobile', proficiency: 3 },
  
  // Database
  { name: 'MongoDB', icon: <Database className="w-6 h-6" />, category: 'database', proficiency: 5 },
  { name: 'PostgreSQL', icon: <Database className="w-6 h-6" />, category: 'database', proficiency: 4 },
  { name: 'Firebase', icon: <Database className="w-6 h-6" />, category: 'database', proficiency: 4 },
  
  // DevOps & Cloud
  { name: 'Docker', icon: <Cloud className="w-6 h-6" />, category: 'devops', proficiency: 4 },
  { name: 'Kubernetes', icon: <Cloud className="w-6 h-6" />, category: 'devops', proficiency: 3 },
  { name: 'AWS', icon: <Cloud className="w-6 h-6" />, category: 'cloud', proficiency: 4 },
  { name: 'GCP', icon: <Cloud className="w-6 h-6" />, category: 'cloud', proficiency: 3 },
  
  // AI/ML
  { name: 'TensorFlow', icon: <Cpu className="w-6 h-6" />, category: 'ai', proficiency: 3 },
  { name: 'PyTorch', icon: <Cpu className="w-6 h-6" />, category: 'ai', proficiency: 3 },
  
  // Tools
  { name: 'Git', icon: <GitBranch className="w-6 h-6" />, category: 'tools', proficiency: 5 },
  { name: 'GitHub', icon: <GitBranch className="w-6 h-6" />, category: 'tools', proficiency: 5 },
  { name: 'Jest', icon: <Shield className="w-6 h-6" />, category: 'tools', proficiency: 4 },
  { name: 'Cypress', icon: <Shield className="w-6 h-6" />, category: 'tools', proficiency: 4 },
];

const categoryIcons: Record<TechCategory, JSX.Element> = {
  frontend: <Code className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  mobile: <Smartphone className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  devops: <Cloud className="w-5 h-5" />,
  cloud: <Cloud className="w-5 h-5" />,
  ai: <CpuIcon className="w-5 h-5" />,
  tools: <Wifi className="w-5 h-5" />,
};

const categoryLabels: Record<TechCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database',
  devops: 'DevOps',
  cloud: 'Cloud',
  ai: 'AI/ML',
  tools: 'Tools',
};

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<TechCategory>('frontend');
  
  const filteredItems = techItems.filter(item => item.category === activeCategory);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="tech-stack" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tech <span className="text-gray-800">Stack</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies I've worked with and my proficiency level
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(Object.keys(categoryLabels) as TechCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredItems.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {tech.icon}
                </div>
                <h3 className="font-medium text-gray-900">{tech.name}</h3>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div 
                  className="bg-black h-1.5 rounded-full"
                  style={{ width: `${(tech.proficiency / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={i < tech.proficiency ? 'text-black' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
