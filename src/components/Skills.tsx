import { useState, useEffect, useMemo } from 'react';
import { SKILLS_DATA } from '../data/skills';
import { SkillIcon } from './ui/SkillIcon';
import ChevronDown from './icons/ChevronDown';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  description: string;
}

interface SkillItemProps {
  skill: Skill;
  index: number;
}

const SkillItem = ({ skill, index }: { skill: Skill; index: number }) => (
  <div 
    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center"
    aria-label={`${skill.name} - Proficiency ${skill.proficiency}/5`}
  >
    <SkillIcon name={skill.name} className="w-12 h-12 mb-2" />
    <h3 className="font-medium">{skill.name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{skill.category}</p>
    
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>Proficiency:</span>
        <span>{skill.proficiency}/5</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredSkills = useMemo(() => {
    let result = SKILLS_DATA;
    if (activeCategory !== 'All') {
      result = result.filter(skill => skill.category === activeCategory);
    }
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(term) ||
        skill.description.toLowerCase().includes(term)
      );
    }
    return result;
  }, [activeCategory, debouncedSearchTerm]);

  // Memoized categories
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(SKILLS_DATA.map((s: Skill) => s.category)))];
  }, []);

  return (
    <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8" aria-label="Skills and Technologies">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Technologies I'm proficient with, rated from 1 (familiar) to 5 (expert)
          </p>
        </div>
        
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            aria-expanded={isMobileFiltersOpen}
            aria-controls="mobile-filters"
          >
            <span>Filters</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileFiltersOpen ? 'transform rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters */}
        <div 
          id="mobile-filters"
          className={`${isMobileFiltersOpen ? 'block' : 'hidden'} md:block mb-8`}
        >
          <div className="lg:hidden mb-6">
            <button 
              className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <span>Filters</span>
              <ChevronDown className={`w-5 h-5 transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="hidden lg:block w-full lg:w-64">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow sticky top-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="w-full px-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === category 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {filteredSkills.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No skills found matching your criteria.</p>
              </div>
            ) : (
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                role="list"
                aria-label="List of skills"
              >
                {filteredSkills.map((skill, index) => (
                  <SkillItem key={`${skill.name}-${index}`} skill={skill} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
