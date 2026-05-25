import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { INDUSTRIES } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

const ind = INDUSTRIES[2]; // 教育

export default function IndustryEducation() {
  const navigate = useNavigate();
  const { markIndustryVisited, markIndustryInteracted, addStayDuration } = useUserStore();
  const [isListening, setIsListening] = useState(false);
  const [phase, setPhase] = useState<"old" | "listening" | "transition" | "new">("old");
  const [enterTime] = useState(Date.now());

  useEffect(() => {
    markIndustryVisited("education");
    return () => addStayDuration("education", Date.now() - enterTime);
  }, []);

  const handleVoiceStart = () => {
    setIsListening(true);
    setPhase("listening");
    setTimeout(() => {
      setIsListening(false);
      setPhase("transition");
      markIndustryInteracted("education");
      setTimeout(() => setPhase("new"), 2000);
    }, 2500);
  };

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 375 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)", textAlign: "center" }}>
          {ind.name} · {ind.title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 14, textAlign: "center" }}>
          {phase === "new" ? ind.newTitle : ind.oldTitle}
        </p>

        {/* Visual container */}
        <div style={{
          position: "relative", width: "100%", height: 360, borderRadius: "var(--radius-md)",
          overflow: "hidden", background: phase === "new"
            ? "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,58,237,0.08))"
            : "linear-gradient(135deg, #1a1a2e, #2d2d44)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "background 1.5s var(--ease-out)",
        }}>
          {/* Mask reveal for new state */}
          {phase === "old" && (
            <>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏫</div>
              <div style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", letterSpacing: 2 }}>{ind.oldTitle}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", textAlign: "center", marginTop: 10, lineHeight: 1.6, maxWidth: 280 }}>
                {ind.oldDesc}
              </div>
            </>
          )}

          {(phase === "listening" || phase === "transition") && (
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle at center, rgba(0,229,255,0.15) 0%, transparent 70%)",
              clipPath: phase === "transition" ? "circle(100% at center)" : "circle(15% at center)",
              transition: "clip-path 1.5s var(--ease-out)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🧠</div>
                <div style={{ color: "var(--accent-cyan)", fontSize: "var(--text-body)", fontWeight: 600 }}>
                  千问OS正在理解...
                </div>
              </div>
            </div>
          )}

          {phase === "new" && (
            <>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
              <div style={{ color: "var(--accent-cyan)", fontSize: "var(--text-caption)", letterSpacing: 2 }}>{ind.newTitle}</div>
              <div style={{ color: "var(--text-primary)", fontSize: "var(--text-body)", textAlign: "center", marginTop: 10, lineHeight: 1.6, maxWidth: 280 }}>
                {ind.newDesc}
              </div>
            </>
          )}
        </div>

        {phase === "old" && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button
              onMouseDown={handleVoiceStart}
              onTouchStart={handleVoiceStart}
              style={{
                width: 80, height: 80, borderRadius: "50%",
                border: `2px solid ${isListening ? "var(--accent-cyan)" : "var(--border-glow)"}`,
                background: isListening ? "var(--accent-cyan-dim)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: isListening ? "pulse-glow 1s infinite" : "none",
              }}
            >
              <span style={{ fontSize: 28 }}>🎤</span>
            </button>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)" }}>
              {isListening ? "正在聆听..." : "长按说：千问，帮这个孩子学数学"}
            </span>
          </div>
        )}

        {phase === "new" && (
          <>
            <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent-cyan)", fontFamily: "var(--font-heading)" }}>{ind.statValue}</div>
              <div style={{ fontSize: "var(--text-body)", color: "var(--text-primary)", fontWeight: 500 }}>{ind.statLabel}</div>
              <div style={{ fontSize: "var(--text-caption)", color: "var(--success)", marginTop: 2 }}>{ind.statSub}</div>
            </div>
            <p style={{ marginTop: 8, color: "var(--text-secondary)", fontSize: "var(--text-caption)", fontStyle: "italic", textAlign: "center" }}>{ind.bottomLine}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => navigate("/darkage")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontSize: "var(--text-body)" }}>返回行业</button>
              <button onClick={() => navigate("/interact/education")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>深度体验 →</button>
            </div>
          </>
        )}
      </div>
      <AICreditTag tools={["万相", "千问"]} />
    </div>
  );
}
