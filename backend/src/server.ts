import { config } from 'dotenv';
// 确保在其他导入之前加载环境变量
config();

import express from 'express';
import cors from 'cors';
import baziRoutes from './routes/baziRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// CORS 配置
app.use(cors({
  origin: '*', // 允许所有来源
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

// 中间件
app.use(express.json({ limit: '10mb' }));

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.method === 'POST') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// 预检请求处理
app.options('*', cors());

// 健康检查路由
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      port: port,
      hasGeminiKey: !!process.env.GEMINI_API_KEY
    }
  });
});

// API 路由
app.use('/api/bazi', baziRoutes);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '请求的资源不存在',
    path: req.path
  });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);

  // API 密钥错误处理
  if (err.message?.includes('API key')) {
    return res.status(500).json({
      success: false,
      message: 'API 配置错误，请联系管理员'
    });
  }

  // 一般错误处理
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : '服务器内部错误',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 启动服务器
app.listen(port, () => {
  console.log('='.repeat(50));
  console.log(`服务器启动成功！`);
  console.log(`端口: ${port}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Gemini API: ${process.env.GEMINI_API_KEY ? '已配置' : '未配置'}`);
  console.log('='.repeat(50));
});
