
import React from 'react';
import { LayoutGrid, Filter, Share, Move, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';

interface DashboardToolbarProps {
  onCustomizeWidget?: () => void;
  onFilter?: () => void;
  onShare?: () => void;
  demoMode?: boolean;
}

const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  onCustomizeWidget,
  onFilter,
  onShare,
  demoMode = true
}) => {
  return (
    <div className="px-6 py-3 border-b border-border/40">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Overview</h1>
          {demoMode ? (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Database className="h-3 w-3" />
              Live Data
            </span>
          ) : (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Database className="h-3 w-3" />
              Demo Data
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={onCustomizeWidget}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Customize Widgets</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={onFilter}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={onShare}
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;
