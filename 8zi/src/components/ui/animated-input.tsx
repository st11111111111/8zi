'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  label: string
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, type, icon, label, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={`
              w-full px-4 py-2 
              ${icon ? 'pl-10' : ''}
              border rounded-lg
              focus:ring-2 focus:ring-purple-500
              transition-all duration-200
              hover:border-purple-300
              bg-white/80 backdrop-blur-sm
            `}
            {...props}
          />
        </div>
      </motion.div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput' 