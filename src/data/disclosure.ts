export interface DisclosureItem { screen: string; screenName: string; prompt: string; tool: "千问" | "万相" | "百炼"; result: string; }

export const disclosureData: DisclosureItem[] = [
  { screen: "P1", screenName: "开屏", prompt: "生成一个深空蓝黑渐变背景，带有机神经脉络粒子流动感，中央留白放置Logo和文字。不要具体物体，纯抽象科技感。", tool: "万相", result: "用于开屏页的粒子纹理底图" },
  { screen: "P2", screenName: "角色设定", prompt: "请为千问OS的欢迎界面生成一段温暖的欢迎语，需要让用户感受到被理解和被记住。语气：友好、专业、有温度。", tool: "千问", result: "所有引导文案" },
  { screen: "P3", screenName: "饮食规划", prompt: "生成三套不同风格的菜品图片：轻食主义、家常烟火、探味寻鲜。自然光、俯拍、餐桌场景。", tool: "万相", result: "9张菜品图" },
  { screen: "P4", screenName: "出行规划", prompt: "生成未来城市俯瞰图：自动驾驶汽车、智能交通、绿色建筑融合。未来感但不过度科幻，温暖色调。", tool: "万相", result: "城市俯瞰场景图" },
  { screen: "P5", screenName: "创作工坊", prompt: "生成示范作品图：一只猫在月球上喝咖啡，梵高风格。展示千问+万相的创作能力。", tool: "万相", result: "AI创作示范图" },
  { screen: "P8", screenName: "新物种画廊", prompt: "生成6张AI新物种概念图：自动驾驶汽车、智能家居助手、AR眼镜、工业机器人、AI教育助手、医疗影像分析。每张图需有Powered by Qwen的科技感。", tool: "万相", result: "6张新物种概念图" },
  { screen: "P10", screenName: "多模态能力", prompt: "为千问OS的智慧播报功能生成一段自然的人声播报稿，涵盖日程、天气、新闻摘要，要求口语化且有温度。", tool: "千问", result: "智慧播报文案" }
];

export const aiUsageSummary = { textPercent: 85, imagePercent: 100, totalPrompts: 45, totalImages: 20 };
