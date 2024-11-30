'use client'

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { GlassCard } from './common/GlassCard';
import { LanguageSwitch } from './common/LanguageSwitch';
import { motion } from 'framer-motion';

// 下拉框基础样式
const selectBaseStyle = `
  px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
  focus:border-golden-light focus:ring-1 focus:ring-golden-light
  text-white appearance-none cursor-pointer
  bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]
  bg-no-repeat bg-[center_right_1rem] bg-[length:16px]
  hover:bg-white/10 transition-all duration-300
`;

// 选项基础样式
const optionStyle = `
  bg-purple-900 text-white
  hover:bg-purple-800
  px-2 py-1.5
`;

export const BaziForm: React.FC = () => {
  const { t } = useLanguage();
  const [year, setYear] = useState('1991');
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('0');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  // 生成年份选项（1900年到当前年份）
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  
  // 生成月份选项（1-12月）
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // 生成日期选项（1-31日）
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const days = Array.from(
    { length: getDaysInMonth(Number(year), Number(month)) }, 
    (_, i) => i + 1
  );

  // 生成小时选项（0-23时）
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // 生成分钟选项（0-59分）
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData = {
        birthYear: Number(year),
        birthMonth: Number(month),
        birthDay: Number(day),
        birthHour: Number(hour),
        birthMinute: Number(minute),
        gender: gender === 'male' ? 'male' : 'female',
      };

      console.log('发送请求数据:', requestData);

      const response = await fetch('http://localhost:5000/api/bazi/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('响应状态:', response.status);
      const responseText = await response.text();
      console.log('响应内容:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(t('serverError'));
      }

      if (!response.ok) {
        throw new Error(data?.message || t('serverError'));
      }

      if (data.success) {
        setResult(data.data);
      } else {
        throw new Error(data.message || t('serverError'));
      }
    } catch (err) {
      console.error('分析错误:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : t('networkError')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    setDownloading(true);
    try {
      // 创建 Blob 对象
      const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
      
      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 设置文件名（使用当前日期时间）
      const now = new Date();
      const fileName = `bazi-analysis-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.txt`;
      link.download = fileName;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('下载错误:', err);
      setError(t('serverError'));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitch />
      </div>

      <GlassCard>
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-golden-light mb-2">
            {t('title')}
          </h1>
          <p className="text-white/60">{t('subtitle')}</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2">
            <label className="block text-white/80 text-sm">
              {t('birthDate')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={selectBaseStyle}
                style={{ color: 'white' }}
              >
                {years.map(y => (
                  <option key={y} value={y} className={optionStyle}>
                    {y}{t('year')}
                  </option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={selectBaseStyle}
                style={{ color: 'white' }}
              >
                {months.map(m => (
                  <option key={m} value={m} className={optionStyle}>
                    {m}{t('month')}
                  </option>
                ))}
              </select>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={selectBaseStyle}
                style={{ color: 'white' }}
              >
                {days.map(d => (
                  <option key={d} value={d} className={optionStyle}>
                    {d}{t('day')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm">
              {t('birthTime')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className={`${selectBaseStyle} pr-12`}
                  style={{ color: 'white' }}
                >
                  {hours.map(h => (
                    <option key={h} value={h} className={optionStyle}>
                      {h.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                  {t('hour')}
                </span>
              </div>
              <div className="relative">
                <select
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className={`${selectBaseStyle} pr-12`}
                  style={{ color: 'white' }}
                >
                  {minutes.map(m => (
                    <option key={m} value={m} className={optionStyle}>
                      {m.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                  {t('minute')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm">
              {t('gender')}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="w-4 h-4 text-golden-light focus:ring-golden-light"
                />
                <span className="text-white">{t('male')}</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="w-4 h-4 text-golden-light focus:ring-golden-light"
                />
                <span className="text-white">{t('female')}</span>
              </label>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl bg-gradient-to-r from-chinese-red to-golden-light
                       text-white font-semibold text-lg
                       hover:shadow-neon transition-all duration-300
                       transform hover:scale-[1.02]
                       ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? t('analyzing') : t('analyze')}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-4"
            >
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-white">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
              
              <motion.button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-600
                           text-white font-medium text-sm
                           transition-all duration-300
                           ${downloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: downloading ? 1 : 1.02 }}
                whileTap={{ scale: downloading ? 1 : 0.98 }}
              >
                {downloading ? t('downloadingReport') : t('downloadReport')}
              </motion.button>
            </motion.div>
          )}
        </motion.form>
      </GlassCard>
    </div>
  );
};

