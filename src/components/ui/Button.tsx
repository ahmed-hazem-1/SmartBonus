import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-yellow hover:text-brand-navy",
    outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
    ghost: "text-brand-gray hover:text-brand-navy hover:bg-gray-50"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
