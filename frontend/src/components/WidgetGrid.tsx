import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardData } from '@/types/dashboard';
import { WidgetDefinition } from '@/types/widget';
import StatCard from '@/components/StatCard';
import RevenueChart from '@/components/RevenueChart';
import SessionsByCountry from '@/components/SessionsByCountry';
import RegionSalesChart from '@/components/RegionSalesChart';
import PlatformSalesChart from '@/components/PlatformSalesChart';
import UserStatsChart from '@/components/UserStatsChart';
import CustomizeWidgetDialog from '@/components/CustomizeWidgetDialog';
import WidgetTableView from '@/components/WidgetTableView';
import { toast } from 'sonner';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { Move, Trash2, Plus, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

interface WidgetGridProps {
  data: DashboardData;
  isCustomizing: boolean;
  onSaveLayout: (widgets: WidgetDefinition[]) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ 
  data,
  isCustomizing,
  onSaveLayout
}) => {
  const [widgets, setWidgets] = useState<WidgetDefinition[]>([
    { id: 'totalIncome', title: 'Total Income', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 0, y: 0 } },
    { id: 'profit', title: 'Profit', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 1, y: 0 } },
    { id: 'totalViews', title: 'Total Views', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 2, y: 0 } },
    { id: 'conversionRate', title: 'Conversion Rate', type: 'statCard', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 3, y: 0 } },
    { id: 'revenueChart', title: 'Revenue Over Time', type: 'chart', defaultSize: { w: 2, h: 1 }, defaultPosition: { x: 0, y: 1 } },
    { id: 'sessionsByCountry', title: 'Sessions by Country', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 2, y: 1 } },
    { id: 'regionSalesChart', title: 'Sales by Region', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 0, y: 2 } },
    { id: 'platformSalesChart', title: 'Sales by e-commerce platform', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 1, y: 2 } },
    { id: 'userStatsChart', title: 'Registered users', type: 'chart', defaultSize: { w: 1, h: 1 }, defaultPosition: { x: 2, y: 2 } },
  ]);
  
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggingWidget, setDraggingWidget] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await api.fetchWidgets();
        if (response && response.length > 0) {
          setWidgets(response);
        }
      } catch (error) {
        console.error('Error fetching widgets:', error);
        // Keep default widgets if fetch fails
      }
    };

    fetchWidgets();
  }, []);
  
  useEffect(() => {
    if (isCustomizing) {
      setCustomizeDialogOpen(true);
    }
  }, [isCustomizing]);
  
  useEffect(() => {
    if (!customizeDialogOpen) {
      setTimeout(() => {
        setIsEditMode(false);
      }, 300);
    }
  }, [customizeDialogOpen]);
  
  const handleSaveWidgets = async (updatedWidgets: WidgetDefinition[]) => {
    try {
      setWidgets(updatedWidgets);
      await api.saveWidgets(updatedWidgets);
      onSaveLayout(updatedWidgets);
      setIsEditMode(false);
      toast.success('Widget layout saved successfully');
    } catch (error) {
      console.error('Error saving widgets:', error);
      toast.error('Failed to save widget layout');
    }
  };

  const handleRemoveWidget = async (id: string) => {
    try {
      const updatedWidgets = widgets.filter(widget => widget.id !== id);
      setWidgets(updatedWidgets);
      await api.saveWidgets(updatedWidgets);
      toast.success('Widget removed');
    } catch (error) {
      console.error('Error removing widget:', error);
      toast.error('Failed to remove widget');
    }
  };

  const handleMoveWidget = async (id: string, direction: 'up' | 'down' | 'left' | 'right') => {
    const updatedWidgets = widgets.map(widget => {
      if (widget.id === id) {
        const newPosition = { ...widget.defaultPosition };
        
        switch (direction) {
          case 'up':
            newPosition.y = Math.max(0, newPosition.y - 1);
            break;
          case 'down':
            newPosition.y = newPosition.y + 1;
            break;
          case 'left':
            newPosition.x = Math.max(0, newPosition.x - 1);
            break;
          case 'right':
            newPosition.x = newPosition.x + 1;
            break;
        }
        
        return { ...widget, defaultPosition: newPosition };
      }
      return widget;
    });
    
    setWidgets(updatedWidgets);
    try {
      await api.saveWidgets(updatedWidgets);
    } catch (error) {
      console.error('Error saving widget positions:', error);
      toast.error('Failed to save widget positions');
    }
  };

  const handleDragStart = (id: string) => {
    setDraggingWidget(id);
  };

  const handleDragEnd = () => {
    setDraggingWidget(null);
  };

  const handleDrop = async (targetId: string) => {
    if (!draggingWidget || draggingWidget === targetId) return;
    
    const updatedWidgets = [...widgets];
    const draggedWidgetIndex = updatedWidgets.findIndex(w => w.id === draggingWidget);
    const targetWidgetIndex = updatedWidgets.findIndex(w => w.id === targetId);
    
    if (draggedWidgetIndex !== -1 && targetWidgetIndex !== -1) {
      const draggedWidgetPos = { ...updatedWidgets[draggedWidgetIndex].defaultPosition };
      const targetWidgetPos = { ...updatedWidgets[targetWidgetIndex].defaultPosition };
      
      updatedWidgets[draggedWidgetIndex].defaultPosition = targetWidgetPos;
      updatedWidgets[targetWidgetIndex].defaultPosition = draggedWidgetPos;
      
      setWidgets(updatedWidgets);
      try {
        await api.saveWidgets(updatedWidgets);
        toast.success('Widgets swapped positions');
      } catch (error) {
        console.error('Error saving widget positions:', error);
        toast.error('Failed to save widget positions');
      }
    }
    
    setDraggingWidget(null);
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      toast.info('Edit mode enabled. You can now rearrange and resize widgets.');
    } else {
      handleSaveWidgets(widgets);
    }
  };
  
  const renderWidget = (widget: WidgetDefinition) => {
    if (widget.config?.dataSource === 'custom' && widget.config?.data) {
      switch (widget.type) {
        case 'statCard':
          return (
            <StatCard 
              data={{
                title: widget.title,
                value: widget.config.data.value || 'N/A',
                change: widget.config.data.change || 0,
                period: widget.config.data.period || 'vs. last period'
              }} 
              delay={0} 
            />
          );
        case 'chart':
          return (
            <div className="h-full bg-card rounded-lg p-4 border border-border/50">
              <h3 className="text-sm font-medium mb-2">{widget.title}</h3>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Custom chart visualization
              </div>
            </div>
          );
        case 'table':
          return (
            <WidgetTableView 
              title={widget.title}
              columns={widget.config.data.columns || []}
              rows={widget.config.data.rows || []}
            />
          );
        default:
          return <div>Unknown widget type: {widget.type}</div>;
      }
    }
    
    switch (widget.id) {
      case 'totalIncome':
        return <StatCard data={data.stats.totalIncome} delay={0} />;
      case 'profit':
        return <StatCard data={data.stats.profit} delay={1} />;
      case 'totalViews':
        return <StatCard data={data.stats.totalViews} delay={2} />;
      case 'conversionRate':
        return <StatCard data={data.stats.conversionRate} delay={3} />;
      case 'revenueChart':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <RevenueChart 
              data={data.revenue.chartData}
              totalRevenue={data.revenue.totalRevenue}
              totalTarget={data.revenue.totalTarget}
              revenuePercent={data.revenue.revenuePercent}
              targetPercent={data.revenue.targetPercent}
            />
          </motion.div>
        );
      case 'sessionsByCountry':
        return <SessionsByCountry data={data.sessions} />;
      case 'regionSalesChart':
        return <RegionSalesChart data={data.regionSales} />;
      case 'platformSalesChart':
        return <PlatformSalesChart data={data.platformSales} />;
      case 'userStatsChart':
        return <UserStatsChart data={data.userStats} />;
      case 'topProducts':
      case 'recentOrders':
      case 'customerList':
        return (
          <WidgetTableView 
            title={widget.title}
            columns={['Name', 'Value', 'Status']}
            rows={[
              ['Item 1', '$100', 'Active'],
              ['Item 2', '$200', 'Pending'],
              ['Item 3', '$300', 'Completed']
            ]}
          />
        );
      default:
        if (widget.type === 'statCard') {
          return <StatCard data={{ title: widget.title, value: 'N/A', change: 0, period: 'vs. last month' }} delay={0} />;
        } else if (widget.type === 'chart') {
          return (
            <div className="h-full bg-card rounded-lg p-4 border border-border/50">
              <h3 className="text-sm font-medium mb-2">{widget.title}</h3>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Chart placeholder
              </div>
            </div>
          );
        } else if (widget.type === 'table') {
          return (
            <WidgetTableView 
              title={widget.title}
              columns={['Column 1', 'Column 2', 'Column 3']}
              rows={[
                ['Data 1', 'Data 2', 'Data 3'],
                ['Data 4', 'Data 5', 'Data 6']
              ]}
            />
          );
        }
        return <div>Unknown widget: {widget.id}</div>;
    }
  };

  const renderWidgetContainer = (widget: WidgetDefinition) => {
    const isWide = widget.defaultSize.w > 1;
    const isTall = widget.defaultSize.h > 1;
    
    let sizeClasses = '';
    if (isWide && isTall) {
      sizeClasses = 'lg:col-span-2 row-span-2';
    } else if (isWide) {
      sizeClasses = 'lg:col-span-2';
    } else if (isTall) {
      sizeClasses = 'row-span-2';
    }

    return (
      <div 
        key={widget.id}
        className={`relative ${sizeClasses} ${isEditMode ? 'cursor-move border-2 border-dashed border-primary' : ''}`}
        draggable={isEditMode}
        onDragStart={() => handleDragStart(widget.id)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(widget.id)}
      >
        {isEditMode && (
          <div className="absolute top-0 right-0 z-10 flex gap-1 p-1 bg-background/90 rounded-bl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => handleRemoveWidget(widget.id)}
            >
              <Trash2 size={14} />
            </Button>
            <div className="flex flex-col">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => handleMoveWidget(widget.id, 'up')}
              >
                <ChevronUp size={14} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => handleMoveWidget(widget.id, 'down')}
              >
                <ChevronDown size={14} />
              </Button>
            </div>
            <div className="flex flex-col">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => handleMoveWidget(widget.id, 'left')}
              >
                <ChevronLeft size={14} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => handleMoveWidget(widget.id, 'right')}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100}>
            {renderWidget(widget)}
          </ResizablePanel>
          {isEditMode && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={0} minSize={0}>
                <div className="h-full bg-muted/30" />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    );
  };
  
  const sortedWidgets = [...widgets].sort((a, b) => {
    if (a.defaultPosition.y !== b.defaultPosition.y) {
      return a.defaultPosition.y - b.defaultPosition.y;
    }
    return a.defaultPosition.x - b.defaultPosition.x;
  });
  
  const widgetsByRow = sortedWidgets.reduce((acc, widget) => {
    const row = widget.defaultPosition.y;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(widget);
    return acc;
  }, {} as Record<number, WidgetDefinition[]>);
  
  return (
    <>
      <div className="p-6 overflow-auto">
        {isEditMode && (
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Edit Mode</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setCustomizeDialogOpen(true)}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Add Widget</span>
              </Button>
              <Button 
                onClick={handleEditModeToggle}
              >
                Save Layout
              </Button>
            </div>
          </div>
        )}
        
        {Object.entries(widgetsByRow).map(([rowIndex, rowWidgets]) => (
  <div key={`row-${rowIndex}`}>
    {/* Stat Cards Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {rowWidgets.filter(w => w.type === 'statCard').map(renderWidgetContainer)}
    </div>

    {/* Revenue and Sessions Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
      {rowWidgets.filter(w => w.id === 'revenueChart' || w.id === 'sessionsByCountry').map(renderWidgetContainer)}
    </div>

    {/* Other Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
      {rowWidgets.filter(w => w.type === 'chart' && !['revenueChart', 'sessionsByCountry'].includes(w.id)).map(renderWidgetContainer)}
    </div>
  </div>
))}

        {!isEditMode && (
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleEditModeToggle}
              className="flex items-center gap-2"
            >
              <Move size={16} />
              <span>Edit Layout</span>
            </Button>
          </div>
        )}
      </div>
      
      <CustomizeWidgetDialog
        open={customizeDialogOpen}
        onOpenChange={setCustomizeDialogOpen}
        widgets={widgets}
        onSave={handleSaveWidgets}
      />
    </>
  );
};

export default WidgetGrid;
