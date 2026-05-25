import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { manufacturingLines } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

export default function InteractManufacturing() {
  const navigate = useNavigate();
  const { addInteraction, addStayDuration } = useUserStore();
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [enterTime] = useState(Date.now());

  useEffect(() => {
    return () => addStayDuration("manufacturing", Date.now() - enterTime);
  }, []);

  const line = selectedLine !== null ? manufacturingLines[selectedLine] : null;
  const statusColor = (s: string) => s === "critical" ? "var(--error)" : s === "warning" ? "var(--warning)" : "var(--success)";

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          数字孪生工厂
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 4 }}>
          制造 · 千问OS全局调度
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 14, fontStyle: "italic" }}>
          P3展示了"质检"单点——这里展示千问OS如何同时管理多条产线的实时数据与调度决策
        </p>

        {/* Line grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {manufacturingLines.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { setSelectedLine(i); addInteraction({ screen: "manufacturing", action: `查看产线${l.name}`, timestamp: Date.now() }); }}
              style={{
                padding: "10px 12px", borderRadius: "var(--radius-sm)",
                background: selectedLine === i ? "var(--accent-cyan-dim)" : "var(--bg-secondary)",
                border: `1px solid ${selectedLine === i ? "var(--border-glow)" : "var(--border-subtle)"}`,
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", fontWeight: 500 }}>{l.name}</span>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(l.status) }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>良率 {l.rate}%</div>
              {l.alerts > 0 && <div style={{ fontSize: 10, color: l.status === "critical" ? "var(--error)" : "var(--warning)", marginTop: 2 }}>⚠ {l.alerts}条告警</div>}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {line && (
          <div style={{
            padding: "14px 16px", borderRadius: "var(--radius-sm)",
            background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
            animation: "fadeInUp 300ms var(--ease-out)",
          }}>
            <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
              {line.name} · 千问OS分析
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-caption)" }}>
                <span style={{ color: "var(--text-tertiary)" }}>状态</span>
                <span style={{ color: statusColor(line.status), fontWeight: 600 }}>{line.status === "critical" ? "⚠ 需立即处理" : line.status === "warning" ? "● 关注" : "● 正常"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-caption)" }}>
                <span style={{ color: "var(--text-tertiary)" }}>良率</span>
                <span style={{ color: "var(--text-primary)" }}>{line.rate}%</span>
              </div>
              {line.alertDetail && (
                <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", background: "rgba(239,68,68,0.08)", padding: "8px 10px", borderRadius: "var(--radius-xs)", marginTop: 4 }}>
                  <div style={{ color: "var(--error)", fontWeight: 600, marginBottom: 2 }}>千问OS检测到异常：</div>
                  {line.alertDetail}
                  <div style={{ marginTop: 6, color: "var(--accent-cyan)", fontWeight: 500 }}>→ 建议：{line.status === "critical" ? "立即暂停产线，检查定位传感器" : "安排下一轮巡检时校准传感器"}</div>
                </div>
              )}
            </div>
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
