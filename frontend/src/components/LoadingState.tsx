
import React from 'react';
import { motion } from 'framer-motion';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="loader mb-4"></div>
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </motion.div>
    </div>
  );
};

export default LoadingState;
