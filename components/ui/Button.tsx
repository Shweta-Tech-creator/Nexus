
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  magnetic?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading,
  disabled,
  magnetic = false,
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: 'bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_25px_rgba(14,165,233,0.3)] border-sky-400/50',
    secondary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_25px_rgba(79,70,229,0.3)] border-indigo-400/50',
    ghost: 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 hover:border-sky-500/50 backdrop-blur-xl',
    danger: 'bg-red-500/90 hover:bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.2)] border-red-400/50',
    success: 'bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.2)] border-emerald-400/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] font-black uppercase tracking-widest',
    md: 'px-6 py-3 text-xs font-black uppercase tracking-widest',
    lg: 'px-10 py-5 text-sm font-black uppercase tracking-[0.2em]',
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading || disabled}
      className={cn(
        'relative group overflow-hidden rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(255,255,255,0.2)_0%,_transparent_100%)] pointer-events-none" />
      
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
      ) : (
        <span className="relative z-10 flex items-center gap-2">
          {children as React.ReactNode}
        </span>
      )}
      
      {/* Cinematic Border Trace */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      
      {/* Hover Pulse Glow */}
      <div className="absolute inset-0 bg-sky-400/0 group-hover:bg-sky-400/5 transition-colors duration-500" />
    </motion.button>
  );
};

export default Button;
