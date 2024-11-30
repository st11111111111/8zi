'use client'

import { useLanguage, type Language } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

const languages = [
  { code: 'cn', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
] as const;

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="flex bg-white/5 backdrop-blur-sm rounded-full p-0.5 border border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1.5 min-w-[48px] rounded-full text-sm font-medium
                     transition-all duration-300 relative
                     ${language === code
                       ? 'text-white'
                       : 'text-white/60 hover:text-white/80'
                     }`}
        >
          {language === code && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-golden-light rounded-full"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default LanguageSwitch; 