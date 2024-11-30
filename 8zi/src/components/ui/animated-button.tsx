import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className="relative overflow-hidden bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-red-600 to-blue-600"
          initial={{ x: "100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton'; 