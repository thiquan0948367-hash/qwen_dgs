import { useState, useRef } from "react";

interface Props {
  onVoiceResult: (text: string) => void;
  prompts: { text: string; result: string }[];
}

export default function QwenVoice({ onVoiceResult, prompts }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePressStart = () => {
    setIsListening(true);
    // Cycle through prompts
    const idx = (selectedPrompt + 1) % prompts.length;
    setSelectedPrompt(idx);
    timerRef.current = setTimeout(() => {
      setIsListening(false);
      onVoiceResult(prompts[idx].result);
    }, 2500);
  };

  const handlePressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "var(--text-body)" }}>
        💡 试试这样说：
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 320 }}>
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedPrompt(i);
              // auto-trigger
              setTimeout(() => onVoiceResult(p.result), 1500);
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "var(--radius-full)",
              border: `1px solid ${i === selectedPrompt ? "var(--accent-cyan)" : "var(--border-subtle)"}`,
              background: i === selectedPrompt ? "var(--accent-cyan-dim)" : "transparent",
              color: i === selectedPrompt ? "var(--accent-cyan)" : "var(--text-secondary)",
              fontSize: "var(--text-caption)",
              cursor: "pointer",
            }}
          >
            {p.text}
          </button>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <button
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          style={{
            width: 80, height: 80, borderRadius: "50%",
            border: `2px solid ${isListening ? "var(--accent-cyan)" : "var(--border-glow)"}`,
            background: isListening ? "var(--accent-cyan-dim)" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: isListening ? "pulse-glow 1.5s infinite" : "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 28 }}>🎤</span>
        </button>
        {isListening && (
          <div style={{
            position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)",
            fontSize: "var(--text-caption)", color: "var(--accent-cyan)",
            animation: "breathe 1s infinite",
          }}>
            正在聆听...
          </div>
        )}
      </div>
    </div>
  );
}
