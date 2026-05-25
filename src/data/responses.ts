export interface FoodMenu { breakfast: { name: string; desc: string; kcal: number }; lunch: { name: string; desc: string; kcal: number }; dinner: { name: string; desc: string; kcal: number } }

const foodMenus: Record<string, FoodMenu[]> = {
  "轻食主义": [
    { breakfast: { name: "牛油果鸡蛋吐司", desc: "全麦吐司+牛油果泥+溏心蛋", kcal: 320 }, lunch: { name: "藜麦鸡胸沙拉", desc: "藜麦+烤鸡胸+混合生菜+柠檬汁", kcal: 420 }, dinner: { name: "清蒸鲈鱼配时蔬", desc: "鲈鱼+西兰花+胡萝卜+姜丝清蒸", kcal: 380 } },
    { breakfast: { name: "希腊酸奶燕麦杯", desc: "无糖酸奶+燕麦+蓝莓+奇亚籽", kcal: 280 }, lunch: { name: "三文鱼poke碗", desc: "三文鱼+糙米+牛油果+海苔", kcal: 450 }, dinner: { name: "番茄豆腐菌菇汤", desc: "番茄+嫩豆腐+金针菇+菠菜", kcal: 260 } },
    { breakfast: { name: "抹茶香蕉奶昔碗", desc: "抹茶粉+香蕉+燕麦奶+坚果碎", kcal: 310 }, lunch: { name: "烤蔬菜鸡腿卷", desc: "鸡腿肉+彩椒+西葫芦+藜麦", kcal: 480 }, dinner: { name: "味噌三文鱼佐芦笋", desc: "三文鱼+白味噌+烤芦笋+杂粮饭", kcal: 410 } }
  ],
  "家常烟火": [
    { breakfast: { name: "小馄饨配茶叶蛋", desc: "鲜肉小馄饨+溏心茶叶蛋+紫菜汤", kcal: 350 }, lunch: { name: "番茄炒蛋盖饭", desc: "番茄炒蛋+蒜蓉青菜+米饭", kcal: 520 }, dinner: { name: "红烧排骨炖萝卜", desc: "排骨+白萝卜+香菇+杂粮饭", kcal: 550 } },
    { breakfast: { name: "葱油拌面配豆浆", desc: "手擀面+葱油+甜豆浆", kcal: 380 }, lunch: { name: "宫保鸡丁套餐", desc: "宫保鸡丁+凉拌黄瓜+米饭", kcal: 560 }, dinner: { name: "鲫鱼豆腐汤配蒸饺", desc: "鲫鱼+豆腐+手工蒸饺+时蔬", kcal: 480 } },
    { breakfast: { name: "小米粥配煎饺", desc: "小米南瓜粥+猪肉煎饺3个", kcal: 340 }, lunch: { name: "回锅肉炒时蔬", desc: "回锅肉+卷心菜+彩椒+米饭", kcal: 580 }, dinner: { name: "莲藕排骨汤配杂粮饭", desc: "莲藕+排骨+花生+杂粮饭", kcal: 490 } }
  ],
  "探味寻鲜": [
    { breakfast: { name: "班尼迪克蛋", desc: "英式松饼+水波蛋+荷兰酱+烟熏三文鱼", kcal: 410 }, lunch: { name: "冬阴功海鲜面", desc: "冬阴功汤底+大虾+青口+米粉", kcal: 480 }, dinner: { name: "慢烤战斧牛排", desc: "战斧牛排+黑松露土豆泥+烤芦笋", kcal: 720 } },
    { breakfast: { name: "法式可丽饼", desc: "可丽饼+榛子巧克力酱+香蕉+奶油", kcal: 380 }, lunch: { name: "和牛寿喜烧定食", desc: "A5和牛+寿喜烧汁+温泉蛋+米饭", kcal: 650 }, dinner: { name: "黑松露烩饭配煎鹅肝", desc: "黑松露+意大利米+煎鹅肝+帕玛森", kcal: 680 } },
    { breakfast: { name: "粤式早茶拼盘", desc: "虾饺+烧卖+叉烧包+凤爪", kcal: 450 }, lunch: { name: "新加坡叻沙", desc: "椰浆叻沙+大虾+鱼饼+米粉", kcal: 520 }, dinner: { name: "泰式咖喱蟹", desc: "斯里兰卡青蟹+泰式黄咖喱+法棍", kcal: 620 } }
  ]
};

export function getCuisineLabel(cuisine: string): string { return cuisine; }
export function getRandomFoodMenu(cuisine: string): FoodMenu {
  const menus = foodMenus[cuisine] || foodMenus["家常烟火"];
  return menus[Math.floor(Math.random() * menus.length)];
}

