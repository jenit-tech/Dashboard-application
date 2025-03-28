
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface WidgetTableViewProps {
  title: string;
  columns: string[];
  rows: any[][];
}

const WidgetTableView: React.FC<WidgetTableViewProps> = ({ title, columns, rows }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border border-border/50">
        <div className="flex justify-between items-center p-4 border-b border-border/40">
          <h3 className="font-medium">{title}</h3>
          <button className="p-1.5 hover:bg-secondary rounded-md">
            <MoreHorizontal size={18} className="text-muted-foreground" />
          </button>
        </div>
        
        <div className="overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className="font-medium">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
};

export default WidgetTableView;
