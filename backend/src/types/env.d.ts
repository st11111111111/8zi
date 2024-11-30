declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      GEMINI_API_KEY: string;
      FRONTEND_URL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
