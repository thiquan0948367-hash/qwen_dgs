import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { INDUSTRIES } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

const ind = INDUSTRIES[1]; // 医疗

export default function IndustryHealthcare() {
  const navigate = useNavigate();
  const { markIndustryVisited, markIndustryInteracted, addStayDuration } = useUserStore();
  const [sliderPos, setSliderPos] = useState(0); // 0=old, 100=new
  const [revealed, setRevealed] = useState(false);
  const [enterTime] = useState(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markIndustryVisited("healthcare");
    return () => addStayDuration("healthcare", Date.now() - enterTime);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(p);
    if (p > 80) {
      setRevealed(true);
      markIndustryInteracted("healthcare");
    }
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 375 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)", textAlign: "center" }}>
          {ind.name} · {ind.title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 6, textAlign: "center" }}>
          滑动分割线，揭晓对比
        </p>

        <div
          ref={containerRef}
          onTouchMove={handleTouchMove}
          onMouseMove={(e) => e.buttons === 1 && handleMouseMove(e)}
          style={{
            position: "relative", width: "100%", height: 400, borderRadius: "var(--radius-md)",
            overflow: "hidden", cursor: "ew-resize", touchAction: "none",
            background: "var(--bg-secondary)", userSelect: "none",
          }}
        >
          {/* Old (left) */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a2e, #2d2d44)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏥</div>
            <div style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", letterSpacing: 2 }}>{ind.oldTitle}</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", textAlign: "center", marginTop: 8, lineHeight: 1.6, maxWidth: 280 }}>
              {ind.oldDesc}
            </div>
          </div>

          {/* New (right, clipped) */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
            background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,58,237,0.08))",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🧬</div>
            <div style={{ color: "var(--accent-cyan)", fontSize: "var(--text-caption)", letterSpacing: 2 }}>{ind.newTitle}</div>
            <div style={{ color: "var(--text-primary)", fontSize: "var(--text-body)", textAlign: "center", marginTop: 8, lineHeight: 1.6, maxWidth: 280 }}>
              {ind.newDesc}
            </div>
          </div>

          {/* Slider line */}
          <div style={{
            position: "absolute", left: `${sliderPos}%`, top: 0, bottom: 0,
            width: 3, background: "var(--accent-cyan)", boxShadow: "0 0 12px var(--accent-cyan-dim)",
            transform: "translateX(-50%)", transition: sliderPos === 0 ? "none" : "left 0.05s linear",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 40, height: 40, borderRadius: "50%", background: "var(--accent-cyan)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px var(--accent-cyan-dim)",
            }}>
              <span style={{ fontSize: 16 }}>⇔</span>
            </div>
          </div>
        </div>

        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", textAlign: "center", marginTop: 6 }}>
          ← 拖动中间线揭晓千问OS带来的变化 →
        </p>

        {revealed && (
          <>
            <div style={{ marginTop: 10, padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent-cyan)", fontFamily: "var(--font-heading)" }}>{ind.statValue}</div>
              <div style={{ fontSize: "var(--text-body)", color: "var(--text-primary)", fontWeight: 500 }}>{ind.statLabel}</div>
              <div style={{ fontSize: "var(--text-caption)", color: "var(--success)", marginTop: 2 }}>{ind.statSub}</div>
            </div>
            <p style={{ marginTop: 8, color: "var(--text-secondary)", fontSize: "var(--text-caption)", fontStyle: "italic", textAlign: "center" }}>{ind.bottomLine}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => navigate("/darkage")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontSize: "var(--text-body)" }}>返回行业</button>
              <button onClick={() => navigate("/interact/healthcare")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>深度体验 →</button>
            </div>
          </>
        )}
      </div>
      <AICreditTag tools={["万相", "千问"]} />
    </div>
  );
}
