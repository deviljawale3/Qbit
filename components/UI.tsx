
import React from 'react';
// Fix: Import HTMLMotionProps and update ButtonProps to extend it instead of React.ButtonHTMLAttributes.
// This resolves a type conflict between standard React event handlers (e.g., onDrag)
// and Framer Motion's gesture handlers, which caused the original error.
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-2 font-orbitron tracking-wider text-sm uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const variantClasses = variant === 'primary'
    ? "bg-orange-500/20 text-orange-300 border border-orange-500 hover:bg-orange-500/40 hover:text-white hover:shadow-[0_0_15px_rgba(255,140,0,0.5)]"
    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500 hover:bg-yellow-500/40 hover:text-white hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400">{icon}</span>}
      <input
        ref={ref}
        className={`w-full bg-black/50 border-2 border-yellow-500/50 focus:border-yellow-500 focus:ring-0 focus:shadow-[0_0_15px_rgba(255,215,0,0.5)] text-gray-200 placeholder-gray-500 py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4 transition-all duration-300`}
        {...props}
      />
    </div>
  );
});

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({children, className}) => {
    return (
        <div className={`bg-black/30 backdrop-blur-sm border border-orange-400/20 p-6 shadow-lg shadow-orange-500/10 ${className}`}>
            {children}
        </div>
    )
}