import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const students = [
    {
      name: "Gaurang Shirodkar",
      id: "1BM22IS256",
      email: "gaurangrs.is22@bmsce.ac.in"
    },
    {
      name: "Nikhil Sharma",
      id: "1BM22IS122",
      email: "nikhilsharma.is22@bmsce.ac.in"
    },
    {
        name: "Nikhil Singh",
        id: "1BM22IS123",
        email: "nikhilsingh.is22@bmsce.ac.in"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer 
      className="w-full bg-gray-900 text-white py-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left section with title */}
          <motion.div 
            variants={itemVariants}
            className="md:w-1/4"
          >
            <h2 className="text-xl font-bold">CNS <br/> Project Team</h2>
            <p className="text-sm text-gray-400">{new Date().getFullYear()}</p>
          </motion.div>

          {/* Center section with student info */}
          <div className="flex flex-wrap md:flex-nowrap justify-center md:space-x-8 md:w-2/4">
            {students.map((student, index) => (
              <motion.div 
                key={student.id}
                className="px-4 py-2 mt-2"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm font-semibold mb-2 ">{student.name}</h3>
                <p className="text-xs text-gray-400">{student.id}</p>
                <motion.a 
                  href={`mailto:${student.email}`}
                  className="text-xs mt-2 text-blue-400 hover:text-blue-300 inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {student.email}
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Right section */}
          <motion.div 
            variants={itemVariants}
            className="md:w-1/4 text-right"
          >
            <p className="text-sm text-gray-400">College Project</p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;