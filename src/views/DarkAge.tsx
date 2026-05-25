import { useNavigate } from "react-router-dom";
import IndustryCard from "../components/IndustryCard";
import { INDUSTRIES } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

export default function DarkAge() {
  const navigate = useNavigate();

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          没有OS的时代
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", marginBottom: 20, lineHeight: 1.7 }}>
          在千问OS出现之前，每个行业都在各自的孤岛中运行——碎片化、规则固化、缺乏理解。制造靠肉眼、医疗靠胶片、教育靠统一教案、创意靠苦思冥想。
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 24, fontStyle: "italic", lineHeight: 1.5 }}>
          十五五规划明确提出制造业数字化转型、智慧医疗、教育数字化——千问OS正是这些愿景的技术底座。
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {INDUSTRIES.map((ind) => (
            <IndustryCard
              key={ind.id}
              title={ind.name}
              subtitle={ind.oldTitle}
              description={ind.oldDesc}
              stat={ind.statLabel}
              statValue="—"
              gradient={`linear-gradient(135deg, rgba(85,97,120,0.15), rgba(15,22,41,0.8))`}
              onClick={() => navigate(`/industry/${ind.id}`)}
            />
          ))}
        </div>

        <p style={{ marginTop: 16, textAlign: "center", color: "var(--text-tertiary)", fontSize: "var(--text-caption)" }}>
          选择任意行业，见证觉醒——
        </p>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
