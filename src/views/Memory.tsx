import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getMemoryIntro, getMemoryClosing } from "../data/responses";
import QwenTimeline from "../components/QwenTimeline";
import AICreditTag from "../components/AICreditTag";

export default function Memory() {
  const navigate = useNavigate();
  const { memories, name } = useUserStore();

  const items = memories.map((m) => ({
    time: m.time,
    title: m.scene,
    detail: m.summary,
  }));

  if (items.length === 0) {
    items.push(
      { time: "08:00", title: "角色设定", detail: `${name}告诉了千问自己的偏好` },
      { time: "09:00", title: "饮食规划", detail: `千问为${name}推荐了一日三餐` },
      { time: "12:00", title: "出行规划", detail: `千问规划了半日城市探索路线` },
      { time: "17:00", title: "AI创作", detail: `${name}体验了千问的创作能力` },
    );
  }

  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-gold)" }}>
          回顾 · 千问记得一切
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 6 }}>
          记 · 贯通
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 16, fontStyle: "italic" }}>
          {getMemoryIntro(name)}
        </p>

        <QwenTimeline items={items} closing={getMemoryClosing()} />

        <button
          onClick={() => navigate("/os")}
          style={{
            width: "100%", marginTop: 24, padding: "14px",
            borderRadius: "var(--radius-full)", background: "var(--accent-gold)",
            color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)",
          }}
        >
          揭示千问OS →
        </button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}
