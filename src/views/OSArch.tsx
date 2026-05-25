import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getOSArchDetail } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

const ABILITIES = [
  { key: "理解", angle: -90 },
  { key: "推理", angle: -30 },
  { key: "记忆", angle: 30 },
  { key: "生成", angle: 90 },
  { key: "判断", angle: 150 },
  { key: "调度", angle: 210 },
];

const USER_SCENES = ["饮食", "出行", "创作"]; // User completed scenes

export default function OSArch() {
  const navigate = useNavigate();
  const { name } = useUserStore();
  const [selected, setSelected] = useState<string | null>(null);

  const cx = 160, cy = 180, r1 = 50, r2 = 85, r3 = 120;

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360, textAlign: "center" }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          OS · 一个大脑
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16 }}>
          万物 · AI时代的操作系统
        </p>

        <svg viewBox="0 0 320 360" style={{ width: "100%", maxWidth: 320 }}>
          {/* Outer ring: industries */}
          <circle cx={cx} cy={cy} r={r3} fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" strokeDasharray="4 4" />
          {/* Middle ring */}
          <circle cx={cx} cy={cy} r={r2} fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
          {/* Inner ring */}
          <circle cx={cx} cy={cy} r={r1} fill="none" stroke="var(--border-glow)" strokeWidth="1" />

          {/* Center */}
          {selected ? (
            <text x={cx} y={cy + 4} textAnchor="middle" fill="var(--accent-cyan)" fontSize="14" fontWeight="700">
              {selected}
            </text>
          ) : (
            <>
              <circle cx={cx} cy={cy} r={16} fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" strokeWidth="1.5" />
              <text x={cx} y={cy + 4} textAnchor="middle" fill="var(--accent-cyan)" fontSize="11" fontWeight="700">OS</text>
            </>
          )}

          {/* Ability nodes */}
          {ABILITIES.map((a) => {
            const rad = (a.angle * Math.PI) / 180;
            const ax = cx + r1 * Math.cos(rad);
            const ay = cy + r1 * Math.sin(rad);
            const isSelected = selected === a.key;
            return (
              <g key={a.key} onClick={() => setSelected(isSelected ? null : a.key)} style={{ cursor: "pointer" }}>
                <circle cx={ax} cy={ay} r={10} fill={isSelected ? "var(--accent-cyan-dim)" : "transparent"} stroke="var(--accent-cyan)" strokeWidth="1" />
                <text x={ax} y={cy + r1 + 20} textAnchor="middle" fill={isSelected ? "var(--accent-cyan)" : "var(--text-secondary)"} fontSize="11">
                  {a.key}
                </text>
              </g>
            );
          })}

          {/* User scenes on outer ring */}
          {USER_SCENES.map((scene, i) => {
            const angle = (-120 + i * 60) * Math.PI / 180;
            const sx = cx + r2 * Math.cos(angle);
            const sy = cy + r2 * Math.sin(angle);
            return (
              <g key={scene}>
                <circle cx={sx} cy={sy} r={8} fill="var(--success)" opacity="0.8" />
                <text x={sx} y={sy + 18} textAnchor="middle" fill="var(--success)" fontSize="10">✓ {scene}</text>
              </g>
            );
          })}

          {/* Other industry nodes (dimmed) */}
          {["医疗", "金融", "制造", "教育"].map((ind, i) => {
            const angle = (60 + i * 50) * Math.PI / 180;
            const ix = cx + r2 * Math.cos(angle);
            const iy = cy + r2 * Math.sin(angle);
            return (
              <g key={ind}>
                <circle cx={ix} cy={iy} r={5} fill="var(--text-tertiary)" opacity="0.5" />
                <text x={ix} y={iy + 14} textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" opacity="0.5">{ind}</text>
              </g>
            );
          })}
        </svg>

        {selected && (
          <div style={{
            marginTop: 8, padding: "12px 16px", borderRadius: "var(--radius-sm)",
            background: "var(--accent-cyan-dim)", border: "1px solid var(--border-glow)",
            fontSize: "var(--text-body)", color: "var(--text-primary)", lineHeight: 1.6,
            animation: "fadeInUp 300ms var(--ease-out) both",
          }}>
            {getOSArchDetail(selected, name)}
          </div>
        )}

        <p style={{
          marginTop: 16, color: "var(--text-tertiary)", fontSize: "var(--text-caption)",
          fontStyle: "italic",
        }}>
          {name}，今天千问OS已为你驱动了 {USER_SCENES.length} 个场景。想象一下——当所有行业都亮起时，AI将如何改变世界？
        </p>

        <button
          onClick={() => navigate("/gallery")}
          style={{
            width: "100%", marginTop: 20, padding: "14px",
            borderRadius: "var(--radius-full)", background: "var(--accent-cyan)",
            color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)",
          }}
        >
          探索新物种 →
        </button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
