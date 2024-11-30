import model from '../config/gemini.config';

// 重试配置
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

// 延迟函数
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 带重试的API调用
async function callWithRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return callWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

export async function generateAnalysis(prompt: string): Promise<string> {
  try {
    const result = await callWithRetry(async () => {
      const result = await model.generateContent(prompt);
      return result;
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('生成的内容为空');
    }

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API密钥配置错误');
      }
      throw new Error(`分析生成失败: ${error.message}`);
    }
    throw new Error('分析生成失败，请稍后重试');
  }
}

export async function generateAnalysisWithImage(
  prompt: string,
  imageBase64: string
): Promise<string> {
  try {
    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg',
      },
    };

    const result = await callWithRetry(async () => {
      const result = await model.generateContent([prompt, imageData]);
      return result;
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('图像分析结果为空');
    }

    return text;
  } catch (error) {
    console.error('Gemini Image Analysis Error:', error);
    if (error instanceof Error) {
      throw new Error(`图像分析失败: ${error.message}`);
    }
    throw new Error('图像分析失败，请稍后重试');
  }
}

export async function streamAnalysis(
  prompt: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error('Gemini Stream Error:', error);
    if (error instanceof Error) {
      throw new Error(`流式分析失败: ${error.message}`);
    }
    throw new Error('流式分析失败，请稍后重试');
  }
}
