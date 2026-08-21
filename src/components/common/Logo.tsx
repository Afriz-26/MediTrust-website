import React from 'react';
import medynexLogoSvg from '../../assets/logo-medynex.svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtext = true, 
  theme = 'light',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-1.5',
    lg: 'w-12 h-12 p-2'
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      {/* Medynex Brand Logo Mark */}
      <div className={`${sizeClasses[size]} rounded-xl shadow-xs group-hover:scale-105 transition-transform duration-300 border ${
        isDark ? 'border-white/10 bg-[#101515]' : 'border-[#E7EAE7] bg-[#101515]'
      } flex items-center justify-center shrink-0`}>
        <img 
          src={medynexLogoSvg} 
          alt="Medynex Solutions Logo" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(43,154,145,0.4)]"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col">
        <span className={`${textClasses[size]} font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#101515]'} flex items-center gap-1.5 leading-none`}>
          MediTrust <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF5F1] text-[#0E6763] border border-[#DCEFEA]">by Medynex</span>
        </span>
        {showSubtext && (
          <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-[#737A78]'} font-semibold tracking-wider uppercase mt-0.5`}>
            Medynex Solutions
          </span>
        )}
      </div>
    </div>
  );
};


