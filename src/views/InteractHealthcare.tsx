import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { healthcareCase } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

export default function InteractHealthcare() {
  const navigate = useNavigate();
  const { addInteraction, addStayDuration } = useUserStore();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [enterTime] = useState(Date.now());

  useEffect(() => {
    return () => addStayDuration("healthcare", Date.now() - enterTime);
  }, []);

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          多学科会诊
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 4 }}>
          医疗 · 千问OS综合决策
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 14, fontStyle: "italic" }}>
          P4展示了"阅片"——这里展示千问OS如何综合分析影像+病历+基因+文献，输出综合诊断
        </p>

        {/* Patient card */}
        <div style={{ padding: "14px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>患者信息</div>
          <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>
            {healthcareCase.patient.name} · {healthcareCase.patient.age}岁 · {healthcareCase.patient.gender}
          </div>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 6 }}>
            主诉：{healthcareCase.chiefComplaint}
          </div>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginTop: 4 }}>
            影像：{healthcareCase.imagingFindings}
          </div>
        </div>

        {!showAnalysis && (
          <button
            onClick={() => { setShowAnalysis(true); addInteraction({ screen: "healthcare", action: "触发多学科会诊分析", timestamp: Date.now() }); }}
            style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>
            🧬 千问OS多学科会诊
          </button>
        )}

        {showAnalysis && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Analysis cards */}
            {healthcareCase.qwenAnalysis.map((a, i) => (
              <div key={i} style={{
                padding: "10px 12px", borderRadius: "var(--radius-sm)",
                background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
                animation: "fadeInUp 300ms var(--ease-out) both",
                animationDelay: `${i * 150}ms`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600 }}>
                    {a.category}
                  </span>
                  <span style={{ fontSize: 10, color: "var(--text-tertiary)" }}>数据源：{a.source}</span>
                </div>
                <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {a.finding}
                </div>
              </div>
            ))}
            {/* Recommendation */}
            <div style={{
              padding: "12px 14px", borderRadius: "var(--radius-sm)",
              background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)",
              marginTop: 4,
            }}>
              <div style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600, marginBottom: 4 }}>
                千问OS综合建议
              </div>
              <div style={{ fontSize: "var(--text-body)", color: "var(--text-primary)", lineHeight: 1.6 }}>
                {healthcareCase.recommendation}
              </div>
            </div>
            <p style={{ fontSize: 10, color: "var(--text-tertiary)", textAlign: "center", marginTop: 2 }}>
              ⚠ 模拟演示，非真实医疗建议。实际请遵循医生诊断。
            </p>
          </div>
        )}

        <button onClick={() => navigate("/apireveal")}
          style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          揭开底层技术 →
        </button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
