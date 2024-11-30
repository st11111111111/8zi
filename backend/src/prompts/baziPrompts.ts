export const baziAnalysisPrompt = (
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  birthMinute: number,
  gender: 'male' | 'female',
  language: 'cn' | 'en' | 'vi' = 'cn'
) => {
  const prompts = {
    cn: `作为一位专业的八字命理分析师，请基于以下信息进行详细分析：

生辰八字信息：
- 出生年：${birthYear}年
- 出生月：${birthMonth}月
- 出生日：${birthDay}日
- 出生时：${birthHour}时${birthMinute}分
- 性别：${gender === 'male' ? '男' : '女'}

请从以下几个方面进行分析：

1. 八字基本信息：
   - 年柱、月柱、日柱、时柱
   - 五行属性分析
   - 十神分析

2. 命局分析：
   - 主要命格特征
   - 五行强弱分析
   - 吉凶分析

3. 事业发展：
   - 适合的职业方向
   - 事业发展建议
   - 最佳发展时机

4. 财运分析：
   - 财运特点
   - 理财建议
   - 破财隐患

5. 感情姻缘：
   - 感情特质
   - 桃花运势
   - 婚姻建议

6. 健康提醒：
   - 体质特点
   - 易患疾病
   - 养生建议

请注意：
1. 分析要客观准确，避免过于玄学的说法
2. 建议要具体可行，便于实践
3. 重点突出命主的优势和潜在机遇
4. 对于不利因素，要提供化解方法

请用专业但易懂的语言输出分析结果。`,

    en: `As a professional BaZi analyst, please provide a detailed analysis based on the following information:

Birth Information:
- Birth Year: ${birthYear}
- Birth Month: ${birthMonth}
- Birth Day: ${birthDay}
- Birth Time: ${birthHour}:${birthMinute}
- Gender: ${gender === 'male' ? 'Male' : 'Female'}

Please analyze the following aspects:

1. Basic BaZi Information:
   - Year, Month, Day, and Hour Pillars
   - Five Elements Analysis
   - Ten Gods Analysis

2. Destiny Pattern:
   - Main Characteristics
   - Five Elements Strength
   - Fortune and Misfortune Analysis

3. Career Development:
   - Suitable Career Paths
   - Career Development Advice
   - Best Timing for Development

4. Wealth Analysis:
   - Wealth Characteristics
   - Financial Advice
   - Potential Financial Risks

5. Relationships:
   - Relationship Characteristics
   - Romance Luck
   - Marriage Advice

6. Health Advisory:
   - Physical Constitution
   - Potential Health Issues
   - Health Maintenance Tips

Please note:
1. Analysis should be objective and accurate
2. Advice should be practical and actionable
3. Emphasize strengths and opportunities
4. Provide solutions for potential challenges

Please present the analysis in professional yet easy-to-understand language.`,

    vi: `Với tư cách là một chuyên gia phân tích Tử Vi Bát Tự, xin hãy phân tích chi tiết dựa trên thông tin sau:

Thông Tin Sinh:
- Năm Sinh: ${birthYear}
- Tháng Sinh: ${birthMonth}
- Ngày Sinh: ${birthDay}
- Giờ Sinh: ${birthHour}:${birthMinute}
- Giới Tính: ${gender === 'male' ? 'Nam' : 'Nữ'}

Xin hãy phân tích các khía cạnh sau:

1. Thông Tin Bát Tự Cơ Bản:
   - Thiên Can Địa Chi của Năm, Tháng, Ngày, Giờ
   - Phân Tích Ngũ Hành
   - Phân Tích Thập Thần

2. Phân Tích Vận Mệnh:
   - Đặc Điểm Chính của Mệnh
   - Cường Độ Ngũ Hành
   - Phân Tích Cát Hung

3. Phát Triển Sự Nghiệp:
   - Hướng Nghề Nghiệp Phù Hợp
   - Lời Khuyên Phát Triển
   - Thời Điểm Thuận Lợi

4. Phân Tích Tài Vận:
   - Đặc Điểm Tài Chính
   - Lời Khuyên Về Tài Chính
   - Rủi Ro Tiềm Ẩn

5. Duyên Phận Tình Cảm:
   - Đặc Điểm Tình Cảm
   - Vận Đào Hoa
   - Lời Khuyên Hôn Nhân

6. Lời Khuyên Sức Khỏe:
   - Thể Trạng
   - Vấn Đề Sức Khỏe Tiềm Ẩn
   - Lời Khuyên Dưỡng Sinh

Lưu ý:
1. Phân tích cần khách quan và chính xác
2. Lời khuyên cần thực tế và khả thi
3. Nhấn mạnh ưu điểm và cơ hội
4. Đưa ra giải pháp cho thách thức

Xin hãy trình bày phân tích bằng ngôn ngữ chuyên nghiệp nhưng dễ hiểu.`
  };

  return prompts[language];
};

export const yearlyFortunePrompt = (
  bazi: string,
  year: number
) => `
请基于以下八字信息，对${year}年的运势进行详细分析：

八字：${bazi}

请从以下方面进行分析：

1. 年度总运：
   - 流年特征
   - 吉凶指数
   - 整体运势

2. 具体运势：
   - 事业运势
   - 财运分析
   - 感情运势
   - 健康状况

3. 流年吉凶：
   - 有利时机
   - 注意事项
   - 化解方法

4. 实用建议：
   - 开运建议
   - 避险指南
   - 投资方向

请给出具体、实用的建议。
`;
