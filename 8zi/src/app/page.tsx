'use client'

import { LanguageProvider } from '@/hooks/useLanguage'
import '@/styles/globals.css'
import { motion } from 'framer-motion'
import React from 'react';
import GlassCard from '@/components/common/GlassCard';
import LanguageSwitch from '@/components/common/LanguageSwitch';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-gradient-to-br from-mystic-blue via-mystic-purple to-chinese-black 
                     flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* 装饰背景 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-golden-light/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chinese-red/10 rounded-full blur-3xl" />
        </div>

        {/* 语言切换 */}
        <div className="absolute top-4 right-4 z-50">
          <LanguageSwitch />
        </div>

        {/* 主卡片 */}
        <GlassCard className="w-full max-w-md z-10">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className={`${montserrat.className} text-3xl font-bold text-golden-light mb-2
                         animate-floating`}>
              八字算命
            </h1>
            <p className="text-white/60">探索命运的奥秘</p>
          </div>

          {/* 表单区域 */}
          <form className="space-y-6">
            {/* 生日选择 */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm">
                出生日期
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                         focus:border-golden-light focus:ring-1 focus:ring-golden-light
                         text-white placeholder-white/30 transition-all duration-300"
              />
            </div>

            {/* 时间选择 */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm">
                出生时间
              </label>
              <input
                type="time"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                         focus:border-golden-light focus:ring-1 focus:ring-golden-light
                         text-white placeholder-white/30 transition-all duration-300"
              />
            </div>

            {/* 性别选择 */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm">
                性别
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-4 h-4 text-golden-light focus:ring-golden-light"
                  />
                  <span className="text-white">男</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-4 h-4 text-golden-light focus:ring-golden-light"
                  />
                  <span className="text-white">女</span>
                </label>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-chinese-red to-golden-light
                       text-white font-semibold text-lg
                       hover:shadow-neon transition-all duration-300
                       transform hover:scale-[1.02]"
            >
              开始分析
            </button>
          </form>
        </GlassCard>

        {/* 底部装饰 */}
        <div className="mt-8 text-white/40 text-sm">
          寻找生命的答案
        </div>
      </main>
    </LanguageProvider>
  )
}



