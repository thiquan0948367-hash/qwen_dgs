import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import QwenRadar from "../components/QwenRadar";
import AICreditTag from "../components/AICreditTag";
import html2canvas from "html2canvas";

export default function Report() {
  const navigate = useNavigate();
  const { name, tags, futureMessage, foodPlan, travelPlan, creationResult, memories } = useUserStore();
  const posterRef = useRef<HTMLDivElement>(null);

  const completedScenes = [
    foodPlan ? "饮食规划 ✓" : null, travelPlan ? "出行规划 ✓" : null,
    creationResult ? "AI创作 ✓" : null, memories.length > 0 ? "记忆贯通 ✓" : null
  ].filter(Boolean) as string[];

  const radarData = [
    { label: "理解", value: 90 }, { label: "推理", value: 85 }, { label: "记忆", value: 92 },
    { label: "生成", value: 88 }, { label: "判断", value: 80 }, { label: "调度", value: 85 }
  ];

  const handleSavePoster = useCallback(async () => {
    if (!posterRef.current) return;
    try {
      const canvas = await html2canvas(posterRef.current, { backgroundColor: "#080d1a", scale: 2 });
      const link = document.createElement("a");
      link.download = `千问OS能力图谱_${name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch { alert("保存失败，请截图保存"); }
  }, [name]);

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50, gap: 16 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)", textAlign: "center" }}>{name}的千问OS能力图谱</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16, textAlign: "center" }}>All Things Run on One</p>
      </div>
      <div ref={posterRef} style={{ position: "relative", zIndex: 1, padding: "20px", borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, #080d1a 0%, #0f1629 50%, rgba(0,229,255,0.05) 100%)", border: "1px solid var(--border-subtle)", width: 320 }}>
        {futureMessage && (
          <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "rgba(255,179,71,0.08)", border: "1px solid rgba(255,179,71,0.2)", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginBottom: 2 }}>写给明天</div>
            <div style={{ fontSize: "var(--text-body)", color: "var(--accent-cyan)", fontStyle: "italic" }}>"{futureMessage}"</div>
          </div>
        )}
        <QwenRadar data={radarData} size={260} name={name} />
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
          {completedScenes.map((s) => <span key={s} style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", background: "rgba(34,197,94,0.12)", color: "var(--success)", fontSize: "var(--text-caption)", fontWeight: 500 }}>{s}</span>)}
        </div>
        <div style={{ marginTop: 14, textAlign: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: 10 }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600, letterSpacing: 2 }}>QWEN OS</div>
          <div style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 2 }}>All Things Run on One · 千问OS · 万物归一</div>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 10, width: "100%", maxWidth: 320 }}>
        <button onClick={handleSavePoster} style={{ flex: 1, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontWeight: 600, fontSize: "var(--text-body)" }}>💾 保存海报</button>
        <button onClick={() => navigate("/share")} style={{ flex: 1, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>分享 →</button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
