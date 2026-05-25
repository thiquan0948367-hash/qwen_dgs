import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { INDUSTRIES, apiDemoKey } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

export default function APIReveal() {
  const navigate = useNavigate();
  const { industries } = useUserStore();
  const [activated, setActivated] = useState(0);

  const visitedIndustries = INDUSTRIES.filter((ind) => industries[ind.id]?.visited);
  const keys = visitedIndustries.length > 0 ? visitedIndustries : INDUSTRIES.slice(0, 4);

  const handleKeyTurn = () => {
    if (activated < keys.length) {
      setActivated((a) => a + 1);
    }
  };

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)", textAlign: "center" }}>
          One Key, All Things
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 20, textAlign: "center" }}>
          一把钥匙，激活一切
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={handleKeyTurn} disabled={activated >= keys.length}
            style={{
              width: 72, height: 72, borderRadius: "50%",
              background: activated >= keys.length ? "var(--accent-cyan)" : "var(--accent-cyan-dim)",
              border: `2px solid ${activated >= keys.length ? "var(--accent-cyan)" : "var(--border-glow)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: activated >= keys.length ? "default" : "pointer",
              transform: `rotate(${activated * 90}deg)`,
              transition: "transform 0.6s var(--ease-out), background 0.6s",
              fontSize: 28,
            }}>
            🔑
          </button>
          <span style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>
            {activated >= keys.length ? "全部已激活" : "点击钥匙，激活行业"}
          </span>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
            {keys.map((ind, i) => (
              <div key={ind.id} style={{
                padding: "14px 10px", borderRadius: "var(--radius-md)",
                background: i < activated ? "var(--accent-cyan-dim)" : "var(--bg-secondary)",
                border: `1px solid ${i < activated ? "var(--border-glow)" : "var(--border-subtle)"}`,
                textAlign: "center",
                transition: "all 0.5s var(--ease-out)",
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{i < activated ? "🚪" : "🔒"}</div>
                <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: i < activated ? "var(--text-primary)" : "var(--text-tertiary)" }}>
                  {ind.name}
                </div>
                <div style={{ fontSize: 10, color: i < activated ? "var(--accent-cyan)" : "var(--text-tertiary)", marginTop: 2 }}>
                  {i < activated ? ind.newTitle : "待激活"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {activated >= keys.length && (
          <div style={{ animation: "fadeInUp 400ms var(--ease-out) both" }}>
            <div style={{ padding: "14px 16px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", marginBottom: 10, textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", marginBottom: 8 }}>
                你刚才看到的一切——制造、医疗、教育、创意——背后都是同一套千问OS API
              </p>
              <code style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", background: "rgba(255,179,71,0.08)", padding: "6px 12px", borderRadius: "var(--radius-xs)", fontFamily: "monospace", letterSpacing: 1 }}>
                {apiDemoKey}
              </code>
            </div>
            <p style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", textAlign: "center", fontStyle: "italic", marginBottom: 14 }}>
              一行代码，接入千问OS · 30秒，让任何行业拥有AI大脑
            </p>
          </div>
        )}

        <button onClick={() => navigate("/bailian")}
          style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          探索百炼平台 →
        </button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
