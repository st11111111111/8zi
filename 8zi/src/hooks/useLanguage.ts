import { create } from 'zustand';

export type Language = 'cn' | 'en' | 'vi';

export type TranslationKey = 
  | 'title' 
  | 'subtitle'
  | 'birthDate'
  | 'birthTime'
  | 'gender'
  | 'male'
  | 'female'
  | 'analyze'
  | 'analyzing'
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'selectTime'
  | 'networkError'
  | 'serverError'
  | 'invalidFormat'
  | 'downloadReport'
  | 'downloadingReport'
  | 'analysisResult'
  | 'basicInfo'
  | 'destinyPattern'
  | 'career'
  | 'wealth'
  | 'relationship'
  | 'health';

type Translations = {
  [K in Language]: {
    [Key in TranslationKey]: string;
  }
};

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations: Translations = {
  cn: {
    title: '八字算命',
    subtitle: '探索命运的奥秘',
    birthDate: '出生日期',
    birthTime: '出生时辰',
    gender: '性别',
    male: '男',
    female: '女',
    analyze: '开始分析',
    analyzing: '分析中...',
    year: '年',
    month: '月',
    day: '日',
    hour: '时',
    minute: '分',
    selectTime: '选择时辰',
    networkError: '无法连接到服务器，请检查网络连接',
    serverError: '服务器内部错误，请稍后重试',
    invalidFormat: '输入格式无效，请重试',
    downloadReport: '下载报告',
    downloadingReport: '正在生成报告...',
    analysisResult: '八字分析结果',
    basicInfo: '基本信息',
    destinyPattern: '命局分析',
    career: '事业发展',
    wealth: '财运分析',
    relationship: '感情姻缘',
    health: '健康提醒',
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
    analyzing: 'Analyzing...',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    selectTime: 'Select Time',
    networkError: 'Unable to connect to server, please check your network',
    serverError: 'Internal server error, please try again later',
    invalidFormat: 'Invalid input format, please try again',
    downloadReport: 'Download Report',
    downloadingReport: 'Generating report...',
    analysisResult: 'BaZi Analysis Result',
    basicInfo: 'Basic Information',
    destinyPattern: 'Destiny Pattern',
    career: 'Career Development',
    wealth: 'Wealth Analysis',
    relationship: 'Relationships',
    health: 'Health Advisory',
  },
  vi: {
    title: 'Tử Vi Bát Tự',
    subtitle: 'Khám Phá Bí Ẩn Của Số Mệnh',
    birthDate: 'Ngày Sinh',
    birthTime: 'Giờ Sinh',
    gender: 'Giới Tính',
    male: 'Nam',
    female: 'Nữ',
    analyze: 'Bắt Đầu Phân Tích',
    analyzing: 'Đang phân tích...',
    year: 'Năm',
    month: 'Tháng',
    day: 'Ngày',
    hour: 'Giờ',
    minute: 'Phút',
    selectTime: 'Chọn Giờ',
    networkError: 'Không thể kết nối đến máy chủ, vui lòng kiểm tra mạng',
    serverError: 'Lỗi máy chủ, vui lòng thử lại sau',
    invalidFormat: 'Định dạng không hợp lệ, vui lòng thử lại',
    downloadReport: 'Tải Báo Cáo',
    downloadingReport: 'Đang tạo báo cáo...',
    analysisResult: 'Kết Quả Phân Tích Bát Tự',
    basicInfo: 'Thông Tin Cơ Bản',
    destinyPattern: 'Phân Tích Vận Mệnh',
    career: 'Phát Triển Sự Nghiệp',
    wealth: 'Phân Tích Tài Vận',
    relationship: 'Duyên Phận Tình Cảm',
    health: 'Lời Khuyên Sức Khỏe',
  },
};

export const useLanguage = create<LanguageState>((set, get) => ({
  language: 'cn',
  setLanguage: (lang: Language) => set({ language: lang }),
  t: (key: TranslationKey) => translations[get().language][key],
}));