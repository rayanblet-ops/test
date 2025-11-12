
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "text-neutral-50" }) => (
    <div className={`flex items-center gap-2.5 ${className}`}>
        <svg viewBox="0 0 24 24" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 19L3 12L9 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 19L21 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 12C9.85714 8.57143 12.7143 8.57143 15.5714 12C12.7143 15.4286 9.85714 15.4286 7 12Z" stroke="#ff8c42" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-2xl font-bold tracking-tight">Vibecoding</span>
    </div>
);

export default Logo;
