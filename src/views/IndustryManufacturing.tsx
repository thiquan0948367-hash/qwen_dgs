import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { INDUSTRIES } from "../data/responses";
import ParticleTransition from "../components/ParticleTransition";
import AICreditTag from "../components/AICreditTag";

const ind = INDUSTRIES[0]; // 制造

export default function IndustryManufacturing() {
  const navigate = useNavigate();
  const { markIndustryVisited, markIndustryInteracted, addStayDuration } = useUserStore();
  const [trigger, setTrigger] = useState(0);
  const [phase, setPhase] = useState<"old" | "transitioning" | "new">("old");
  const [enterTime] = useState(Date.now());

  useEffect(() => {
    markIndustryVisited("manufacturing");
    return () => addStayDuration("manufacturing", Date.now() - enterTime);
  }, []);

  const handleActivate = () => {
    markIndustryInteracted("manufacturing");
    setPhase("transitioning");
    setTrigger((t) => t + 1);
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

        <ParticleTransition
          trigger={trigger}
          particleCount={2000}
          width={375}
          height={380}
          onComplete={() => setPhase("new")}
        />

        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", marginTop: 12, lineHeight: 1.6, textAlign: "center" }}>
          {phase === "new" ? ind.newDesc : ind.oldDesc}
        </p>

        {phase === "old" && (
          <button onClick={handleActivate} style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)", animation: "pulse-glow 2s infinite" }}>
            激活千问OS
          </button>
        )}

        {phase === "new" && (
          <>
            <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: "var(--radius-sm)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--accent-cyan)", fontFamily: "var(--font-heading)" }}>{ind.statValue}</div>
              <div style={{ fontSize: "var(--text-body)", color: "var(--text-primary)", fontWeight: 500 }}>{ind.statLabel}</div>
              <div style={{ fontSize: "var(--text-caption)", color: "var(--success)", marginTop: 2 }}>{ind.statSub}</div>
            </div>
            <p style={{ marginTop: 10, color: "var(--text-secondary)", fontSize: "var(--text-caption)", fontStyle: "italic", textAlign: "center" }}>{ind.bottomLine}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button onClick={() => navigate("/darkage")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontSize: "var(--text-body)" }}>
                返回行业
              </button>
              <button onClick={() => navigate("/interact/manufacturing")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>
                深度体验 →
              </button>
            </div>
          </>
        )}
      </div>
      <AICreditTag tools={["万相", "千问"]} />
    </div>
  );
}
