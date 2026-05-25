import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getTravelPlan } from "../data/responses";
import QwenVoice from "../components/QwenVoice";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

const VOICE_PROMPTS = [
  { text: "找个安静的地方逛逛", result: "好的，我理解你想找一个安静舒适的场所。正在分析你的偏好——你喜欢设计和创作，附近有一家独立艺术书店和一家安静的精品咖啡馆，我已规划好路线。" },
  { text: "中午去吃饭，顺路逛逛", result: "明白！我结合你刚才的饮食偏好，为你找到了沿途的特色餐厅。路线已规划：先去午餐，然后顺路探访附近的文创园区。" },
  { text: "想去看日落，怎么走方便", result: "浪漫的选择！我筛选了城市最佳日落观景点，并结合实时交通数据，推荐打车约12分钟即可到达的城市观景台。" },
];

export default function Travel() {
  const navigate = useNavigate();
  const { name, tags, setTravelPlan, addMemory } = useUserStore();
  const [respondCount, setRespondCount] = useState(0);
  const [respondText, setRespondText] = useState("");
  const [plan, setPlan] = useState<{ items: { time: string; place: string; route: string; duration: string }[] } | null>(null);
  const [done, setDone] = useState(false);

  const triggerRespond = useCallback((text: string) => {
    setRespondText(text);
    setRespondCount((c) => c + 1);
  }, []);

  const handleVoiceResult = (text: string) => {
    triggerRespond(text);
    const p = getTravelPlan("心仪餐厅", tags);
    setPlan(p);
    setTimeout(() => {
      const planText = p.items.map((item) => ` ${item.time} · ${item.place}\n  ${item.route} | 预计${item.duration}`).join("\n\n");
      triggerRespond("这是我为你规划的半日路线：\n\n" + planText);
      setDone(true);
    }, 2500);
  };

  const handleDone = () => {
    if (plan) {
      setTravelPlan(plan);
      addMemory({ time: "09:00", scene: "出行规划", summary: `千问为${name}规划了包含${plan.items.length}个目的地的半日路线`, detail: plan.items.map((i) => `${i.time} ${i.place}`).join(" → ") });
    }
    navigate("/creation");
  };

  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-gold)" }}>出行 · 模糊即精准</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 20 }}>行 · 一条路</p>
        <QwenVoice onVoiceResult={handleVoiceResult} prompts={VOICE_PROMPTS} />
        <div style={{ marginTop: 16 }}>
          <QwenChat showInput={false} maxHeight="30vh" respondTrigger={respondCount} respondText={respondText} />
        </div>
        {done && plan && (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {plan.items.map((item, i) => (
              <div key={i} style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "var(--radius-xs)", background: "var(--accent-cyan-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600 }}>{item.time}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: "var(--text-body)", fontWeight: 500 }}>{item.place}</div><div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>{item.route} | {item.duration}</div></div>
              </div>
            ))}
          </div>
        )}
        {done && (
          <button onClick={handleDone} style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-gold)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
            继续探索 →
          </button>
        )}
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
