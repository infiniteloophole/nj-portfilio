import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const Resume: React.FC = () => {
  const resumeUrl = '/resume/resume.pdf';
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <div className="w-16 h-1 bg-gray-300 mb-4 mx-auto"></div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            My Resume
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A summary of my professional experience, skills, and education
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <FileText className="w-8 h-8 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Najmus Saquib</h3>
                  <p className="text-gray-600">Full Stack Developer</p>
                </div>
              </div>
              <a
                href={resumeUrl}
                download="Najmus_Saquib_Resume.pdf"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Experience</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium text-gray-900">Senior Full Stack Developer</h5>
                      <p className="text-gray-600 text-sm">Tech Company Inc. • 2020 - Present</p>
                      <p className="text-gray-600 mt-1">
                        Leading development of web applications using modern technologies.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Full Stack Developer</h5>
                      <p className="text-gray-600 text-sm">Web Solutions Ltd. • 2018 - 2020</p>
                      <p className="text-gray-600 mt-1">
                        Developed and maintained multiple client websites and applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Education</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium text-gray-900">MSc in Computer Science</h5>
                      <p className="text-gray-600 text-sm">University of Technology • 2016 - 2018</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">BSc in Software Engineering</h5>
                      <p className="text-gray-600 text-sm">Tech University • 2012 - 2016</p>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
