import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-lg z-[9999]">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Loader2 
            className="h-16 w-16 text-primary-light animate-spin" 
            strokeWidth={2}
          />
          <div className="absolute inset-0 border-4 border-t-primary-light border-r-primary-light border-b-primary-ultra border-l-primary-ultra rounded-full animate-ping"></div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-dark">
            Loading
          </h2>
          <p className="text-sm text-primary-black/70 mt-2">
            Please wait while we prepare everything for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;