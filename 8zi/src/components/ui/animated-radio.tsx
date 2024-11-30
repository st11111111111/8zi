'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface AnimatedRadioProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  label: string
}

export const AnimatedRadio: React.FC<AnimatedRadioProps> = ({
  options,
  value,
  onChange,
  label
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <motion.label
            key={option.value}
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="radio"
              className="hidden"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <div
              className={`
                text-center border rounded-lg px-4 py-2 cursor-pointer
                transition-all duration-200
                ${value === option.value 
                  ? 'bg-purple-50 border-purple-500 text-purple-700' 
                  : 'hover:border-purple-300'
                }
              `}
            >
              {option.label}
            </div>
          </motion.label>
        ))}
      </div>
    </motion.div>
  )
} 