import React from 'react';
import * as LucideIcons from 'lucide-react';

// Type for Lucide icon names
type LucideIconName = keyof typeof LucideIcons;

interface IconProps {
  name: LucideIconName;
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Robust icon component with fallback support
 * Handles cases where ad blockers might interfere with icon loading
 */
export const RobustIcon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  className = '', 
  fallback 
}) => {
  try {
    const IconComponent = LucideIcons[name] as React.ComponentType<{
      size?: number;
      className?: string;
    }>;

    if (!IconComponent) {
      throw new Error(`Icon ${name} not found`);
    }

    return <IconComponent size={size} className={className} />;
  } catch (error) {
    console.warn(`Failed to load icon ${name}:`, error);
    
    // Return fallback or default icon
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Simple SVG fallback
    return (
      <svg 
        width={size} 
        height={size} 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    );
  }
};

export default RobustIcon;
