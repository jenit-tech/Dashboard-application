
import React from 'react';
import { PlatformSales } from '@/types/dashboard';
import { MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface PlatformSalesChartProps {
  data: PlatformSales[];
}

const COLORS = ['#0088FE', '#0D9171', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#888" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {name} {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PlatformSalesChart: React.FC<PlatformSalesChartProps> = ({ data }) => {
  const renderPieData = data.map(item => ({
    name: item.platform,
    value: item.percentage,
    icon: item.icon
  }));

  const isEmpty = data.every(item => item.percentage === 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="chart-container"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Sales by e-commerce platform</h3>
        <button className="p-1.5 hover:bg-secondary rounded-md">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>
      
      <div className="h-48 flex items-center justify-center">
        {isEmpty ? (
          <div className="text-center text-muted-foreground flex flex-col items-center justify-center">
            <div className="w-14 h-14 mb-2 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <p>Nothing data here</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={renderPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
                animationBegin={300}
              >
                {renderPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default PlatformSalesChart;
