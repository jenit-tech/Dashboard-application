
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';

const Index: React.FC = () => {
 
  const [demoMode, setDemoMode] = useState(true);
  
  const handleDemoModeChange = (checked: boolean) => {
    setDemoMode(checked);
    console.log("Demo mode changed to:", checked);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar demoMode={demoMode} onDemoModeChange={handleDemoModeChange} />
      <div className="flex-1">
        <Dashboard demoMode={demoMode} />
      </div>
    </div>
  );
};

export default Index;
