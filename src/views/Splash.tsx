import { useNavigate } from "react-router-dom";
import ParticleBg from "../components/ParticleBg";

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <ParticleBg />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 6, color: "var(--accent-cyan)", marginBottom: 20, fontWeight: 500, textTransform: "uppercase" }}>Qwen OS</div>
        <h1 style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.25, fontFamily: "var(--font-heading)", background: "linear-gradient(135deg, var(--text-primary), var(--accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>All Things<br />Run on One</h1>
        <p style={{ marginTop: 16, fontSize: "var(--text-body-lg)", color: "var(--text-secondary)", letterSpacing: 2 }}>千问OS · 万物归一</p>
        <p style={{ marginTop: 24, fontSize: "var(--text-caption)", color: "var(--text-tertiary)", fontStyle: "italic", lineHeight: 1.6 }}>天地与我并生<br />万物与我为一</p>
      </div>
      <div style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <button onClick={() => navigate("/onboarding")} style={{ padding: "14px 48px", borderRadius: "var(--radius-full)", background: "var(--accent-gold)", color: "#000", fontWeight: 700, fontSize: "var(--text-body-lg)", letterSpacing: 1 }}>开始体验</button>
        <div style={{ width: 24, height: 40, borderRadius: "var(--radius-full)", border: "1.5px solid var(--border-glow)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 4, height: 8, borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", animation: "breathe 1.5s infinite" }} />
        </div>
      </div>
    </div>
  );
}