export const MOOD_OPTIONS = [
  { value: "energetic", label: "精力充沛", emoji: "😊" },
  { value: "normal", label: "日常模式", emoji: "😐" },
  { value: "inspired", label: "需要灵感", emoji: "😴" }
];

export const TAG_OPTIONS = ["科技", "设计", "美食", "旅行", "创作", "音乐"];

export function getGreeting(name: string, tags: string[], mood: string): string {
  const moodText = mood === "energetic" ? "充满活力" : mood === "inspired" ? "需要一些灵感" : "平静从容";
  return `你好，${name}！👋\n\n我是千问，你的AI智能助手。\n\n我注意到你选择了「${tags.slice(0, 2).join("」「")}」作为兴趣领域，今天你的状态是${moodText}。\n\n我已经记下了这些信息。接下来，让我帮你规划完美的一天。准备好了吗？`;
}

export function getFoodIntro(name: string, tags: string[]): string {
  return `根据你${tags.slice(0, 2).join("和")}的偏好，这是我为你精心搭配的一天饮食方案：`;
}

export function getTravelPlan(place: string, tags: string[]): { items: { time: string; place: string; route: string; duration: string }[] } {
  return {
    items: [
      { time: "12:00", place: place || "心仪餐厅", route: "步行约5分钟", duration: "1小时" },
      { time: "13:30", place: tags.includes("创作") ? "艺术书店" : "安静咖啡馆", route: "骑行约8分钟", duration: "1.5小时" },
      { time: "15:30", place: tags.includes("旅行") ? "城市观景台" : "文创园区", route: "打车约12分钟", duration: "2小时" },
      { time: "18:00", place: "精选晚餐", route: "步行约10分钟", duration: "1小时" }
    ]
  };
}

export function getCreationPromptResponse(input: string): { optimized: string; steps: string[] } {
  return { optimized: input + "，高清，细节丰富，电影级光影", steps: ["分析关键词→", "匹配风格→", "优化构图→", "调度算力→"] };
}

export function getTextCreationResponse(topic: string, tags: string[]): string {
  const style = tags.includes("创作") ? "富有诗意" : tags.includes("科技") ? "简洁有力" : "娓娓道来";
  return `【${topic}】\n\n在这个万物互联的时代，${topic}不再是孤立的存在。千问OS让每一个想法都能找到落地的路径，让每一次探索都有智慧的陪伴。\n\n——以${style}的风格，为你而写。`;
}

export function getCodeCreationResponse(requirement: string): string {
  return `// ${requirement}\n\nfunction smartAssistant(input: string) {\n  const intent = analyzeIntent(input);\n  const context = loadUserContext();\n  return generateResponse(intent, context);\n}\n\n// ✅ 已完成生成\n// 💡 建议：可将此函数集成到你的项目中`;
}

export function getMemoryIntro(name: string): string { return `${name}，让我带你回顾今天与千问OS共度的每一刻——`; }
export function getMemoryClosing(): string { return "这只是你与千问OS共度的一天。明天，我会记得今天的一切。"; }

export function getBroadcastText(name: string, memories: { summary: string }[]): string {
  return `早上好，${name}。今日天气晴，气温22°C，空气质量优。\n\n你有3条未读消息。\n\n今日新闻摘要：AI技术持续突破，千问OS为全球超100万企业提供智能动力。\n\n以上是千问为你梳理的今日播报。祝你拥有美好的一天！`;
}

export function getTranslationDemo(text: string, lang: string): string {
  const demos: Record<string, string> = { en: "Innovation is not patching old machines, but giving birth to digital life.", jp: "革新とは古い機械にパッチを当てることではなく、デジタル生命を生み出すことです。", kr: "혁신은 낡은 기계에 패치를 적용하는 것이 아니라 디지털 생명을 탄생시키는 것입니다.", fr: "L'innovation ne consiste pas à corriger les vieilles machines, mais à donner naissance à la vie numérique." };
  return demos[lang] || demos.en;
}

export function getOSArchDetail(ability: string, name: string): string {
  const details: Record<string, string> = {
    "理解": `千问OS的「理解」能力，让${name || "用户"}可以用最自然的方式表达需求。`,
    "推理": `千问OS的「推理」能力，能从模糊的信息中推导出精确的意图。`,
    "记忆": `千问OS的「记忆」能力，记住${name || "你"}每一次对话的细节。`,
    "生成": `千问OS的「生成」能力，从文案到代码到图像，将创造力释放。`,
    "判断": `千问OS的「判断」能力，在关键时刻做出精准决策。`,
    "调度": `千问OS的「调度」能力，自动编排多个工具和API，一句指令完成复杂任务链。`
  };
  return details[ability] || "";
}
