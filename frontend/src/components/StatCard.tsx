
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { StatCard as StatCardType } from '@/types/dashboard';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  data: StatCardType;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ data, delay = 0 }) => {
  const { title, value, change, period } = data;
  
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <Card className="border border-border/50">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <div className="text-2xl font-bold mb-2">{value}</div>
          <div className="flex items-center text-sm">
            <span 
              className={`flex items-center 
                ${isPositive ? 'text-emerald-500' : isNeutral ? 'text-gray-500' : 'text-red-500'}`}
            >
              {!isNeutral && (
                <>
                  {isPositive ? 
                    <ArrowUp size={16} className="text-emerald-500" /> : 
                    <ArrowDown size={16} className="text-red-500" />
                  }
                  <span className="ml-1">{isPositive ? '+' : ''}{change}%</span>
                </>
              )}
              {isNeutral && <span>0.00%</span>}
            </span>
            <span className="ml-2 text-muted-foreground">{period}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
