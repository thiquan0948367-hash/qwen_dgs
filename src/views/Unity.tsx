import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import QwenRadar from "../components/QwenRadar";
import AICreditTag from "../components/AICreditTag";
import html2canvas from "html2canvas";
import { INDUSTRIES } from "../data/responses";

export default function Unity() {
  const navigate = useNavigate();
  const { name, industries, interactions } = useUserStore();
  const posterRef = useRef<HTMLDivElement>(null);

  const industryStatus = INDUSTRIES.map((ind) => ({
    name: ind.name,
    visited: industries[ind.id]?.visited || false,
    interacted: industries[ind.id]?.interacted || false,
    duration: industries[ind.id]?.stayDuration || 0,
  }));

  const maxDuration = Math.max(...industryStatus.map((i) => i.duration), 1);
  const creativeInteractions = interactions.filter((i) => i.screen === "creative");
  const lastCreativePrompt = creativeInteractions[creativeInteractions.length - 1]?.action || "";

  const radarData = [
    { label: "制造", value: industries.manufacturing?.interacted ? 90 : industries.manufacturing?.visited ? 60 : 30 },
    { label: "医疗", value: industries.healthcare?.interacted ? 85 : industries.healthcare?.visited ? 55 : 30 },
    { label: "教育", value: industries.education?.interacted ? 88 : industries.education?.visited ? 55 : 30 },
    { label: "创意", value: industries.creative?.interacted ? 92 : industries.creative?.visited ? 60 : 30 },
    { label: "API", value: 80 },
    { label: "分享", value: 75 },
  ];

  const handleSavePoster = useCallback(async () => {
    if (!posterRef.current) return;
    try {
      const canvas = await html2canvas(posterRef.current, { backgroundColor: "#080d1a", scale: 2 });
      const link = document.createElement("a");
      link.download = `千问OS觉醒报告_${name || "你"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      alert("保存失败，请截图保存");
    }
  }, [name]);

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50, gap: 16 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)", textAlign: "center" }}>
          万物归一
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16, textAlign: "center" }}>
          All Things Run on One
        </p>
      </div>

      {/* Poster */}
      <div ref={posterRef} style={{
        position: "relative", zIndex: 1, padding: "20px", borderRadius: "var(--radius-lg)",
        background: "linear-gradient(160deg, #080d1a 0%, #0f1629 50%, rgba(0,229,255,0.05) 100%)",
        border: "1px solid var(--border-subtle)", width: 320,
      }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "var(--accent-cyan)", letterSpacing: 3, fontWeight: 600 }}>QWEN OS · 觉醒纪元</div>
          <div style={{ fontSize: "var(--text-body-lg)", fontWeight: 700, color: "var(--text-primary)", marginTop: 4 }}>
            {name || "你"}的觉醒报告
          </div>
        </div>

        <QwenRadar data={radarData} size={240} name={name || "你"} />

        {/* Industry status */}
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {industryStatus.filter((i) => i.visited).map((ind) => (
            <div key={ind.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", minWidth: 32 }}>{ind.name}</span>
              <div style={{ flex: 1, height: 4, borderRadius: "var(--radius-full)", background: "var(--border-subtle)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(ind.duration / maxDuration) * 100}%`, background: ind.interacted ? "var(--accent-cyan)" : "var(--text-tertiary)", borderRadius: "var(--radius-full)" }} />
              </div>
              <span style={{ fontSize: 10, color: ind.interacted ? "var(--success)" : "var(--text-tertiary)" }}>
                {ind.interacted ? "✓ 深度体验" : "看过"}
              </span>
            </div>
          ))}
        </div>

        {lastCreativePrompt && (
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: "var(--radius-xs)", background: "rgba(255,179,71,0.08)", fontSize: "var(--text-caption)", color: "var(--accent-cyan)", textAlign: "center", fontStyle: "italic" }}>
            "{lastCreativePrompt}"
          </div>
        )}

        <div style={{ marginTop: 12, textAlign: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: 10 }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600, letterSpacing: 2 }}>QWEN OS</div>
          <div style={{ fontSize: 9, color: "var(--text-tertiary)", marginTop: 2 }}>All Things Run on One · 千问OS · 万物归一</div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 10, width: "100%", maxWidth: 320 }}>
        <button onClick={handleSavePoster}
          style={{ flex: 1, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontWeight: 600, fontSize: "var(--text-body)" }}>
          💾 保存海报
        </button>
        <button onClick={() => navigate("/share")}
          style={{ flex: 1, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>
          分享 →
        </button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}
