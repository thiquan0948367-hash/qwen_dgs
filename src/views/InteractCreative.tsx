import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

type Tab = "image" | "text" | "code";

export default function InteractCreative() {
  const navigate = useNavigate();
  const { addInteraction, addStayDuration } = useUserStore();
  const [tab, setTab] = useState<Tab>("image");
  const [input, setInput] = useState("");
  const [respondCount, setRespondCount] = useState(0);
  const [respondText, setRespondText] = useState("");

  const triggerRespond = useCallback((text: string) => {
    setRespondText(text);
    setRespondCount((c) => c + 1);
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    addInteraction({ screen: "creative", action: `${tab}生成: ${input.trim().slice(0, 30)}`, timestamp: Date.now() });
    if (tab === "image") {
      triggerRespond(`🎨 万相正在创作...\n\n 理解Prompt → "${input.trim()}"\n 匹配风格 → 构图优化 → 渲染生成\n\n✨ 生成完成！\n\n[万相生成结果——投入Prompt即可获得]\n\n——从"我试试"到"我选择"，千问OS释放创造力。`);
    } else if (tab === "text") {
      triggerRespond(`✍️ 千问文案生成：\n\n「${input.trim()}」\n\n在这个万物互联的时代，${input.trim()}不再是孤立的存在。千问OS让每一个想法都能找到落地的路径，让每一次探索都有智慧的陪伴。\n\n——为你而写。`);
    } else {
      triggerRespond(`💻 千问代码生成：\n\n// ${input.trim()}\n\nfunction smartAssistant(input: string) {\n  const intent = analyzeIntent(input);\n  const context = loadUserContext();\n  return generateResponse(intent, context);\n}\n\n✅ 已完成。可将此函数集成到你的项目中。`);
    }
  };

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "image", label: "万相·生图", emoji: "🎨" },
    { key: "text", label: "千问·文案", emoji: "✍️" },
    { key: "code", label: "千问·代码", emoji: "💻" },
  ];

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          深度创作工作台
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 4 }}>
          创意 · 千问OS释放创造力
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 14, fontStyle: "italic" }}>
          P6展示了"对比"——这里深度使用千问+万相，体验AI原生创作
        </p>

        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ flex: 1, padding: "10px 0", borderRadius: "var(--radius-sm)", border: `1px solid ${tab === t.key ? "var(--accent-cyan)" : "var(--border-subtle)"}`, background: tab === t.key ? "var(--accent-cyan-dim)" : "transparent", color: tab === t.key ? "var(--accent-cyan)" : "var(--text-secondary)", fontSize: "var(--text-caption)", fontWeight: 500 }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder={tab === "image" ? "描述你想创作的画面..." : tab === "text" ? "输入文案主题..." : "描述代码需求..."}
            style={{ flex: 1, padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "var(--text-body)", outline: "none" }} />
          <button onClick={handleSubmit}
            style={{ padding: "12px 20px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)", whiteSpace: "nowrap" }}>
            生成
          </button>
        </div>

        <QwenChat showInput={false} maxHeight="35vh" respondTrigger={respondCount} respondText={respondText} />

        <button onClick={() => navigate("/apireveal")}
          style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          揭开底层技术 →
        </button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
