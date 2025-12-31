
import React from 'react';

export const COLORS = {
  background: '#020617',
  surface: '#0F172A',
  elevated: '#111827',
  primary: '#38BDF8',
  secondary: '#6366F1',
  success: '#22C55E',
  error: '#EF4444',
  textPrimary: '#E5E7EB',
  textMuted: '#9CA3AF',
  border: '#1F2937',
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};
