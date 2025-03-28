
import React, { useState } from 'react';
import { LayoutDashboard, BarChart2, FileText, ShoppingBag, Package, MessageSquare, Store, Settings, HelpCircle, LifeBuoy } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import UpgradeCard from '@/components/UpgradeCard';
import { Button } from './ui/button';

interface SidebarProps {
  demoMode?: boolean;
  onDemoModeChange?: (checked: boolean) => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ demoMode = true, onDemoModeChange }) => {
  const [activeItem, setActiveItem] = useState('Overview');
  
  const mainMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Overview', isActive: true },
    { icon: BarChart2, label: 'Performance' },
    { icon: FileText, label: 'Campaigns' },
    { icon: ShoppingBag, label: 'Orders' },
    { icon: Package, label: 'Products' },
    { icon: MessageSquare, label: 'Message' },
    { icon: Store, label: 'Sales Platform' },
  ];
  
  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };
  
  return (
    <div className="w-64 min-h-screen border-r border-border/50 py-4 flex flex-col bg-card">
      <div className="px-4 mb-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold mr-20">Consist</h1>
        <Button variant="ghost" size="icon" className="hidden md:flex">
            <span className="sr-only">Toggle Menu</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
      </div>
      
      
      <div className="px-4 mb-2">
        <h2 className="text-xs font-medium text-muted-foreground">MAIN MENU</h2>
      </div>
      
      <div className="flex-1">
        <nav>
          <ul>
            {mainMenuItems.map((item) => (
              <li key={item.label}>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-colors text-sm',
                    activeItem === item.label && 'bg-emerald-600/90 text-white hover:bg-emerald-600/80'
                  )}
                  onClick={() => handleItemClick(item.label)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      
      
      <div className="px-4 py-2 border-t border-border/50">
        <ul className="space-y-1">
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Settings size={18} />
              <span className="text-sm">Demo Mode</span>
            </div>
            <Switch 
              checked={demoMode} 
              onCheckedChange={onDemoModeChange}
            />
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-colors text-sm">
              <LifeBuoy size={18} />
              <span>Feedback</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-colors text-sm">
              <HelpCircle size={18} />
              <span>Help and docs</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="px-4 py-4">
        <UpgradeCard />
      </div>
    </div>
  );
};

export default Sidebar;
