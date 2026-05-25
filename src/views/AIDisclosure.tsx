import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { disclosureData, aiUsageSummary } from "../data/disclosure";
import AICreditTag from "../components/AICreditTag";

export default function AIDisclosure() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          AI创作实验室
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 4 }}>
          用AI传播AI — 本作品创作全揭秘
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 16, fontStyle: "italic" }}>
          本作品 {aiUsageSummary.textPercent}% 文案由千问生成 · {aiUsageSummary.imagePercent}% 视觉由万相生成
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "50vh", overflowY: "auto", paddingRight: 4 }}>
          {disclosureData.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                padding: "12px 14px", borderRadius: "var(--radius-sm)",
                background: selected === i ? "var(--accent-cyan-dim)" : "var(--bg-secondary)",
                border: `1px solid ${selected === i ? "var(--border-glow)" : "var(--border-subtle)"}`,
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600 }}>
                    {item.screen}
                  </span>
                  <span style={{ fontSize: "var(--text-body)", color: "var(--text-primary)", marginLeft: 8, fontWeight: 500 }}>
                    {item.screenName}
                  </span>
                </div>
                <span style={{
                  fontSize: "var(--text-caption)", padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  background: item.tool === "万相" ? "rgba(124,58,237,0.2)" : "var(--accent-cyan-dim)",
                  color: item.tool === "万相" ? "var(--accent-cyan)" : "var(--accent-cyan)",
                }}>
                  {item.tool}
                </span>
              </div>
              {selected === i && (
                <div style={{
                  marginTop: 8, fontSize: "var(--text-caption)", color: "var(--text-secondary)",
                  lineHeight: 1.6, animation: "fadeInUp 300ms var(--ease-out) both",
                }}>
                  <div style={{ color: "var(--text-tertiary)", marginBottom: 4 }}>Prompt：</div>
                  <div style={{ marginBottom: 8 }}>{item.prompt}</div>
                  <div style={{ color: "var(--text-tertiary)", marginBottom: 2 }}>产出：</div>
                  <div>{item.result}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/transition")}
          style={{
            width: "100%", marginTop: 20, padding: "14px",
            borderRadius: "var(--radius-full)", background: "var(--accent-cyan)",
            color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)",
          }}
        >
          写给明天 →
        </button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
