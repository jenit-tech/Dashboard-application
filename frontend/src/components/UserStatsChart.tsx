
import React from 'react';
import { UserStats } from '@/types/dashboard';
import { MoreHorizontal, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserStatsChartProps {
  data: UserStats;
}

const UserStatsChart: React.FC<UserStatsChartProps> = ({ data }) => {
  const { totalUsers, premiumUsers, basicUsers } = data;
  

  const premiumPercent = totalUsers > 0 ? (premiumUsers / totalUsers) * 100 : 0;
  const basicPercent = totalUsers > 0 ? (basicUsers / totalUsers) * 100 : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="chart-container"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Registered users</h3>
        <button className="p-1.5 hover:bg-secondary rounded-md">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">an overview of your users</p>
      
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
          
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="10"
            />
            
          
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#0D9171"
              strokeWidth="10"
              strokeDasharray={`${premiumPercent * 2.83} ${(100 - premiumPercent) * 2.83}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              style={{
                transition: "stroke-dasharray 1s ease-in-out"
              }}
            />
            </svg>
          
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold mt-8">{totalUsers.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Total Users</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center">
            <div className="text-lg font-semibold">{premiumUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Premium Plan</div>
            <div className="w-full h-2 bg-muted rounded-full mt-2">
              <div 
                className="h-full bg-brand-green rounded-full" 
                style={{ width: `${premiumPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{basicUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Basic Plan</div>
            <div className="w-full h-2 bg-muted rounded-full mt-2">
              <div 
                className="h-full bg-neutral rounded-full" 
                style={{ width: `${basicPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserStatsChart;
