
import React from 'react';
import { CountrySession } from '@/types/dashboard';
import { MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface SessionsByCountryProps {
  data: CountrySession[];
}

const SessionsByCountry: React.FC<SessionsByCountryProps> = ({ data }) => {
  const isEmpty = data.length === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="chart-container"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Session by Country</h3>
        <button className="p-1.5 hover:bg-secondary rounded-md">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Showing Data for Top Session</p>
      
      {isEmpty ? (
        <div className="h-48 flex items-center justify-center">
          <div className="text-center text-muted-foreground flex flex-col items-center justify-center">
            <div className="w-14 h-14 mb-2 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xl">🌎</span>
            </div>
            <p>Nothing data here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((country, index) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-center"
            >
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <span className="text-lg">{country.flag}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{country.country}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{country.sessions}</span>
                    <span className="text-xs text-muted-foreground">{country.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${country.percentage * 12}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className="h-full bg-brand-green rounded-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SessionsByCountry;
