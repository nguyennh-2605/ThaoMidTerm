import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', gradient = false, onClick }: CardProps) {
  const baseStyles = 'rounded-2xl p-6 shadow-md';
  const gradientStyles = gradient
    ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white'
    : 'bg-white';

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`${baseStyles} ${gradientStyles} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
