import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { TAG_OPTIONS, MOOD_OPTIONS, getGreeting } from "../data/responses";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

export default function Onboarding() {
  const navigate = useNavigate();
  const { setName, setTags, setMood, tags, mood, name } = useUserStore();
  const [localName, setLocalName] = useState(name);
  const [step, setStep] = useState<"name" | "tags" | "mood" | "greeting">("name");
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);
  const [selectedMood, setSelectedMood] = useState(mood);
  const [respondCount, setRespondCount] = useState(0);
  const [respondText, setRespondText] = useState("");

  const triggerRespond = useCallback((text: string) => {
    setRespondText(text);
    setRespondCount((c) => c + 1);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleNameSubmit = useCallback(() => {
    if (!localName.trim()) return;
    setName(localName.trim());
    setStep("tags");
  }, [localName, setName]);

  const handleTagsSubmit = useCallback(() => {
    if (selectedTags.length === 0) return;
    setTags(selectedTags);
    setStep("mood");
  }, [selectedTags, setTags]);

  const handleMoodSubmit = useCallback(() => {
    if (!selectedMood) return;
    setMood(selectedMood);
    setStep("greeting");
    setTimeout(() => {
      triggerRespond(getGreeting(localName, selectedTags, selectedMood));
    }, 500);
  }, [selectedMood, setMood, localName, selectedTags, triggerRespond]);

  const renderStep = () => {
    switch (step) {
      case "name":
        return (
          <div style={{ textAlign: "center", width: "100%", maxWidth: 320 }}>
            <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 8 }}>你是谁？</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", marginBottom: 24 }}>
              千问OS 正在启动，请告诉我关于你——
            </p>
            <input
              value={localName} onChange={(e) => setLocalName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
              placeholder="你的名字" autoFocus
              style={{ width: "100%", padding: "14px 18px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "var(--text-body-lg)", outline: "none", textAlign: "center", marginBottom: 20 }}
            />
            <button onClick={handleNameSubmit} disabled={!localName.trim()}
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: localName.trim() ? "var(--accent-gold)" : "var(--border-subtle)", color: localName.trim() ? "#000" : "var(--text-tertiary)", fontWeight: 600, fontSize: "var(--text-body-lg)", cursor: localName.trim() ? "pointer" : "default" }}>
              确认
            </button>
          </div>
        );
      case "tags":
        return (
          <div style={{ textAlign: "center", width: "100%", maxWidth: 320 }}>
            <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 8 }}>你好，{localName}！</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", marginBottom: 20 }}>选择你感兴趣的领域（可多选）</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>
              {TAG_OPTIONS.map((tag) => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  style={{ padding: "10px 20px", borderRadius: "var(--radius-full)", border: `1.5px solid ${selectedTags.includes(tag) ? "var(--accent-cyan)" : "var(--border-subtle)"}`, background: selectedTags.includes(tag) ? "var(--accent-cyan-dim)" : "transparent", color: selectedTags.includes(tag) ? "var(--accent-cyan)" : "var(--text-secondary)", fontWeight: 500, fontSize: "var(--text-body)" }}>
                  {tag}
                </button>
              ))}
            </div>
            <button onClick={handleTagsSubmit} disabled={selectedTags.length === 0}
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: selectedTags.length ? "var(--accent-gold)" : "var(--border-subtle)", color: selectedTags.length ? "#000" : "var(--text-tertiary)", fontWeight: 600, fontSize: "var(--text-body-lg)", cursor: selectedTags.length ? "pointer" : "default" }}>
              继续
            </button>
          </div>
        );
      case "mood":
        return (
          <div style={{ textAlign: "center", width: "100%", maxWidth: 320 }}>
            <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 8 }}>今天的状态？</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", marginBottom: 20 }}>千问会根据你的状态调整节奏</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {MOOD_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => setSelectedMood(opt.value)}
                  style={{ padding: "14px 20px", borderRadius: "var(--radius-md)", border: `1.5px solid ${selectedMood === opt.value ? "var(--accent-cyan)" : "var(--border-subtle)"}`, background: selectedMood === opt.value ? "var(--accent-cyan-dim)" : "transparent", color: selectedMood === opt.value ? "var(--text-primary)" : "var(--text-secondary)", fontSize: "var(--text-body-lg)", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{opt.emoji}</span><span>{opt.label}</span>
                  {selectedMood === opt.value && <span style={{ marginLeft: "auto", color: "var(--accent-cyan)" }}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={handleMoodSubmit} disabled={!selectedMood}
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: selectedMood ? "var(--accent-gold)" : "var(--border-subtle)", color: selectedMood ? "#000" : "var(--text-tertiary)", fontWeight: 600, fontSize: "var(--text-body-lg)", cursor: selectedMood ? "pointer" : "default" }}>
              一切就绪
            </button>
          </div>
        );
      case "greeting":
        return (
          <div style={{ width: "100%", maxWidth: 360 }}>
            <QwenChat showInput={false} respondTrigger={respondCount} respondText={respondText} />
            <button onClick={() => navigate("/food")}
              style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-gold)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
              开始规划我的一天 →
            </button>
          </div>
        );
    }
  };

  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
        {renderStep()}
      </div>
      {step === "greeting" && <AICreditTag tools={["千问"]} />}
    </div>
  );
}
