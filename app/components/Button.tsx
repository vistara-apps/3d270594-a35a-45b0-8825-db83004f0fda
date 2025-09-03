'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'action';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-accent hover:bg-accent/80 text-white disabled:bg-gray-600 disabled:text-gray-400',
    secondary: 'bg-dark-border hover:bg-dark-border/80 text-gray-300 hover:text-white',
    action: 'bg-primary hover:bg-primary/80 text-white disabled:bg-gray-600 disabled:text-gray-400',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
