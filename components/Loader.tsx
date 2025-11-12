
import React from 'react';
import Logo from './Logo';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base-900">
      <div className="relative flex items-center justify-center">
        {/* Pulsating background glow */}
        <div className="absolute h-24 w-24 bg-accent rounded-full opacity-20 animate-ping"></div>
        {/* The actual logo */}
        <div className="relative">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Loader;
