
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { DashboardData } from '@/types/dashboard';
import { WidgetDefinition } from '@/types/widget';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardToolbar from '@/components/DashboardToolbar';
import LoadingState from '@/components/LoadingState';
import WidgetGrid from '@/components/WidgetGrid';
import { toast } from 'sonner';

interface DashboardProps {
  demoMode?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ demoMode: initialDemoMode = true }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [demoMode, setDemoMode] = useState(initialDemoMode);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching data with demoMode:", demoMode);
      const result = await api.fetchDashboardData(demoMode);
      setData(result);
      
      if (!demoMode) {
        toast.info('Demo data loaded');
      } else {
        toast.success('Live data loaded from MongoDB');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [demoMode]);
  
  const handleToggleMode = () => {
    setDemoMode(!demoMode);
  };
  
  const handleCustomizeWidget = () => {
    setIsCustomizing(true);
  };
  
  const handleFilter = () => {
    toast.info('Filter functionality is not implemented yet');
  };
  
  const handleShare = () => {
    toast.info('Share functionality is not implemented yet');
  };
  
  const handleSaveLayout = async (widgets: WidgetDefinition[]) => {
    try {
      await api.saveDashboardLayout(widgets);
      toast.success('Dashboard layout saved successfully');
    } catch (error) {
      console.error('Error saving dashboard layout:', error);
      toast.error('Failed to save dashboard layout');
    }
    
    setIsCustomizing(false);
  };
  
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader demoMode={demoMode} onToggleMode={handleToggleMode} />
      <DashboardToolbar 
        onCustomizeWidget={handleCustomizeWidget} 
        onFilter={handleFilter}
        onShare={handleShare}
        demoMode={demoMode}
      />
      
      {loading ? (
        <LoadingState />
      ) : data && (
        <WidgetGrid 
          data={data} 
          isCustomizing={isCustomizing}
          onSaveLayout={handleSaveLayout}
        />
      )}
    </div>
  );
};

export default Dashboard;
