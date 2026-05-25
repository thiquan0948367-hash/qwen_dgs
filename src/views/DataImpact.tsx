import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AICreditTag from "../components/AICreditTag";

const cards = [
  { value: "100万+", label: "服务企业", detail: "覆盖金融、医疗、教育、制造等20+行业，为企业提供从模型训练到应用部署的全栈AI服务。" },
  { value: "400+", label: "开源模型", detail: "从0.5B到72B参数规模，覆盖语言、视觉、语音、代码全模态。Qwen是全球下载量最大的开源模型系列。" },
  { value: "10亿+", label: "全球下载", detail: "登顶Hugging Face全球模型下载榜，20万+衍生模型。中国大模型在全球开源社区的影响力标杆。" },
  { value: "29", label: "全球地域", detail: "为全球29个地域、92个可用区的客户提供稳定性全球领先的AI产品技术。" }
];

export default function DataImpact() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>数据 · 影响力</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 20 }}>千问OS — 全球领先的全栈AI服务商</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {cards.map((card, i) => (
            <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{ padding: expanded === i ? "16px" : "14px 16px", borderRadius: "var(--radius-md)", background: expanded === i ? "var(--accent-cyan-dim)" : "var(--bg-secondary)", border: `1px solid ${expanded === i ? "var(--border-glow)" : "var(--border-subtle)"}`, textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-heading)", background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{card.value}</span>
                <span style={{ fontSize: "var(--text-body-lg)", color: "var(--text-primary)", fontWeight: 500 }}>{card.label}</span>
              </div>
              {expanded === i && <p style={{ marginTop: 8, fontSize: "var(--text-caption)", color: "var(--text-secondary)", lineHeight: 1.6, animation: "fadeInUp 300ms var(--ease-out) both" }}>{card.detail}</p>}
            </button>
          ))}
        </div>
        <button onClick={() => navigate("/disclosure")} style={{ width: "100%", marginTop: 24, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>看看AI如何创作本作品 →</button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
