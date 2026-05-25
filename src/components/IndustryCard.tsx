interface Props {
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  statValue: string;
  gradient?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function IndustryCard({ title, subtitle, description, stat, statValue, gradient, onClick, active }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "16px", borderRadius: "var(--radius-md)",
        background: active ? "var(--accent-cyan-dim)" : gradient || "var(--bg-secondary)",
        border: `1px solid ${active ? "var(--border-glow)" : "var(--border-subtle)"}`,
        textAlign: "left", cursor: "pointer",
        transition: "all var(--duration-fast) var(--ease-out)",
      }}
    >
      <div style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 600, letterSpacing: 2, marginBottom: 4 }}>
        {subtitle}
      </div>
      <div style={{ fontSize: "var(--text-h3)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 10 }}>
        {description}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-cyan)" }}>{statValue}</span>
        <span style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)" }}>{stat}</span>
      </div>
    </button>
  );
}
