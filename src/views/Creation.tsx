import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getCreationPromptResponse, getTextCreationResponse, getCodeCreationResponse } from "../data/responses";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

type Tab = "image" | "text" | "code";

export default function Creation() {
  const navigate = useNavigate();
  const { name, tags, setCreationResult, addMemory } = useUserStore();
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
    const text = input.trim();
    if (tab === "image") {
      const { optimized, steps } = getCreationPromptResponse(text);
      triggerRespond(`收到！让我优化你的创意——\n\n 优化后Prompt：${optimized}\n\n${steps.join(" ")}\n\n 生成完成！请看——`);
      setCreationResult({ type: "image", prompt: optimized, result: "AI生成图片（万相）" });
      addMemory({ time: "17:00", scene: "AI创作", summary: `${name}用千问+万相创作了一幅作品`, detail: `Prompt: ${optimized}` });
    } else if (tab === "text") {
      const response = getTextCreationResponse(text, tags);
      triggerRespond(response);
      setCreationResult({ type: "text", prompt: text, result: response });
      addMemory({ time: "17:00", scene: "AI创作", summary: `${name}让千问生成了一段关于「${text}」的文案`, detail: response.slice(0, 100) + "..." });
    } else {
      const response = getCodeCreationResponse(text);
      triggerRespond(response);
      setCreationResult({ type: "code", prompt: text, result: response });
      addMemory({ time: "17:00", scene: "AI创作", summary: `${name}让千问生成了一段代码`, detail: `需求：${text}` });
    }
  };

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "image", label: "图片生成", emoji: " " }, { key: "text", label: "文案创作", emoji: " " }, { key: "code", label: "代码生成", emoji: " " },
  ];

  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-gold)" }}>创作 · 灵感即现实</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16 }}>创 · 灵感到成品</p>
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
            placeholder={tab === "image" ? "描述你想象的画面..." : tab === "text" ? "输入文案主题..." : "描述代码需求..."}
            style={{ flex: 1, padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "var(--text-body)", outline: "none" }} />
          <button onClick={handleSubmit}
            style={{ padding: "12px 20px", borderRadius: "var(--radius-full)", background: "var(--accent-gold)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)", whiteSpace: "nowrap" }}>
            生成
          </button>
        </div>
        <QwenChat showInput={false} maxHeight="35vh" respondTrigger={respondCount} respondText={respondText} />
        <button onClick={() => navigate("/memory")}
          style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-gold)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          回顾一天 →
        </button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
