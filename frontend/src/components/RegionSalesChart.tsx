
import React from 'react';
import { RegionSales } from '@/types/dashboard';
import { MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';

interface RegionSalesChartProps {
  data: RegionSales[];
}

const RegionSalesChart: React.FC<RegionSalesChartProps> = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="chart-container"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Sales by Region</h3>
        <button className="p-1.5 hover:bg-secondary rounded-md">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={80} data={data}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis 
              dataKey="region" 
              tick={{ fontSize: 11, fill: '#888' }}
            />
            <Radar
              name="Sales"
              dataKey="sales"
              stroke="#0D9171"
              fill="#0D9171"
              fillOpacity={0.4}
              animationDuration={1000}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RegionSalesChart;
