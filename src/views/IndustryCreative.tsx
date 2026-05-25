import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { INDUSTRIES } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

const ind = INDUSTRIES[3]; // 创意

export default function IndustryCreative() {
  const navigate = useNavigate();
  const { markIndustryVisited, markIndustryInteracted, addStayDuration } = useUserStore();
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [phase, setPhase] = useState<"old" | "zooming" | "explode" | "new">("old");
  const [enterTime] = useState(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);
  const lastDistRef = useRef(0);

  useEffect(() => {
    markIndustryVisited("creative");
    return () => addStayDuration("creative", Date.now() - enterTime);
  }, []);

  const getTouchCenter = (touches: TouchList) => {
    return { x: ((touches[0].clientX + touches[1].clientX) / 2), y: ((touches[0].clientY + touches[1].clientY) / 2) };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && phase === "old") {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDistRef.current = Math.sqrt(dx * dx + dy * dy);
      const center = getTouchCenter(e.touches);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setOrigin({ x: ((center.x - rect.left) / rect.width) * 100, y: ((center.y - rect.top) / rect.height) * 100 });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && (phase === "old" || phase === "zooming")) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const s = Math.max(1, Math.min(4, scale * (dist / lastDistRef.current)));
      setScale(s);
      lastDistRef.current = dist;
      if (s > 3.5 && phase === "old") {
        setPhase("zooming");
        setTimeout(() => {
          setPhase("explode");
          markIndustryInteracted("creative");
          setTimeout(() => setPhase("new"), 1200);
        }, 400);
      }
    }
  };

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 375 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)", textAlign: "center" }}>
          {ind.name} · {ind.title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 6, textAlign: "center" }}>
          {phase === "new" ? ind.newTitle : "双指缩放，放大旧时代的细节——"}
        </p>

        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            position: "relative", width: "100%", height: 380, borderRadius: "var(--radius-md)",
            overflow: "hidden", touchAction: "none", userSelect: "none",
          }}
        >
          {/* Old layer */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #1a1a2e, #2d2d44)",
            transform: `scale(${scale})`,
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transition: phase === "old" || phase === "zooming" ? "none" : "transform 0.8s var(--ease-out)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: phase === "explode" ? 0 : 1,
            filter: `blur(${Math.max(0, (scale - 1) * 2)}px)`,
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎨</div>
            <div style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", letterSpacing: 2 }}>{ind.oldTitle}</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", textAlign: "center", marginTop: 10, lineHeight: 1.6, maxWidth: 280 }}>
              {ind.oldDesc}
            </div>
          </div>

          {/* Explosion particles (CSS) */}
          {phase === "explode" && (
            <div style={{ position: "absolute", inset: 0 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: `${origin.x}%`, top: `${origin.y}%`,
                  width: 6, height: 6, borderRadius: "50%",
                  background: i % 3 === 0 ? "var(--accent-cyan)" : i % 3 === 1 ? "var(--accent-cyan)" : "var(--accent-cyan)",
                  animation: `particleBurst${i % 4} 1s var(--ease-out) forwards`,
                  animationDelay: `${i * 0.02}s`,
                  opacity: 0,
                }} />
              ))}
            </div>
          )}

          {/* New layer */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,58,237,0.08))",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: phase === "new" ? 1 : 0,
            transition: "opacity 0.6s var(--ease-out)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
            <div style={{ color: "var(--accent-cyan)", fontSize: "var(--text-caption)", letterSpacing: 2 }}>{ind.newTitle}</div>
            <div style={{ color: "var(--text-primary)", fontSize: "var(--text-body)", textAlign: "center", marginTop: 10, lineHeight: 1.6, maxWidth: 280 }}>
              {ind.newDesc}
            </div>
          </div>
        </div>

        {phase === "old" && (
          <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", textAlign: "center", marginTop: 8 }}>
            👆 双指捏合放大旧画面，直到它"炸开"
          </p>
        )}

        {phase === "new" && (
          <>
            <div style={{ marginTop: 10, padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent-cyan)", fontFamily: "var(--font-heading)" }}>{ind.statValue}</div>
              <div style={{ fontSize: "var(--text-body)", color: "var(--text-primary)", fontWeight: 500 }}>{ind.statLabel}</div>
              <div style={{ fontSize: "var(--text-caption)", color: "var(--success)", marginTop: 2 }}>{ind.statSub}</div>
            </div>
            <p style={{ marginTop: 8, color: "var(--text-secondary)", fontSize: "var(--text-caption)", fontStyle: "italic", textAlign: "center" }}>{ind.bottomLine}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => navigate("/darkage")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontSize: "var(--text-body)" }}>返回行业</button>
              <button onClick={() => navigate("/interact/creative")} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>深度体验 →</button>
            </div>
          </>
        )}
      </div>
      <AICreditTag tools={["万相", "千问"]} />
    </div>
  );
}
