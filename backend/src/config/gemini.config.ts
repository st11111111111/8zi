import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 确保加载环境变量
config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('错误：未找到 GEMINI_API_KEY 环境变量');
  console.error('当前环境变量:', process.env);
  console.error('请确保在 backend/.env 文件中设置了正确的 GEMINI_API_KEY');
  process.exit(1);
}

console.log('初始化 Gemini API...');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

console.log('配置 Gemini 模型...');
const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
});

console.log('Gemini 配置完成');

export default model;
