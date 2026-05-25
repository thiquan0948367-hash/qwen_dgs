import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getBroadcastText, getTranslationDemo } from "../data/responses";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

type Tab = "broadcast" | "translate" | "vision";
const LANGS = [{ code: "en", label: "English" },{ code: "jp", label: "日本語" },{ code: "kr", label: "한국어" },{ code: "fr", label: "Français" }];

export default function Multimodal() {
  const navigate = useNavigate();
  const { name, memories } = useUserStore();
  const [tab, setTab] = useState<Tab>("broadcast");
  const [lang, setLang] = useState("en");
  const [transInput, setTransInput] = useState("创新不是修补旧机器，而是给予数字生命。");
  const [respondCount, setRespondCount] = useState(0);
  const [respondText, setRespondText] = useState("");

  const triggerRespond = useCallback((text: string) => {
    setRespondText(text);
    setRespondCount((c) => c + 1);
  }, []);

  const handleBroadcast = () => {
    triggerRespond(" 千问正在为你播报——\n\n" + getBroadcastText(name, memories) + "\n\n—— 以上为语义级个性化播报，非机械朗读。");
  };
  const handleTranslate = () => {
    triggerRespond(` 千问实时翻译（${lang.toUpperCase()}）：\n\n"${getTranslationDemo(transInput, lang)}"\n\n 千问Omni：端到端语音→翻译→语音输出，30+语言。`);
  };
  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "broadcast", label: "智慧播报", emoji: " " },{ key: "translate", label: "实时翻译", emoji: " " },{ key: "vision", label: "视觉理解", emoji: " " },
  ];

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>多模态 · 感知万相</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16 }}>千问OS不止于文字——听、看、说、理解</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ flex: 1, padding: "10px 0", borderRadius: "var(--radius-sm)", border: `1px solid ${tab === t.key ? "var(--accent-cyan)" : "var(--border-subtle)"}`, background: tab === t.key ? "var(--accent-cyan-dim)" : "transparent", color: tab === t.key ? "var(--accent-cyan)" : "var(--text-secondary)", fontSize: "var(--text-caption)", fontWeight: 500 }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {tab === "broadcast" && (<>
          <button onClick={handleBroadcast} style={{ width: "100%", padding: "14px", marginBottom: 12, borderRadius: "var(--radius-full)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontWeight: 600, fontSize: "var(--text-body)" }}>
            开始智慧播报
          </button>
          <QwenChat showInput={false} maxHeight="40vh" respondTrigger={respondCount} respondText={respondText} />
        </>)}

        {tab === "translate" && (<>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)}
                style={{ padding: "6px 14px", borderRadius: "var(--radius-full)", border: `1px solid ${lang === l.code ? "var(--accent-cyan)" : "var(--border-subtle)"}`, background: lang === l.code ? "var(--accent-cyan-dim)" : "transparent", color: lang === l.code ? "var(--accent-cyan)" : "var(--text-secondary)", fontSize: "var(--text-caption)" }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input value={transInput} onChange={(e) => setTransInput(e.target.value)}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "var(--text-body)", outline: "none" }} />
            <button onClick={handleTranslate}
              style={{ padding: "10px 18px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>
              翻译
            </button>
          </div>
          <QwenChat showInput={false} maxHeight="30vh" respondTrigger={respondCount} respondText={respondText} />
          <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>
            千问Omni：端到端语音→翻译→语音 | 30+语言 | Flores-200领先基准
          </div>
        </>)}

        {tab === "vision" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "100%", height: 160, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--accent-cyan-dim), rgba(124,58,237,0.15))", border: "1px dashed var(--border-glow)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 40 }}> </span>
              <span style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)" }}>点击上传图片（模拟）</span>
            </div>
            <button onClick={() => triggerRespond(" 千问视觉理解：\n\n这是一张城市夜景照片。前景是一座玻璃幕墙的现代建筑，灯光温暖。背景中有模糊的车流光轨。画面传达出科技与人文交融的氛围。\n\n——千问不仅能'看'，更能'理解'画面中的情感与故事。")}
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>
              模拟理解这张图
            </button>
            <div style={{ marginTop: 12 }}><QwenChat showInput={false} maxHeight="25vh" respondTrigger={respondCount} respondText={respondText} /></div>
          </div>
        )}

        <button onClick={() => navigate("/data")}
          style={{ width: "100%", marginTop: 20, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          千问的影响力 →
        </button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
