import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    title: '八字算命',
    subtitle: '探索命运的奥秘',
    birthDate: '出生日期',
    birthTime: '出生时间',
    gender: '性别',
    male: '男',
    female: '女',
    analyze: '开始分析',
    footer: '寻找生命的答案',
    dateFormat: '格式：年-月-日',
    timeFormat: '格式：时:分'
  },
  en: {
    title: 'BaZi Reading',
    subtitle: 'Explore the Mysteries of Destiny',
    birthDate: 'Birth Date',
    birthTime: 'Birth Time',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    analyze: 'Start Analysis',
    footer: 'Find Your Life\'s Answer',
    dateFormat: 'Format: YYYY-MM-DD',
    timeFormat: 'Format: HH:mm'
  },
  vi: {
    title: 'Tử Vi Bát Tự',
    subtitle: 'Khám Phá Bí Ẩn Của Định Mệnh',
    birthDate: 'Ngày Sinh',
    birthTime: 'Giờ Sinh',
    gender: 'Giới Tính',
    male: 'Nam',
    female: 'Nữ',
    analyze: 'Bắt Đầu Phân Tích',
    footer: 'Tìm Câu Trả Lời Cho Cuộc Sống',
    dateFormat: 'Định dạng: DD/MM/YYYY',
    timeFormat: 'Định dạng: HH:mm'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // 如果没有保存的语言设置，尝试使用浏览器语言
      const browserLang = navigator.language.split('-')[0] as Language;
      if (Object.keys(translations).includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    // 设置 HTML lang 属性
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['zh']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

