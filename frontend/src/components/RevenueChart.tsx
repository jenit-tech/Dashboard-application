
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ChartDataPoint } from '@/types/dashboard';
import { Download, MoreHorizontal, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RevenueChartProps {
  data: ChartDataPoint[];
  totalRevenue: number;
  totalTarget: number;
  revenuePercent: number;
  targetPercent: number;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const customTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-md shadow-md p-3 text-sm">
        <p className="font-semibold mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center">
            <Circle size={8} className="text-brand-green mr-2" fill="#0D9171" />
            <span>Revenue: {formatter.format(payload[0].value as number)}</span>
          </div>
          <div className="flex items-center">
            <Circle size={8} className="text-amber-500 mr-2" fill="#F59E0B" />
            <span>Target: {formatter.format(payload[1].value as number)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data, 
  totalRevenue, 
  totalTarget,
  revenuePercent,
  targetPercent
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="chart-container"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Revenue Over Time</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-secondary rounded-md">
            <Download size={18} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded-md">
            <MoreHorizontal size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <Circle size={8} className="text-brand-green" fill="#0D9171" />
          <span className="text-sm">Total Revenue</span>
          <span className="font-semibold">{formatter.format(totalRevenue)}</span>
          <span className="text-xs text-muted-foreground">{revenuePercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={8} className="text-amber-500" fill="#F59E0B" />
          <span className="text-sm">Total Target</span>
          <span className="font-semibold">{formatter.format(totalTarget)}</span>
          <span className="text-xs text-muted-foreground">{targetPercent}%</span>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip content={customTooltip} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0D9171" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6, fill: "#0D9171", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6, fill: "#F59E0B", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
