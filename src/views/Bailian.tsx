import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIDashboard from "../components/APIDashboard";
import AICreditTag from "../components/AICreditTag";

export default function Bailian() {
  const navigate = useNavigate();
  const [deployStep, setDeployStep] = useState(0);

  const steps = [" 选择行业", " 选择模型", " 获取Key", " 部署完成"];

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          百炼平台
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 14 }}>
          阿里云百炼 · 开发者控制台
        </p>

        {/* 30-second deploy simulation */}
        <div style={{ padding: "14px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", marginBottom: 14 }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginBottom: 8 }}>30秒接入千问OS</div>
          <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setDeployStep(i)}
                style={{
                  flex: 1, padding: "8px 4px", borderRadius: "var(--radius-xs)",
                  background: i <= deployStep ? "var(--accent-cyan-dim)" : "var(--border-subtle)",
                  border: "none", color: i <= deployStep ? "var(--accent-cyan)" : "var(--text-tertiary)",
                  fontSize: 10, fontWeight: i <= deployStep ? 600 : 400,
                  cursor: "pointer",
                }}>
                {s}
              </button>
            ))}
          </div>
          {deployStep === 3 && (
            <div style={{ padding: "8px 12px", borderRadius: "var(--radius-xs)", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", fontSize: "var(--text-caption)", color: "var(--success)", textAlign: "center", fontWeight: 600 }}>
              ✅ 部署完成！千问OS已接入你的应用
            </div>
          )}
        </div>

        <APIDashboard />

        <button onClick={() => navigate("/dataimpact")}
          style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          千问的影响力 →
        </button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
