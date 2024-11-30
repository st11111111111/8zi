import { Request, Response } from 'express';
import { generateAnalysis } from '../utils/geminiHelper';
import { baziAnalysisPrompt } from '../prompts/baziPrompts';

// 输入验证函数
function validateBirthInput(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  birthMinute: number
): string | null {
  const currentYear = new Date().getFullYear();
  console.log('验证输入:', { birthYear, birthMonth, birthDay, birthHour, birthMinute });

  if (birthYear < 1900 || birthYear > currentYear) {
    return '出生年份无效';
  }

  if (birthMonth < 1 || birthMonth > 12) {
    return '出生月份无效';
  }

  if (birthDay < 1 || birthDay > 31) {
    return '出生日期无效';
  }

  if (birthHour < 0 || birthHour > 23) {
    return '出生时辰无效';
  }

  if (birthMinute < 0 || birthMinute > 59) {
    return '出生分钟无效';
  }

  return null;
}

export async function analyzeBazi(req: Request, res: Response) {
  try {
    console.log('收到分析请求:', JSON.stringify(req.body, null, 2));

    const { 
      birthYear, 
      birthMonth, 
      birthDay, 
      birthHour, 
      birthMinute = 0,
      gender,
      language = 'cn'
    } = req.body;

    // 类型检查
    if (!birthYear || !birthMonth || !birthDay || !birthHour || !gender) {
      console.log('缺少必要参数');
      return res.status(400).json({
        success: false,
        message: '请提供完整的生辰八字信息'
      });
    }

    // 转换为数字类型
    const year = Number(birthYear);
    const month = Number(birthMonth);
    const day = Number(birthDay);
    const hour = Number(birthHour);
    const minute = Number(birthMinute);

    console.log('转换后的数据:', { year, month, day, hour, minute, gender, language });

    // 验证输入
    const validationError = validateBirthInput(year, month, day, hour, minute);
    if (validationError) {
      console.log('输入验证失败:', validationError);
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    if (!['male', 'female'].includes(gender)) {
      console.log('性别参数无效:', gender);
      return res.status(400).json({
        success: false,
        message: '性别参数无效'
      });
    }

    if (!['cn', 'en', 'vi'].includes(language)) {
      console.log('语言参数无效:', language);
      return res.status(400).json({
        success: false,
        message: '语言参数无效'
      });
    }

    console.log('生成分析提示词...');
    const prompt = baziAnalysisPrompt(year, month, day, hour, minute, gender, language);
    console.log('提示词生成完成:', prompt);

    console.log('调用 Gemini API...');
    const analysis = await generateAnalysis(prompt);
    console.log('Gemini API 响应成功');

    console.log('分析完成，返回结果');
    res.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('八字分析错误:', error);
    
    if (error instanceof Error) {
      // API 相关错误
      if (error.message.includes('API')) {
        console.error('API 错误:', error.message);
        return res.status(500).json({
          success: false,
          message: 'API 服务暂时不可用，请稍后重试'
        });
      }
      
      // 其他已知错误
      console.error('已知错误:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
    
    // 未知错误
    console.error('未知错误类型');
    res.status(500).json({
      success: false,
      message: '分析过程出现错误，请稍后重试'
    });
  }
}
