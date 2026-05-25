const STAGES = ["唤醒", "体验", "揭示", "收获"];

interface Props {
  current: number;
}

export default function ProgressBar({ current }: Props) {
  return (
    <div style={{
      position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)",
      zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      {STAGES.map((stage, i) => (
        <div key={stage} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: i <= current ? "var(--accent-cyan)" : "var(--text-tertiary)",
            boxShadow: i <= current ? "0 0 10px var(--accent-cyan-glow)" : "none",
            transition: "all var(--duration-normal) var(--ease-out)",
          }} />
          <span style={{
            fontSize: 9, color: i <= current ? "var(--text-primary)" : "var(--text-tertiary)",
            writingMode: "vertical-rl", letterSpacing: 2,
          }}>{stage}</span>
        </div>
      ))}
    </div>
  );
}
