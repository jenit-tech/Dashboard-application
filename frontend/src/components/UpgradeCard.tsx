
import React from 'react';
import { Button } from '@/components/ui/button';

const UpgradeCard = () => {
  return (
    <div className="bg-emerald-600 text-white rounded-lg p-5 animate-scale-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-amber-500"></div>
        </div>
      </div>
      
      <h3 className="text-base font-medium mb-2">
        Get detailed analytics for help you, upgrade pro
      </h3>
      
      <Button size="sm" className="bg-white text-emerald-600 hover:bg-white/90 hover:text-emerald-600 mt-2">
        Upgrade Now
      </Button>
    </div>
  );
};

export default UpgradeCard;
