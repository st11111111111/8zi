import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        relative p-6 rounded-2xl
        bg-white/10 backdrop-blur-glass
        border border-white/20
        shadow-lg hover:shadow-neon
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;