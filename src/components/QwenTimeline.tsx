interface TimelineItem {
  time: string;
  title: string;
  detail: string;
}

interface Props {
  items: TimelineItem[];
  closing?: string;
}

export default function QwenTimeline({ items, closing }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", maxWidth: 340 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {/* Time column */}
          <div style={{ minWidth: 48, textAlign: "right", color: "var(--accent-cyan)", fontSize: "var(--text-caption)", fontWeight: 500, paddingTop: 2 }}>
            {item.time}
          </div>
          {/* Line + dot */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i === items.length - 1 ? "var(--accent-cyan)" : "var(--accent-cyan)",
              boxShadow: `0 0 8px ${i === items.length - 1 ? "rgba(255,179,71,0.5)" : "var(--accent-cyan-dim)"}`,
              flexShrink: 0,
            }} />
            {i < items.length - 1 && (
              <div style={{ width: 1, flex: 1, minHeight: 40, background: "var(--border-subtle)" }} />
            )}
          </div>
          {/* Content */}
          <div style={{ paddingBottom: 20, flex: 1 }}>
            <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 2 }}>
              {item.detail}
            </div>
          </div>
        </div>
      ))}
      {closing && (
        <div style={{
          marginTop: 8, padding: "12px 16px",
          background: "var(--accent-cyan-dim)", borderRadius: "var(--radius-sm)",
          fontSize: "var(--text-body)", color: "var(--text-primary)",
          textAlign: "center", fontStyle: "italic",
        }}>
          {closing}
        </div>
      )}
    </div>
  );
}
