const { GoogleGenerativeAI } = require('@google/generative-ai');

// 初始化Gemini并指定模型版本
const genAI = new GoogleGenerativeAI(process.env.AIzaSyCEtvGBf3TzZq00Sc7bvrAqAqcwdL37_wQ);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.0-pro",
  generationConfig: {
    temperature: 0.7,  // 控制创造性
    topP: 0.8,        // 控制输出多样性
    topK: 40,         // 控制词汇选择范围
    maxOutputTokens: 2048  // 设置最大输出长度
  }
});

// 创建专业的八字分析提示词
async function analyzeBazi(birthData) {
  const prompt = `你现在是一位精通周易八字、面相、手相的专业命理大师，拥有多年的命理咨询经验。请根据以下生辰八字进行深入分析：

生辰八字: ${birthData.year}年${birthData.month}月${birthData.day}日${birthData.time}时
性别: ${birthData.gender}

请按照以下方面进行详细分析：

1. 八字基础解读：
- 四柱五行属性
- 十神配置分析
- 日主强弱判断

2. 命主性格特点：
- 性格优势
- 潜在缺点
- 人际关系特点

3. 事业发展分析：
- 最适合的事业方向
- 职业发展建议
- 创业机会点

4. 财运分析：
- 财运特质
- 求财方位
- 理财建议

5. 感情婚姻：
- 感情特质
- 桃花运势
- 婚姻建议

6. 健康提醒：
- 易出现的健康问题
- 养生建议
- 需要注意的方面

7. 流年运势：
- 近期运势走向
- 机遇与挑战
- 化解建议

请用专业但易懂的语言进行分析，给出具体可行的建议。`;

  try {
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();
    
    // 添加分析结果的格式化处理
    return {
      success: true,
      analysis: analysis,
      timestamp: new Date(),
      type: 'bazi-analysis'
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('命理分析服务暂时不可用');
  }
}

// 面相分析函数
async function analyzeFace(description) {
  const prompt = `作为一位经验丰富的面相专家，请对以下面相特征进行专业分析：

描述：${description}

请从以下方面进行分析：
1. 面部整体分析：
   - 面型特征
   - 气色判断
   - 面部气场

2. 五官详解：
   - 额头代表的智慧运
   - 眼睛代表的事业运
   - 鼻子代表的财运
   - 嘴巴代表的人际运
   - 下巴代表的晚年运

3. 运势解读：
   - 近期运势
   - 事业机遇
   - 感情状况
   - 财运预测

4. 改运建议：
   - 面相调节方法
   - 面部保养建议
   - 趋吉避凶指导`;

  try {
    const result = await model.generateContent(prompt);
    return {
      success: true,
      analysis: result.response.text(),
      timestamp: new Date(),
      type: 'face-analysis'
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('面相分析服务暂时不可用');
  }
}

// 手相分析函数
async function analyzePalm(description) {
  const prompt = `作为一位资深的手相专家，请对以下手相特征进行专业分析：

描述：${description}

请从以下方面进行分析：
1. 手形分析：
   - 手形类型
   - 手指特征
   - 整体气质

2. 主要掌纹解读：
   - 生命线特征与寿命
   - 智慧线与学业事业
   - 感情线与情感生活
   - 财运线与财富机遇

3. 运势预测：
   - 近期运势
   - 事业发展
   - 感情状况
   - 财运走向

4. 改运建议：
   - 事业发展建议
   - 感情维护指导
   - 财运提升方法`;

  try {
    const result = await model.generateContent(prompt);
    return {
      success: true,
      analysis: result.response.text(),
      timestamp: new Date(),
      type: 'palm-analysis'
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('手相分析服务暂时不可用');
  }
}

module.exports = {
  analyzeBazi,
  analyzeFace,
  analyzePalm
}; 